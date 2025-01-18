# Value Objects

This directory is for value objects in our domain model. Value objects are immutable objects that describe characteristics of our domain and are distinguished only by their attributes.

Examples of potential value objects:

- Money (amount + currency)
- Address (street, city, state, etc.)
- DateRange (start + end dates)
- OrderStatus (enum/string with validation)

Value objects differ from entities in that:

1. They have no identity
2. They are immutable
3. They are compared by their attributes, not identity
