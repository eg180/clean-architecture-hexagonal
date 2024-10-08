import { Item } from "../../core/domain/entities/Item";
import { ItemApplicationService } from "./ItemApplicationService";
import { ItemService } from "../../core/domain/services/ItemService";
import { InMemoryItemRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryItemRepository";
import { InMemoryOrderRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { ItemDTO } from "../dto/ItemDTO";

describe("ItemApplicationService", () => {
	let itemApplicationService: ItemApplicationService;
	let inMemoryRepository: InMemoryItemRepository;

	beforeEach(() => {
		const itemService = new ItemService();
		inMemoryRepository = new InMemoryItemRepository();
		itemApplicationService = new ItemApplicationService(
			itemService,
			inMemoryRepository
		);
	});

	afterEach(() => {
		inMemoryRepository.clear();
	});
	describe("createItem", () => {
		it("should create an Item", async () => {
			const item: ItemDTO = {
				name: "Assistencia",
				price: "20.0",
			};

			const itemSaved = await itemApplicationService.createItem(item);

			expect(itemSaved.id).toEqual(1);
		});

		it("should throw an error for item with zero-length item name", async () => {
			const invalidItem = {
				name: "",
				price: "20.0",
			};
			await expect(
				itemApplicationService.createItem(invalidItem)
			).rejects.toThrowError("Invalid item");
		});

		it("should throw an error for item with a price of 0", async () => {
			const invalidItem = {
				name: "Free item",
				price: "0.0",
			};
			await expect(
				itemApplicationService.createItem(invalidItem)
			).rejects.toThrowError("Invalid item");
		});

		it("should throw an error for item with a negative price", async () => {
			const invalidItem = {
				name: "Refunded item",
				price: "-1.0",
			};
			await expect(
				itemApplicationService.createItem(invalidItem)
			).rejects.toThrowError("Invalid item");
		});
	});
	describe("getById", () => {
		it("should get item by id", async () => {
			const item1 = {
				name: "item one",
				price: "1.00",
			};
			const item2 = {
				name: "item two",
				price: "1.99",
			};

			const items = [item1, item2];

			items.forEach((item) => itemApplicationService.createItem(item as Item));

			const soughtItem = await itemApplicationService.getById(2);

			expect(soughtItem.id).toEqual(2);
		});
	});

	describe("getAll", () => {
		it("should find all Items", async () => {
			const item1 = {
				name: "item one",
				price: "1.00",
			};
			const item2 = {
				name: "item two",
				price: "1.99",
			};
			const item3 = {
				name: "item three",
				price: "2.99",
			};
			const item4 = {
				name: "item two",
				price: "3.99",
			};

			const items = [item1, item2, item3, item4];

			items.forEach((item) => itemApplicationService.createItem(item as Item));

			const allItems = await itemApplicationService.getAll();

			expect(allItems.length).toEqual(4);
			expect(items).toEqual(
				expect.arrayContaining([expect.objectContaining({ id: 4 })])
			);
		});
	});
});

describe("it correctly implements ItemService", () => {
	let inMemoryRepository: InMemoryItemRepository;
	let itemApplicationService: ItemApplicationService;
	let sut: ItemService;
	beforeEach(() => {
		sut = new ItemService();
	});

	it("should return false when an invalid item passed to validateItem method", () => {
		const invalidItem = {
			name: "",
			price: "3.99",
		};
		const result = sut.validateItem(invalidItem);
		expect(result).toBe(false);
	});
	it("should return true when an valid item passed to validateItem method", () => {
		const validItem = {
			name: "Toy",
			price: "4.99",
		};

		const result = sut.validateItem(validItem);
		expect(result).toBe(true);
	});
	it("should correctly calculate a discount", () => {
		const item = {
			name: "Toy",
			price: "4.99",
		};
		const result = sut.calculateDiscount(item);
		expect(result).toBe(0.49);
	});
});
