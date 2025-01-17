import { Item } from "../entities/Item";

export class Order {
	private _id: number;
	private _items: Item[];
	private _amount: string;
	private _createdAt: Date;

	public get id(): number {
		return this._id;
	}

	private constructor(items: Item[], amount: string) {
		this._items = items;
		this._amount = amount;
		this._createdAt = new Date();
	}

	// Factory method
	public static create(items: Item[], amount: string): Order {
		const order = new Order(items, amount);
		if (!order.validateItemTotal()) {
			throw new Error("Order total does not match items total");
		}
		return order;
	}

	// Business logic
	private validateItemTotal(): boolean {
		const itemsTotal = this._items.reduce((prev, curr) => {
			return prev + parseFloat(curr.price);
		}, 0);
		return itemsTotal === parseFloat(this._amount);
	}

	// Value object for DTO conversion
	public toDTO() {
		return {
			id: this._id,
			items: this._items,
			amount: this._amount,
			createdAt: this._createdAt,
		};
	}

	public static fromDTO(dto: any): Order {
		const order = new Order(dto.items, dto.amount);
		order._id = dto.id;
		order._createdAt = dto.createdAt;
		return order;
	}
}
