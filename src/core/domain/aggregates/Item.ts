import { Money } from "../valueObjects/Money";

export class Item {
	private _id: number;
	private _name: string;
	private _price: Money;

	private constructor(name: string, price: Money) {
		this._name = name;
		this._price = price;
	}

	public static create(name: string, price: string): Item {
		const moneyPrice = Money.fromString(price);
		return new Item(name, moneyPrice);
	}

	public get price(): Money {
		return this._price;
	}

	public toDTO() {
		return {
			id: this._id,
			name: this._name,
			price: this._price.toString(),
		};
	}

	public static fromDTO(dto: any): Item {
		const moneyPrice = Money.fromString(dto.price);
		const item = new Item(dto.name, moneyPrice);
		item._id = dto.id;
		return item;
	}
}
