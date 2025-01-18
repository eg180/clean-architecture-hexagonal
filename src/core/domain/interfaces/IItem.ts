import { Money } from "../valueObjects/Money";

export interface IItem {
	id?: string;
	name: string;
	price: Money;
}
