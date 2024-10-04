// Purpose: Define interfaces for core business logic to interact with external concerns.
export interface Client<T> {
	send(type: T): Promise<T>;
}
