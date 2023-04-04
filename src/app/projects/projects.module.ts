import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableModule } from '../TranslatableModule';
import { BeeComponentsModule } from '../bee-components/bee-components.module';
import { DialogAssignToTeam } from './dialog-assign-to-team/dialog-assign-to-team.component';
import { DialogCreateProject } from './dialog-create-project/dialog-create-project.component';
import { DialogShareLinkComponent } from './dialog-share-link/dialog-share-link.component';
import { ProjectCardComponent } from './project-card/project-card.component';
import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsView } from './projects-view/projects-view.component';

@NgModule({
  declarations: [
    ProjectsView,
    ProjectCardComponent,
    DialogCreateProject,
    DialogAssignToTeam,
    DialogShareLinkComponent,
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, TextFieldModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule, MatNativeDateModule,
    BeeComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/project/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ],
  providers: [
    MatDatepickerModule, MatNativeDateModule,
  ],
})
export class ProjectsModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}