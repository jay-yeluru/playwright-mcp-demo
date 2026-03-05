import { test } from '../fixtures/base';
import { TODO_ITEMS } from '../data/todo.data';

/**
 * TodoMVC reference implementation.
 *
 * This is the "after" state — what a well-structured AI-generated suite
 * should look like. Compare it to seed.spec.ts (the blank canvas).
 *
 * Each describe block owns one behaviour area.
 * The `todoPage` fixture auto-navigates to the app — no setup boilerplate needed.
 */

test.describe('Adding todos', () => {
    test('adds a single todo', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);

        await todoPage.expectCount(1);
        await todoPage.expectItemText(0, TODO_ITEMS.first);
    });

    test('adds multiple todos', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);
        await todoPage.addTodo(TODO_ITEMS.second);
        await todoPage.addTodo(TODO_ITEMS.third);

        await todoPage.expectCount(3);
        await todoPage.expectItemText(0, TODO_ITEMS.first);
        await todoPage.expectItemText(1, TODO_ITEMS.second);
        await todoPage.expectItemText(2, TODO_ITEMS.third);
    });
});

test.describe('Completing todos', () => {
    test('marks a todo as completed', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);
        await todoPage.completeTodo(0);

        await todoPage.expectCompleted(0, true);
    });

    test('completed item is visually distinct from active items', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);
        await todoPage.addTodo(TODO_ITEMS.second);

        await todoPage.completeTodo(0);

        await todoPage.expectCompleted(0, true);
        await todoPage.expectCompleted(1, false);
    });
});

test.describe('Deleting todos', () => {
    test('removes a todo from the list', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);
        await todoPage.addTodo(TODO_ITEMS.second);

        await todoPage.deleteTodo(0);

        await todoPage.expectCount(1);
        await todoPage.expectItemText(0, TODO_ITEMS.second);
    });
});

