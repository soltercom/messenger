import { IEntityJSON, IEntity, Entity, Contact } from './';

export interface IOrderJSON extends IEntityJSON{
	contact?: string;
	date?:    string;
	text?:    string;
	status?:  number;
	phone?:   string;
	done?:    string;
}

export interface IOrder extends IEntity {
	contact?: Contact;
	date?:    string;
	text?:    string;
	status?:  number;
	phone?:   string;
	done?:    string;
}

export class Order extends Entity {

	private _contact: Contact;
	private _date:    string;
	private _text:    string;
	private _status:  number;
	private _phone:   string;
	private _done:    string;

	constructor(data: IOrder) {
		super(data);
		this.contact = data.contact;
		this.date    = data.date;
		this.text    = data.text;
		this.status  = data.status;
		this.phone   = data.phone;
		this.done    = data.done;
	}

	clone(): Order {
		if (!this) return null;
		return new Order(this.toIEntity());
	}

	update(data: IOrder): Order {
		super.update(data);
		this.contact = data.contact || this.contact;
		this.date    = data.date || this.date;
		this.text    = data.text || this.text;
		this.status  = data.status || this.status;
		this.phone   = data.phone || this.phone;
		this.done    = data.done || this.done;
		return this;
	}

	toServer(): IOrderJSON {
		return Object.assign(super.toServer(), {
			contact: Entity.getRefId(this.contact),
			date:    this.date,
			text:    this.text,
			status:  this.status,
			phone:   this.phone,
			done:    this.done
		});
	}

	toIEntity(): IOrder {
		return Object.assign(super.toIEntity(), {
			contact: this.contact,
			date:    this.date,
			text:    this.text,
			status:  this.status,
			phone:   this.phone,
			done:    this.done
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

	get status() { return this._status; }
	set status(status: number) { this._status = status; }

	get phone() { return this._phone; }
	set phone(phone: string) { this._phone = phone; }

	get done() { return this._done; }
	set done(done: string) { this._done = done; }

	getStatus(): string {
		switch (this.status) {
			case 0: return 'Формирование';
			case 1: return 'Отправлена';
			case 2: return 'Получена';
			case 3: return 'Отменена';
			case 4: return 'Выполнена';
			default: return 'Формирование';
		}
	}

}