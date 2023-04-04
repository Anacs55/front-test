import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import {ProjectService} from 'src/services/Project/project.service';

@Component({
  selector: 'app-dialog-assign-project-to-team',
  templateUrl: 'dialog-assign-project-to-team.component.html',
  styleUrls: ['dialog-assign-project-to-team.component.sass']
})
export class DialogAssignProjectToTeamComponent implements OnInit {

  constructor(private projectService: ProjectService) {this.filteredProjects = this.projectCtrl.valueChanges.pipe(
    map(projectName => this.filter(projectName))
  ); }

  separatorKeysCodes: number[] = [ENTER, COMMA];
  projectCtrl = new FormControl<string>('');
  filteredProjects: Observable<ProjectDTO[]>;
  projects: ProjectDTO[] = [];
  allProjects: ProjectDTO[] = []; 

  @ViewChild('projectInput') projectInput!: ElementRef<HTMLInputElement>;


  ngOnInit() {
    this.projectService.getAll().subscribe(res => this.allProjects = res);
  }

  
  private filter(projectName: string | null): ProjectDTO[] {
    if(!projectName) return this.allProjects;
    projectName = projectName.toLocaleLowerCase();
    return this.allProjects.filter((project) => project.name.toLocaleLowerCase().includes(projectName!));
  }

  add(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    const filteredProjects = this.filter(value);
    if(filteredProjects.length >= 1)this.projects.push(filteredProjects[0])

    this.resetProjectInput();
  }

  selected(event: MatAutocompleteSelectedEvent) {
    this.projects.push(event.option.value);
    this.resetProjectInput();
  }

  remove(project: ProjectDTO) {
    this.projects = this.projects.filter(projectF => projectF.id !== project.id);
  }

  private resetProjectInput() {
    this.projectInput.nativeElement.value = '';
    this.projectCtrl.setValue(null);
  }


}
