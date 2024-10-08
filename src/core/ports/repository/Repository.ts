// Purpose: Define interfaces for core business logic to interact with external concerns.

export interface Repository<T> {
	save(type: Omit<T, "id" | "createdAt">): Promise<T>;
	getById(id: number): Promise<T>;
	getAll(): Promise<T[]>;
}
