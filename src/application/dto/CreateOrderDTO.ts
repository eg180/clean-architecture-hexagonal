import { IOrder } from "../../core/domain/interfaces/IOrder";

export interface CreateOrderDTO extends Omit<IOrder, "id" | "createdAt"> {}
