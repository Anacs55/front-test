import { Component, Input } from '@angular/core';
import { AuthType } from '../AuthType';

@Component({
  selector: 'auth-providers[authType]',
  templateUrl: 'auth-providers.component.html',
  styleUrls: ['auth-providers.component.sass']
})
export class AuthProvidersComponent {
  @Input() authType!: AuthType;
}