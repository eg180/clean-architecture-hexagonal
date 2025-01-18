export class Money {
	private constructor(
		private readonly amount: number,
		private readonly currency: string = "USD"
	) {
		if (amount < 0) {
			throw new Error("Amount cannot be negative");
		}
	}

	public static fromString(value: string, currency: string = "USD"): Money {
		const amount = parseFloat(value);
		return new Money(amount, currency);
	}

	public toString(): string {
		return this.amount.toFixed(2);
	}

	public add(other: Money): Money {
		if (this.currency !== other.currency) {
			throw new Error("Cannot add different currencies");
		}
		return new Money(this.amount + other.amount, this.currency);
	}

	public equals(other: Money): boolean {
		return this.amount === other.amount && this.currency === other.currency;
	}
}
