import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Id } from 'src/VOs/Id';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { Team } from 'src/models/teams/team';
import { AnalyticsService } from 'src/services/Analitycs/analitycs.service';
import { ProjectService } from 'src/services/Project/project.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { DialogCreateProject } from '../dialog-create-project/dialog-create-project.component';

@Component({
  selector: 'projects-view',
  templateUrl: 'projects-view.component.html',
  styleUrls: ['projects-view.component.sass']
})
export class ProjectsView implements OnInit {
  constructor(
    private projectService: ProjectService,
    private sessionManager: SessionManagerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private analytics: AnalyticsService,
    private translate: TranslateService,
  ) { }

  subscription!: Subscription;
  projects: ProjectDTO[] = [];
  selectedTeam: Team = this.sessionManager.getTeam();

  ngOnInit(): void {
    this.subscription = SessionManagerService.selectedTeamObserver.subscribe(team => {
      this.selectedTeam = team;
      this.updateProjects();
    });
    if (this.selectedTeam) this.updateProjects();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private updateProjects() {
    this.projectService.getAllByTeam(new Id(this.selectedTeam.id)).subscribe(res => this.projects = res);
  }

  createProject() {
    this.dialog.open(DialogCreateProject, {
      width: 'fit-content',
    }).afterClosed().subscribe((model: ProjectDTO) => {
      if (model) {
        this.projectService.create(model).subscribe({
          next: () => {
            this.projects.push(model);
            const translation = this.translate.instant('project.createProject.createSuccess');
            this.snackBar.open(translation, 'Close', { duration: 2000 });
            this.analytics.projectCreate(model);
          },
          error: () => {
            const translation = this.translate.instant('project.createProject.createError');
            this.snackBar.open(translation, 'Close', { duration: 2000 });
          }
        });
      };
    });
  };

  deleteProject(dashboard: ProjectDTO) {
    this.projects = this.projects.filter(dash => dash.id !== dashboard.id);
  }

  importTrello(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const data = JSON.parse(reader.result as string);
      this.projectService.importTrello(data, new Id(this.selectedTeam.id)).subscribe(() => {
        this.updateProjects();
        this.analytics.trelloImport(this.selectedTeam);
        const translation = this.translate.instant('project.createProject.importSuccess');
        this.snackBar.open(translation, 'Close', { duration: 2000 });
      });
    };
  }
}