import { Money } from "./Money";

export class Payment {
	private constructor(
		private readonly _amount: Money,
		private readonly _paidAt: Date,
		private readonly _id?: number
	) {}

	public get amount(): Money {
		return this._amount;
	}

	public get paidAt(): Date {
		return this._paidAt;
	}

	public get id(): number | undefined {
		return this._id;
	}

	public static create(
		amount: string | Money,
		paidAt: Date,
		id?: number
	): Payment {
		let moneyAmount: Money;

		if (typeof amount === "string") {
			moneyAmount = Money.fromString(amount); // Convert string to Money
		} else {
			moneyAmount = amount; // Already a Money instance
		}

		if (moneyAmount.isNegative() || moneyAmount.isZero()) {
			throw new Error("Payment amount must be positive");
		}

		return new Payment(moneyAmount, paidAt, id);
	}
}
