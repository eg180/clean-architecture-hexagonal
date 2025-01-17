export class Item {
	private _id: number;
	private _name: string;
	private _price: string;

	private constructor(name: string, price: string) {
		this._name = name;
		this._price = price;
	}

	public static create(name: string, price: string): Item {
		if (!name || !price) {
			throw new Error("Item must have name and price");
		}
		return new Item(name, price);
	}

	public toDTO() {
		return {
			id: this._id,
			name: this._name,
			price: this._price,
		};
	}

	public static fromDTO(dto: any): Item {
		const item = new Item(dto.name, dto.price);
		item._id = dto.id;
		return item;
	}
}
