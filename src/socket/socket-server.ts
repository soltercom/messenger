import * as socketIo from "socket.io";
import * as http from "http";

import { PersonRepository, MessageRepository } from '../app/repository';

type UserType = {user: any, socket: SocketIO.Socket};

export class SocketServer {

	private personRepository: PersonRepository;
	private messageRepository: MessageRepository;

	private io: SocketIO.Server;
	private users: UserType[] = [];
	private ext: UserType[] = [];
	private printedUsers: UserType[] = [];

	public static bootstrap(server: http.Server): SocketServer {
		return new SocketServer(server);
	}

	constructor(server: http.Server) {
		this.personRepository = new PersonRepository();
    this.messageRepository = new MessageRepository();
		this.io = socketIo(server);
		this.listen();
	}

	private onOnline(user: any, socket: SocketIO.Socket) {
    this.users = [...this.users, {user: user, socket: socket}];
    this.io.emit('online', this.users.map(item => item.user.id));
  }

  private onDisconnect(socket: SocketIO.Socket) {
    this.users = this.users.filter((item: any) => item.socket.id !== socket.id);
    socket.broadcast.emit('online', this.users.map(item => item.user.id));
  }

  private onNewMessage(data: any, socket: SocketIO.Socket) {
    let result = this.users.filter(item => item.user.id === data.contact.personTo);
    if (result.length > 0) {
      result[0].socket.emit('new message', data.message);
    }
    result = this.ext.filter(item => item.user.id === data.contact.personTo);
    if (result.length > 0) {
      result[0].socket.emit('ext message', [{
        addressee: data.addressee,
        text: data.message.text
      }]);
    }
  }

  private onReadMessage(data: any, socket: SocketIO.Socket) {
    let result = this.users.filter(item => item.user.id === data.contact.personFrom);
    if (result.length > 0) {
      result[0].socket.emit('read message', data.message);
    }
  }

  private onStartPrinted(id: string, socket: SocketIO.Socket) {
	  this.printedUsers = [...this.printedUsers, {user: id, socket: socket}];
	  socket.broadcast.emit('printed', this.printedUsers.map(item => item.user));
  }

  private onEndPrinted(id: string, socket: SocketIO.Socket) {
		this.printedUsers = this.printedUsers.filter((item: any) => item.user !== id);
	  socket.broadcast.emit('printed', this.printedUsers.map(item => item.user));
  }

  private onExtOnline(data: any, socket: SocketIO.Socket) {
    console.log('Ext online: ', data);
    this.personRepository.login(data.pin, (error, result) => {
      if (error) {
        console.log('Error with Altercom Messenger Extension connection. pin: ', data.pin);
        return;
      }
      this.ext = this.ext.filter(item => item.user.pin !== result.pin);
      this.ext = [...this.ext, {user: result, socket: socket}];
      this.messageRepository.getNewIncomePersonMessages(result.id, (error, result) => {
        if (error) {
          console.log('Error in new income messages query.', error);
          return;
        }
        if (result.length === 0)
          return;
        socket.emit('ext message', result.map((msg: any) => {
          return {
            addressee: msg.contact.personFrom.desc,
            text: msg.text
          }
        }));
      });
    });
  }

  private onExtHasNewMessages(pin: string, socket: SocketIO.Socket) {
	  let usrs = this.ext.filter((item: any) => item.user.pin === pin)
                       .map((item: any) => item.user);
    if (usrs.length > 0) {
      this.messageRepository.getNewIncomePersonMessages(usrs[0].id, (error, result) => {
        if (error) {
          console.log('Error in new income messages query.', error);
          return;
        }
        if (result.length > 0)
          socket.emit('ext has new messages');
      });
    };

  }

	listen() {
		this.io.on('connection', (socket: SocketIO.Socket) => {
			socket.on('online',
        (user: any) => this.onOnline(user, socket));
			socket.on('disconnect',
        () => this.onDisconnect(socket));
			socket.on('new message',
        (data: any) => this.onNewMessage(data, socket));
			socket.on('read message',
        (data: any) => this.onReadMessage(data, socket));
			socket.on('start printed',
				(data: string) => this.onStartPrinted(data, socket));
			socket.on('end printed',
				(data: string) => this.onEndPrinted(data, socket));
			socket.on('ext online',
        (data: any) => this.onExtOnline(data, socket));
			socket.on('ext has new messages',
        (data: any) => this.onExtHasNewMessages(data.pin, socket));
		});
	}

}