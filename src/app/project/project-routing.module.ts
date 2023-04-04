import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectView } from './project-view/project-view.component';

const routes: Routes = [
  { path: ':id', component: ProjectView },
  { path: ':id/:itemId', component: ProjectView },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }