import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatableModule } from '../TranslatableModule';
import { BeeButtonsModule } from '../bee-buttons/bee-buttons.module';
import { BeeComponentsModule } from '../bee-components/bee-components.module';
import { BeeIconsModule } from '../bee-icons/bee-icons.module';
import { WarningModule } from '../warning-views/warning.module';
import { AcceptTeamInvite } from './accept-team-invite/accept-team-invite.component';
import { DialogAssignProjectToTeamComponent } from './dialog-assign-project-to-team/dialog-assign-project-to-team.component';
import { DialogConfirmDeleteComponent } from './dialog-confirm-delete/dialog-confirm-delete.component';
import { DialogCreateNewTeamComponent } from './dialog-create-new-team/dialog-create-new-team.component';
import { DialogInviteTeamMemberComponent } from './dialog-invite-team-member/dialog-invite-team-member.component';
import { InputInviteMemberComponent } from './input-invite-member/input-invite-member.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { TeamsView } from './teams-view/teams-view.component';

@NgModule({
  declarations: [
    TeamsView,
    DialogInviteTeamMemberComponent,
    InputInviteMemberComponent,
    DialogCreateNewTeamComponent,
    DialogAssignProjectToTeamComponent,
    DialogConfirmDeleteComponent,
    AcceptTeamInvite,
  ],
  imports: [
    TeamsRoutingModule,
    CommonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatInputModule,
    BeeButtonsModule,
    BeeIconsModule,
    BeeComponentsModule,
    WarningModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, '/assets/i18n/teams/', '.json'),
        deps: [HttpClient]
      },
      isolate: true,
      extend: true,

    }),
  ]
})
export class TeamsModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}