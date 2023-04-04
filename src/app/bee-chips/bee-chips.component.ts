import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { ProjectService } from 'src/services/Project/project.service';

@Component({
  selector: 'app-bee-chips',
  templateUrl: 'bee-chips.component.html',
  styleUrls: ['bee-chips.component.sass'],
})
export class BeeChipsComponent implements OnInit {
  constructor(private projectService: ProjectService) {
    this.filteredProjects = this.projectCtrl.valueChanges.pipe(
      map(projectName => this.filter(projectName))
    );
  }

  chipForm: FormGroup = new FormGroup({
    project: new FormControl('')
  });

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
    if (!projectName) return this.allProjects;
    return this.allProjects.filter((project) => project.name.includes(projectName));
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our project
    if (value) {
      //this.projects.push(value);
    }

    // Clear the input value 
    event.chipInput!.clear();

    this.removeProjectInput();
  }

  remove(project: ProjectDTO) {
    this.projects = this.projects.filter(projectF => project.id !== projectF.id);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.projects.push(event.option.value);
    this.removeProjectInput();
  }

  private removeProjectInput() {
    this.projectInput.nativeElement.value = '';
    this.projectCtrl.setValue(null);
  }
}
