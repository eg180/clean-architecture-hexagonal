import { Money } from "../valueObjects/Money";

export interface IPayment {
	id?: number;
	amount: Money;
	paidAt: Date;
}
