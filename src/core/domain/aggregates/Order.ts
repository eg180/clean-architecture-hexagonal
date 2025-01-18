import { Item } from "../entities/Item";
import { Money } from "../valueObjects/Money";

export class Order {
	private _id: number;
	private _items: Item[];
	private _amount: Money;
	private _createdAt: Date;

	public get id(): number {
		return this._id;
	}

	private constructor(items: Item[], amount: Money) {
		this._items = items;
		this._amount = amount;
		this._createdAt = new Date();
	}

	// Behavior/Methods
	private validateItemTotal(): boolean {
		const itemsTotal = this._items.reduce((prev, curr) => {
			return prev.add(curr.price);
		}, Money.fromString("0.00"));
		return itemsTotal.equals(this._amount);
	}

	public static create(items: Item[], amount: string): Order {
		const moneyAmount = Money.fromString(amount);
		const order = new Order(items, moneyAmount);
		if (!order.validateItemTotal()) {
			throw new Error("Order total does not match items total");
		}
		return order;
	}

	// Value object for DTO conversion
	public toDTO() {
		return {
			id: this._id,
			items: this._items,
			amount: this._amount.toString(),
			createdAt: this._createdAt,
		};
	}

	public static fromDTO(dto: any): Order {
		const moneyAmount = Money.fromString(dto.amount);
		const order = new Order(dto.items, moneyAmount);
		order._id = dto.id;
		order._createdAt = dto.createdAt;
		return order;
	}
}
