import { Money } from "../valueObjects/Money";

export interface Item {
	id: string;
	name: string;
	price: Money;
}
