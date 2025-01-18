export class Money {
	private constructor(
		private readonly _amount: number,
		private readonly _currency: string = "USD"
	) {
		if (this._amount < 0) {
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
		if (this._currency !== other._currency) {
			throw new Error("Cannot add different currencies");
		}
		return new Money(this._amount + other._amount, this._currency);
	}

	public equals(other: Money): boolean {
		return this._amount === other._amount && this._currency === other._currency;
	}

	public isNegative(): boolean {
		return this._amount < 0;
	}

	public isZero(): boolean {
		return this._amount === 0;
	}

	public isPositive(): boolean {
		return this._amount > 0;
	}

	public get amount(): number {
		return this._amount;
	}
}
