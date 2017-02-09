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

	public static bootstrap(server: http.Server): SocketServer {
		return new SocketServer(server);
	}

	constructor(server: http.Server) {
		this.personRepository = new PersonRepository();
    this.messageRepository = new MessageRepository();
		this.io = socketIo(server);
		this.listen();
	}

	listen() {
		this.io.on('connection', (socket: SocketIO.Socket) => {
			socket.on('online', (user: any) => {
				this.users = [...this.users, {user: user, socket: socket}];
				this.io.emit('online', this.users.map(item => item.user.id));
			});
			socket.on('disconnect', () => {
				this.users = this.users.filter((item: any) => item.socket.id !== socket.id);
				socket.broadcast.emit('online', this.users.map(item => item.user.id));
			});
			socket.on('new message', (data: any) => {
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
			});
			socket.on('read message', (data: any) => {
				let result = this.users.filter(item => item.user.id === data.contact.personFrom);
				if (result.length > 0) {
					result[0].socket.emit('read message', data.message);
				}
			});
			socket.on('ext online', (data: any) => {
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
			});
		});
	}

}