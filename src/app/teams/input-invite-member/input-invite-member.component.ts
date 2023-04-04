import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteMember } from 'src/models/teams/inviteMember';
import { MemberRoles } from 'src/models/teams/team';

@Component({
  selector: 'input-invite-member',
  templateUrl: 'input-invite-member.component.html',
  styleUrls: ['input-invite-member.component.sass']
})
export class InputInviteMemberComponent {

  formArray = new FormArray<FormGroup<{ email: FormControl<string | null>; role: FormControl<string | null>; }>>([])
  form: FormGroup = new FormGroup({
    form: this.formArray
  });

  readonly roles = MemberRoles;

  @Output() members = new EventEmitter<InviteMember[]>();

  constructor() {
    this.addNewMember();
    this.form.valueChanges.subscribe(res => this.emitData(res.form));
  }

  addNewMember() {
    this.formArray.push(
      new FormGroup({
        email: new FormControl('', [Validators.email, Validators.required]),
        role: new FormControl('', Validators.required)
      })
    );
  }

  removeMember(index: number) {
    this.formArray.removeAt(index);
  }

  emitData(data: InviteMember[]) {
    this.members.next(data);
  }
}