/**
 * Typed test data for the TodoMVC suite.
 *
 * Centralising strings here means:
 *  - No magic values scattered through spec files
 *  - Renaming a label is a single-file change
 *  - TypeScript gives you autocomplete on every property
 */
export const TODO_ITEMS = {
    first: 'Buy groceries',
    second: 'Walk the dog',
    third: 'Read a book',
} as const;

export type TodoItem = typeof TODO_ITEMS[keyof typeof TODO_ITEMS];
