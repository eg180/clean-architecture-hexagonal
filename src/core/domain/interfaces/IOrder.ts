import { Money } from "../valueObjects/Money";
import { IItem } from "./IItem";
import { IPayment } from "./IPayment";

export interface IOrder {
	id?: string;
	items: IItem[];
	payments?: IPayment[];
	amount: Money;
	createdAt?: Date;
}
