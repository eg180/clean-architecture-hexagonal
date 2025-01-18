import { Money } from "../valueObjects/Money";

export interface IItem {
	id?: number;
	name: string;
	price: Money;
}
