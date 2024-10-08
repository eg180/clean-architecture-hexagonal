import { Repository } from "typeorm";
import { Order } from "../../core/domain/entities/Order";
import { OrderService } from "../../core/domain/services/OrderService";
import { InMemoryOrderRepository } from "../../infrastructure/adapters/repository/inMemory/InMemoryOrderRepository";
import { OrderApplicationService } from "./OrderApplicationService";
import { ItemApplicationService } from "./ItemApplicationService";

describe("Order application service", () => {
	let orderApplicationService: OrderApplicationService;
	let orderRepository: InMemoryOrderRepository;

	beforeEach(() => {
		const orderService = new OrderService();
		orderRepository = new InMemoryOrderRepository();
		orderApplicationService = new OrderApplicationService(
			orderService,
			orderRepository
		);
	});

	afterEach(() => {
		orderRepository.clear();
	});

	it("should create an order", async () => {
		const orderPayload = {
			amount: "200.00",
			items: [
				{
					id: 1,
					name: "Product A",
					price: "20.00",
				},
				{
					id: 2,
					name: "Product B",
					price: "30.00",
				},
			],
			payments: [
				{
					id: 1,
					paidAt: new Date("2023-12-31T23:59:59Z"),
				},
			],
		};

		const order = await orderApplicationService.save(orderPayload);
		expect(order.id).toEqual(1);
	});

	it("should get order by id", async () => {
		const orderPayload = {
			amount: "200.00",
			items: [
				{
					id: 1,
					name: "Product A",
					price: "20.00",
				},
				{
					id: 2,
					name: "Product B",
					price: "30.00",
				},
			],
			payments: [
				{
					id: 1,
					paidAt: new Date("2023-12-31T23:59:59Z"),
				},
			],
		};
		await orderApplicationService.save(orderPayload);
		const result = await orderApplicationService.getById(1);
		expect(result.id).toEqual(1);
	});

	it("should find all the orders", async () => {
		const orders = [
			{
				amount: "200.00",
				items: [
					{
						id: 1,
						name: "Product A",
						price: "20.00",
					},
					{
						id: 2,
						name: "Product B",
						price: "30.00",
					},
				],
				payments: [
					{
						id: 1,
						paidAt: new Date("2023-12-31T23:59:59Z"),
					},
				],
			},
			{
				amount: "300.00",
				items: [
					{
						id: 1,
						name: "Product A",
						price: "20.00",
					},
					{
						id: 2,
						name: "Product B",
						price: "30.00",
					},
				],
				payments: [
					{
						id: 2,
						paidAt: new Date("2022-11-31T23:59:59Z"),
					},
				],
			},
		];
		orders.forEach(async (order) => {
			await orderApplicationService.save(order);
		});

		const result = await orderApplicationService.getAll();
		expect(result).toHaveLength(2);
	});
});
