import { IOrder } from "../../core/domain/interfaces/IOrder";

export interface OrderDTO extends Omit<IOrder, "id" | "createdAt"> {}
