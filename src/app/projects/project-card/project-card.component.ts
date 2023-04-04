import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { ProjectService } from 'src/services/Project/project.service';
import { backgroundGenerator } from 'src/utils/CssUtils';
import { ContextMenuComponent } from '../../bee-components/contextmenu/contextmenu.component';
import { DialogAssignToTeam } from '../dialog-assign-to-team/dialog-assign-to-team.component';
import { DialogShareLinkComponent } from '../dialog-share-link/dialog-share-link.component';

@Component({
  selector: 'project-card[project]',
  templateUrl: 'project-card.component.html',
  styleUrls: ['project-card.component.sass'],
})
export class ProjectCardComponent implements OnInit {
  constructor(
    private taskService: ProjectService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private translate: TranslateService
  ) { }

  @Input() project!: ProjectDTO;
  name: string = '';
  dashStyles: string = '';

  @Output() onDelete = new EventEmitter<ProjectDTO>();

  @ViewChild('contextMenu') contextMenu?: ContextMenuComponent;

  menuPosition: { x: number; y: number } = { x: 0, y: 0 };

  ngOnInit(): void {
    if (!this.project) return;
    this.name = this.project.name;

    const { color, color2 } = this.project!;
    this.dashStyles = backgroundGenerator(color, color2);
  }

  delete() {
    this.taskService
      .delete(this.project!)
      .subscribe((_) => this.onDelete.emit(this.project));
  }

  changeName(input: any) {
    if (this.project!.name !== this.name) {
      this.project!.name = this.name;
      this.taskService.save(this.project!).subscribe(() => {
        const translation = this.translate.instant('modals.createProject.updateProject')
        this.snackBar.open(translation, 'OK', { duration: 2000 });
        input.blur();
      });
    } else input.blur();
  }

  openForm(input: any) {
    setTimeout(() => input.focus(), input.select(), input.disabled = false);
  }

  openContextMenu(event: MouseEvent) {
    event.preventDefault();
    this.menuPosition.x = event.clientX;
    this.menuPosition.y = event.clientY;
    this.contextMenu?.openMenu(this.menuPosition);
  }

  assignToTeam() {
    this.dialog.open(DialogAssignToTeam, { width: 'fit-content' });
  }

  shareLink() {
    this.dialog.open(DialogShareLinkComponent, {
      width: 'fit-content',
      data: {
        type: 'Project',
        link: '',
      },
    });
  }
}
