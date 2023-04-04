import { Component, Input, OnInit } from '@angular/core';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { ProjectService } from 'src/services/Project/project.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';

@Component({
  selector: 'project-selector[projects]',
  templateUrl: 'project-selector.component.html',
  styleUrls: ['project-selector.component.sass']
})
export class ProjectSelectorComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private sessionManager: SessionManagerService,
  ) {
  }

  @Input() projects: ProjectDTO[] = [];


  ngOnInit(): void {
  }

}
