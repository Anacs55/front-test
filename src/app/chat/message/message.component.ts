import { Component, HostBinding, Input } from '@angular/core';
import { ChatMessage } from 'src/models/chats';

@Component({
  selector: 'chat-message[msg]',
  templateUrl: 'message.component.html',
  styleUrls: ['message.component.sass']
})
export class MessageComponent {
  _msg!: ChatMessage;
  @Input()
  set msg(msg: ChatMessage) {
    this._msg = msg;
  }
  get msg(): ChatMessage {
    return this._msg;
  }
  @HostBinding('class.sended') sended: boolean = true;
}