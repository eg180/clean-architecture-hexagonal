import { Money } from "../valueObjects/Money";

export class Item {
	private _id: string;
	private _name: string;
	private _price: Money;

	private constructor(name: string, price: Money) {
		if (!name || name.trim().length === 0) {
			throw new Error("Item name cannot be empty");
		}
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

	public get id(): string {
		return this._id;
	}

	public toDTO() {
		return {
			id: this._id,
			name: this._name,
			price: this._price.toString(),
		};
	}

	public static fromDTO(dto: any): Item {
		if (!dto.name || !dto.price) {
			throw new Error("Item requires name and price");
		}
		return Item.create(dto.name, dto.price);
	}
}
