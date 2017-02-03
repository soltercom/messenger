export class NavLinkMetadata {

  constructor(private _link: string,
              private _title: string) {}

  get link():    string { return this._link; }
  get title():   string { return this._title; }

  get active(): boolean { return this.link === ''; }
}

export class ListFieldMetadata {

  constructor(private _name: string,
              private _desc: string) {}

  get name() { return this._name; }
  get desc() { return this._desc; }

}

export class DetailFieldMetadata {

  constructor(private _name: string,
              private _desc: string,
              private _type: string,
              private _ref: string,
              private _readonly?: boolean){}

  get name():        string  { return this._name;  }
  get desc():        string  { return this._desc;  }
  get type():        string  { return this._type;  }
  get isRef():       boolean { return this._ref.length > 0; }
  get ref():         string  { return this._ref; }
  get readonly():    boolean { return (this._readonly ? true: null); }

}