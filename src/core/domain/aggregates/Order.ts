import { Item } from "../aggregates/Item";
import { IOrder } from "../interfaces/IOrder";
import { Money } from "../valueObjects/Money";
import { v4 as uuidv4 } from "uuid";
import { Payment } from "../valueObjects/Payment";

export class Order {
	private _id: string;
	private _items: Item[];
	private _amount: Money;
	private _createdAt: Date;
	private _payments: Payment[];

	public get id(): string {
		return this._id;
	}

	private constructor(items: Item[], amount: Money, payments: Payment[]) {
		this._id = uuidv4();
		this._items = items;
		this._amount = amount;
		this._createdAt = new Date();
		this._payments = payments;
	}

	// Behavior/Methods
	private validateItemTotal(): boolean {
		const itemsTotal = this._items.reduce((prev, curr) => {
			return prev.add(curr.price);
		}, Money.fromString("0.00"));

		// Compare the numeric values instead of Money objects
		return itemsTotal.amount === this._amount.amount;
	}

	private validatePayments(): boolean {
		if (!this._payments || this._payments.length === 0) {
			return false;
		}

		const totalPaid = this._payments.reduce(
			(sum, payment) => sum.add(payment.amount),
			Money.fromString("0.00")
		);
		return totalPaid.amount === this._amount.amount;
	}

	public static create(
		items: Item[],
		amount: Money,
		payments: Payment[]
	): Order {
		const order = new Order(items, amount, payments);

		if (!order.validateItemTotal()) {
			throw new Error("Order total does not match items total");
		}

		if (!order.validatePayments()) {
			throw new Error("Total payments must equal order amount");
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

	public static fromDTO(dto: Partial<IOrder>): Order {
		if (!Array.isArray(dto.items)) {
			throw new Error("Items must be an array");
		}

		if (!Array.isArray(dto.payments)) {
			throw new Error("Payments must be an array");
		}

		if (!(dto.amount instanceof Money)) {
			if (typeof dto.amount !== "string") {
				throw new Error("Amount must be a string or Money instance");
			}
		}

		try {
			const items = dto.items.map((item) => Item.fromDTO(item));
			const payments = dto.payments.map((payment) =>
				Payment.create(payment.amount, payment.paidAt, payment.id)
			);
			return Order.create(items, dto.amount, payments);
		} catch (error) {
			throw new Error(`Invalid order: ${error.message}`);
		}
	}
}
