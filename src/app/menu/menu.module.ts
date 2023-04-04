import { PlatformModule } from '@angular/cdk/platform';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableModule } from '../TranslatableModule';
import { BeeComponentsModule } from '../bee-components/bee-components.module';
import { BeeIconsModule } from '../bee-icons/bee-icons.module';
import { DialogUserEditComponent } from './dialog-user-edit/dialog-user-edit.component';
import { LateralMenuComponent } from './lateral-menu/lateral-menu.component';
import { MainMenuComponent } from './main-menu/menu.component';

@NgModule({
  declarations: [
    MainMenuComponent,
    LateralMenuComponent,
    DialogUserEditComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, TextFieldModule,
    RouterModule,
    MatToolbarModule,
    MatTooltipModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatAutocompleteModule,
    BeeIconsModule,
    BeeComponentsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSidenavModule,
    PlatformModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/menu/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,
    }),
  ],
  exports: [
    RouterModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MainMenuComponent,
    LateralMenuComponent,
  ]
})
export class MenuModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}