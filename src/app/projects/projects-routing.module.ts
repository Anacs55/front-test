import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsView } from './projects-view/projects-view.component';

const routes: Routes = [
  { path: '', component: ProjectsView },
  { path: '', loadChildren: () => import('../project/project.module').then(m => m.ProjectModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectsRoutingModule { }