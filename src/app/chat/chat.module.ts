import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import ChatRoutingModule from './chat-routing.module';
import ChatComponent from './chat/chat.component';
import FloatingChatsComponent from './floating-chats/floating-chats.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    ChatComponent,
    FloatingChatsComponent,
    MessageComponent,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,

    FormsModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule,

    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ChatComponent,
    FloatingChatsComponent,
  ]
})
export default class ChatModule {}