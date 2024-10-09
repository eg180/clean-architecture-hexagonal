import { Order } from "../../core/domain/entities/Order";

export interface OrderDTO extends Omit<Order, "id" | "createdAt"> {}
