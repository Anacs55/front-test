import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxCaptchaModule } from 'ngx-captcha';
import { DragScrollModule } from 'ngx-drag-scroll';
import { MouseDragScrollDirective } from 'src/directive/MouseDragScroll/mouse-drag-scroll.directive';
import { LocalDatePipe } from 'src/pipes/datePipe/LocalDatePipe';
import { BeeComponentsModule } from '../bee-components/bee-components.module';
import { BeeIconsModule } from '../bee-icons/bee-icons.module';
import { TranslatableModule } from '../TranslatableModule';
import { ActivitiesComponent } from './activities/activities.component';
import { AttachmentsComponent } from './attachments/attachments.component';
import { ColumnTimeComponent } from './column-time/column-time.component';
import { ColumnComponent } from './column/column.component';
import { DialogAssignToTeams } from './dialog-assign-to-teams/dialog-assign-to-teams.component';
import { DialogAttachmentComponent } from './dialog-attachments/dialog-attachment.component';
import { DialogDeleteAttachmentComponent } from './dialog-delete-attachment/dialog-delete-attachment.component';
import { DialogItemComponent } from './dialog-item/dialog-item.component';
import { DialogLabelsComponent } from './dialog-labels/dialog-labels.component';
import { DialogSelectColorComponent } from './dialog-select-color/dialog-select-color.component';
import { DialogTagCreateComponent } from './dialog-tag-create/dialog-tag-create.component';
import { DialogUsersItemComponent } from './dialog-users-item/dialog-users-item.component';
import { ImageAcronimComponent } from './image-acronim/image-acronim.component';
import { InlineCreatorComponent } from './inline-creator/inline-creator.component';
import { ItemActivityComponent } from './item-activity/item-activity.component';
import { ItemAttachmentComponent } from './item-attachment/item-attachment.component';
import { ItemDateDeadlineComponent } from './item-date-deadline/item-date-deadline.component';
import { ItemDateComponent } from './item-date/item-date.component';
import { ItemGlobalTimeComponent } from './item-global-time/item-global-time.component';
import { ItemInputMessageComponent } from './item-input-message/item-input-message.component';
import { ItemMessageComponent } from './item-message/item-message.component';
import { ItemSubitemsComponent } from './item-subitems/item-subitems.component';
import { ItemTimeComponent } from './item-time/item-time.component';
import { ItemTinyGlobalTimeComponent } from './item-tiny-global-time/item-tiny-global-time.component';
import { ItemComponent } from './item/item.component';
import { PrioritySelectorComponent } from './priority-selector/priority-selector.component';
import { TasksRoutingModule } from './project-routing.module';
import { ProjectView } from './project-view/project-view.component';
import { SelectColumnColorComponent } from './select-column-color/select-column-color.component';
import { ShowAssignedBeesComponent } from './show-assigned-bees/show-assigned-bees.component';
import { TagComponent } from './tag/tag.component';
import { TagsComponent } from './tags/tags.component';
import { NotificationsComponent } from '../menu/notifications/notifications.component';
import { ContentNotificationComponent } from './content-notification/content-notification.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
  declarations: [
    LocalDatePipe,
    ProjectView,
    InlineCreatorComponent,
    DialogItemComponent,
    DialogLabelsComponent,
    ColumnComponent,
    ColumnTimeComponent,
    ItemComponent,
    DialogUsersItemComponent,
    ItemTimeComponent,
    ItemDateComponent,
    ItemSubitemsComponent,
    ActivitiesComponent,
    ItemGlobalTimeComponent,
    DialogAssignToTeams,
    SelectColumnColorComponent,
    DialogSelectColorComponent,
    PrioritySelectorComponent,
    ImageAcronimComponent,
    ItemDateDeadlineComponent,
    ItemTinyGlobalTimeComponent,
    ShowAssignedBeesComponent,
    TagComponent,
    TagsComponent,
    ItemActivityComponent,
    ItemInputMessageComponent,
    ItemMessageComponent,
    AttachmentsComponent,
    ItemAttachmentComponent,
    DialogAttachmentComponent,
    MouseDragScrollDirective,
    DialogTagCreateComponent,
    DialogDeleteAttachmentComponent,
    NotificationsComponent,
    ContentNotificationComponent,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, TextFieldModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    NgxCaptchaModule,
    MatDialogModule,
    MatMenuModule,
    MatCheckboxModule,
    MatListModule,
    MatDatepickerModule, MatNativeDateModule,
    MatExpansionModule,
    MatProgressBarModule,
    DragDropModule,
    BeeIconsModule,
    BeeComponentsModule,
    MatChipsModule,
    MatBadgeModule,
    MatAutocompleteModule,
    ScrollingModule,
    DragScrollModule,
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
})
export class ProjectModule extends TranslatableModule {
  constructor(translate: TranslateService) {
    super(translate);
  }
}