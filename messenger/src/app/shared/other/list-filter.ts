export class ListFilter<T> {

	private _filter: string = '';
	private _list: T[] = [];
  private _unfilteredList: T[] = [];

	constructor(private filterFn:(item: T, filter: string) => boolean,
	            private sortFn: (a: T, b: T) => number) {}

	get list() { return this._list; }
	set list(unfilteredList: T[]) {
	  this._unfilteredList = unfilteredList;
    this.filterList();
  }

  set filter(filter: string) {

	  filter = filter.toLowerCase().trim();

    if (this._filter === filter) {
      return;
    } else {
      this._filter = filter;
      this.filterList();
    }

  }

  private filterList() {

	  if (this._filter === '')
      this._list = this._unfilteredList.sort(this.sortFn);
    else
      this._list = this._unfilteredList.filter((item: T) => this._filterFn(item))
                                       .sort(this.sortFn);

  }

	private _filterFn(item: T): boolean {
		return this.filterFn(item, this._filter);
	}

}