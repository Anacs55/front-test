import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { ProjectService } from 'src/services/Project/project.service';

@Component({
  selector: 'search-project',
  templateUrl: 'search-project.component.html',
  styleUrls: ['search-project.component.sass']
})
export class SearchProjectComponent implements OnInit {
  myControl = new FormControl('');
  textForSearch: string = '';
  projects: ProjectDTO[] = [];
  filteredProjects: ProjectDTO[] = [];

  constructor(private taskService: ProjectService) { }

  ngOnInit() {
    this.taskService.getAll().subscribe(res => this.projects = res);
  }

  searchProject() {
    const filterValue = this.textForSearch.toLowerCase();
    this.filteredProjects = this.projects.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(project: ProjectDTO): string {
    return project.name || '';
  }
}