import { Item } from "../../core/domain/entities/Item";

export interface ItemDTO extends Omit<Item, "id"> {}
