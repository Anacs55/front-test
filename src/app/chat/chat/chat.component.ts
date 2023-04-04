import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chat, ChatMessage } from 'src/models/chats';

@Component({
  selector: 'chat[chat]',
  templateUrl: 'chat.component.html',
  styleUrls: ['chat.component.sass']
})
export default class ChatComponent implements OnInit {
  constructor() {}

  @Input() chat!: Chat;
  @Output() closeChat = new EventEmitter<Chat>();
  messages: ChatMessage[] = [];
  expanded: boolean = false;
  sendText: string = '';

  ngOnInit() {
  }

  expand() {
    this.expanded = !this.expanded;
  }

  close() {
    this.closeChat.emit(this.chat);
  }

  send() {
    if(this.sendText === '') return;
    this.messages.push({text: this.sendText, from: this.chat.user, time: new Date()});
    this.sendText = '';
  }
}