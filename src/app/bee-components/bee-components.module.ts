import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableModule } from '../TranslatableModule';
import { ColorSelectComponent } from './color-select/color-select.component';
import { ContextMenuComponent } from './contextmenu/contextmenu.component';
import { ProjectSelectorComponent } from './project-selector/project-selector.component';
import { SearchProjectComponent } from './search-project/search-project.component';
import { TeamSelectorComponent } from './team-selector/team-selector.component';

@NgModule({
  declarations: [
    TeamSelectorComponent,
    ContextMenuComponent,
    SearchProjectComponent,
    ProjectSelectorComponent,
    ColorSelectComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatAutocompleteModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/tasks/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ],
  exports: [
    TeamSelectorComponent,
    ContextMenuComponent,
    SearchProjectComponent,
    ColorSelectComponent,
  ]
})
export class BeeComponentsModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}