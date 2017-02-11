import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Subject } from 'rxjs/Subject';

import { SOCKET_PATH, MessageType } from '../../shared';
import { LoginService } from '../../login';
import { Person, Message, IMessageJSON } from '../model';

@Injectable()
export class SocketService {

  private socket: SocketIOClient.Socket;

  constructor(private loginService: LoginService) {
    this.socket = io(SOCKET_PATH);
  }

  listen(): Subject<MessageType> {
    let sub$ = new Subject<MessageType>();

    this.socket.emit('online', this.loginService.user.toServer());

    this.socket.on('online', (people: string[]) => {
      sub$.next({
        action: 'ONLINE_PEOPLE',
        data: people
      });
    });
    this.socket.on('new message', (message: IMessageJSON) => {
      sub$.next({
        action: 'NEW_MESSAGE',
        data: message
      });
    });
    this.socket.on('read message', (data: {user: string, message: string }) => {
      sub$.next({
        action: 'READ_OUTCOME_MESSAGE',
        data: data
      });
    });
    this.socket.on('printed', (people: string[]) => {
      sub$.next({
        action: 'PRINTED_PEOPLE',
        data: people
      });
    });

    return sub$;
  }

  sendNewMessage(message: Message) {
    this.socket.emit('new message', {
      contact: message.contact.toServer(),
      message: message.toServer(),
      addressee: message.contact.personFrom.desc
    });
  }

  readNewMessage(message: Message) {
    this.socket.emit('read message', {
      contact: message.contact.toServer(),
      message: message.toServer()
    });
  }

  startPrinted() {
    this.socket.emit('start printed', this.loginService.user.id);
  }

  endPrinted() {
    this.socket.emit('end printed', this.loginService.user.id);
  }

}