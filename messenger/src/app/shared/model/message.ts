import { IEntityJSON, IEntity, Entity, Contact, Person } from './';

export interface IMessageJSON extends IEntityJSON{
	contact?: string;
	date?:    string;
	text?:    string;
	new?:     boolean;
}

export interface IMessage extends IEntity {
	contact?: Contact;
	date?:    string;
	text?:    string;
	new?:     boolean;
}

export class Message extends Entity {

	private _contact: Contact;
	private _date:    string;
	private _text:    string;
	private _new:     boolean;

	constructor(data: IMessage) {
		super(data);
		this.contact = data.contact;
		this.date    = data.date;
		this.text    = data.text;
		this.new     = data.new;
	}

	clone(): Message {
		if (!this) return null;
		return new Message(this.toIEntity());
	}

	update(data: IMessage): Message {
		super.update(data);
		this.contact = data.contact || this.contact;
		this.date    = data.date || this.date;
		this.text    = data.text || this.text;
		this.new     = data.new === undefined ? this.new: data.new;
		return this;
	}

	toServer(): IMessageJSON {
		return Object.assign(super.toServer(), {
			contact: Entity.getRefId(this.contact),
			date:    this.date,
			text:    this.text,
			new:     this.new
		});
	}

	toIEntity(): IMessage {
		return Object.assign(super.toIEntity(), {
			contact: this.contact,
			date:    this.date,
			text:    this.text,
			new:     this.new
		});
	}

	get contact() { return this._contact; }
	set contact(contact: Contact) { this._contact = contact; }

	get date() { return this._date; }
	set date(date: string) { this._date = date; }

	get text() { return this._text; }
	set text(text: string) {
		this._text = text;
		this.desc = text;
	}

	get new() { return this._new; }
	set new(_new: boolean) { this._new = _new; }

	getAddressee(user: Person): Person {
		return this.contact.personTo.isEqual(user)?
			     this.contact.personFrom:
			     this.contact.personTo;
	}

	isIncome(user: Person): boolean {
		return this.contact.personTo.isEqual(user);
	}

}