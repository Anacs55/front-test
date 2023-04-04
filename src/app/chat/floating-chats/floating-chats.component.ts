import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/models/chats';

@Component({
  selector: 'floating-chats',
  templateUrl: 'floating-chats.component.html',
  styleUrls: ['floating-chats.component.sass']
})
export default class FloatingChatsComponent implements OnInit {
  constructor() {}

  chats: Chat[] = [
    {user: 'Carlos Esquerdo Bernat'},
    {user: 'Javier Esquerdo Bernat'},
  ];

  ngOnInit() {
  }

  closeChat(chat: Chat) {
    this.chats = this.chats.filter(c => c !== chat);
  }
}