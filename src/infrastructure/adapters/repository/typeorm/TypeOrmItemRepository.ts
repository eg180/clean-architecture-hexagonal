import { Repository as RepositoryEntity } from "typeorm";
import { Item } from "../../../../core/domain/entities/Item";
import { Repository } from "../../../../core/ports/repository/Repository";
import { AppDataSource } from "./data-source";
import { ItemEntity } from "./entity/ItemEntity";
import { Money } from "../../../../core/domain/valueObjects/Money";

export class TypeOrmItemRepository implements Repository<Item> {
	private readonly entityManager: RepositoryEntity<ItemEntity>;

	constructor() {
		this.entityManager = AppDataSource.getRepository(ItemEntity);
	}

	async save(item: Item): Promise<Item> {
		const itemEntity = this.mapToItemEntity(item);

		const itemSaved = await this.entityManager.save(itemEntity);

		return this.mapToItemModel(itemSaved);
	}

	async getById(id: string): Promise<Item> {
		const itemEntity = await this.entityManager.findOneBy({
			id: parseInt(id),
		});

		return this.mapToItemModel(itemEntity);
	}

	async getAll(): Promise<Item[]> {
		const allItems = await this.entityManager.find();

		return allItems.map((item) => this.mapToItemModel(item));
	}

	private mapToItemModel(itemEntity: ItemEntity): Item {
		return {
			id: itemEntity.id.toString(),
			name: itemEntity.name,
			price: Money.fromString(itemEntity.price),
		};
	}

	private mapToItemEntity(item: Item): ItemEntity {
		const itemEntity = new ItemEntity();
		itemEntity.id = parseInt(item.id);
		itemEntity.name = item.name;
		itemEntity.price = item.price.toString();
		return itemEntity;
	}

	async clear(): Promise<void> {
		await this.entityManager.clear();
	}
}
