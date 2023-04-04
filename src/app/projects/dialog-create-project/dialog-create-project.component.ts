import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Id } from 'src/VOs/Id';
import { ProjectDTO } from 'src/models/tasks/dashboard';
import { FilesService } from 'src/services/Files/files.service';
import { SessionManagerService } from 'src/services/SessionManager/session-manager.service';
import { backgroundGenerator } from 'src/utils/CssUtils';
import { Colors } from '../../bee-components/color-select/color-select.component';

@Component({
  selector: 'dialog-create-project',
  templateUrl: 'dialog-create-project.component.html',
  styleUrls: ['dialog-create-project.component.sass']
})
export class DialogCreateProject {

  constructor(
    public dialogRef: MatDialogRef<DialogCreateProject>,
    private sessionManager: SessionManagerService,
    private filesService: FilesService,
  ) { }

  cardPlaceHolder = 'background-color: #1f9cee';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    image: new FormControl(undefined),
    color: new FormControl('#1f9cee'),
    color2: new FormControl<string | undefined>(undefined),
  });

  create() {
    this.form.markAllAsTouched();
    if(!this.form.valid) return;
    
    const project: ProjectDTO = { ...this.form.value };
    project.id = Id.generate().value;
    const sessionTeam = this.sessionManager.getTeam();
    if (sessionTeam?.id) project.team = sessionTeam.id;
    this.dialogRef.close(project);
  }

  postImage(fileInput: Event) {
    let file = (<HTMLInputElement>fileInput.target).files![0];
    this.filesService.postImages(file).subscribe(res => this.form.patchValue({ image: res.media }));
  }

  updateColors(colors: Colors) {
    const { color, color2 } = colors;
    this.form.patchValue({ color, color2 })
    this.cardPlaceHolder = backgroundGenerator(color, color2);
  }

  /*
  assignToTeam() {
    this.dialog.open(DialogAssignToTeams, { width: 'fit-content' })
  }
  */
}