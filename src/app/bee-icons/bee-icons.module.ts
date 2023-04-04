import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import AddMemberIcon from './addMember/add-member-icon.component';
import AddProject from './addProject/add-project.component';
import EditIcon from './editIcon/edit-icon.component';
import LogoIcon from './logo/logo.icon';
import PersonIcon from './person/person-icon.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    PersonIcon,
    LogoIcon,
    AddMemberIcon,
    EditIcon,
    AddProject,
  ],
  exports: [
    PersonIcon,
    LogoIcon,
    AddMemberIcon,
    EditIcon,
    AddProject,
  ]
})
export class BeeIconsModule { }