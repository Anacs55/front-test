import { animate, state, style, transition, trigger } from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogLabelsComponent } from 'src/app/project/dialog-labels/dialog-labels.component';
import { DialogConfirmDeleteComponent } from 'src/app/teams/dialog-confirm-delete/dialog-confirm-delete.component';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { LateralMenu } from '../../../models/menu';
import { DialogUserEditComponent } from '../dialog-user-edit/dialog-user-edit.component';

@Component({
  selector: 'lateral-menu',
  templateUrl: 'lateral-menu.component.html',
  styleUrls: ['lateral-menu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        'padding-left': 0,
        width: 0,
        opacity: 0,
      })),
      transition('* => *', animate('0.5s ease-in-out')),
    ]),
  ],
})
export class LateralMenuComponent {
  constructor(
    private platform: Platform,
    private dialog: MatDialog,
    private sessionManager: SessionManagerService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) { }

  visible: boolean = this.sessionManager.retrieve<boolean>('extendedLateralMenu') ?? true;
  contentWidth = 0;
  @ViewChild('menu') private readonly menu!: ElementRef;

  get isMobile(): boolean {
    return this.platform.ANDROID || this.platform.IOS;
  }

  readonly menus: LateralMenu[] = [
    { name: 'lateralMenu.projects', path: '/project', icon: 'rocket' },
    { name: 'lateralMenu.teams', path: '/teams', icon: 'groups' },
    // { name: 'documents', path: '/documents', icon: 'description' },
    // { name: 'calendar', path: '/calendar', icon: 'calendar_month' },
    // { name: 'activity', path: '/activity', icon: 'account_tree' },
    // { name: 'reports', path: '/reports', icon: 'reports' },
    // { name: 'trash', path: '/trash', icon: 'delete' },
  ];

  ngAfterViewInit() {
    this.resizeContent();
    new ResizeObserver(() => this.resizeContent()).observe(this.menu.nativeElement);
  }

  @HostListener('window:resize')
  private resizeContent() {
    this.contentWidth = window.innerWidth - this.menu.nativeElement.clientWidth;
    this.changeDetector.detectChanges();
  }

  toggleMenu() {
    this.visible = !this.visible;
    this.sessionManager.store('extendedLateralMenu', this.visible);
  }

  openDialogEditUser() {
    this.dialog.open(DialogUserEditComponent);
  }

  openDialogLabels() {
    this.dialog.open(DialogLabelsComponent);
  }

  logout() {
    this.dialog.open(DialogConfirmDeleteComponent, { width: 'fit-content', data: 'modals.logoutMobile.logout' }).afterClosed().subscribe((result) => {
      if (result) {
        this.sessionManager.logOut();
        this.router.navigate(['/login']);
      }
    });
  }
}