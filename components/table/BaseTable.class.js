export class TableColumn {
	constructor({
		title = '',
		id = '',
		sort = false,
		size = 'md',
		flexible = false,
		style = {},
		multiLine = false,
		sticky = null,
	}) {
		this.title = title;
		this.id = id;
		this.sort = sort;
		this.size = size;
		this.flexible = flexible;
		this.style = style;
		this.multiLine = multiLine;
		this.sticky = sticky;
	}
}
