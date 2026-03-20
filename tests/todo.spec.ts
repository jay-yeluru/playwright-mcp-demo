import { test } from '../fixtures/base';
import { TODO_ITEMS } from '../data/todo.data';


test.describe('Adding todos', () => {
    test('adds a single todo', async ({ todoPage }) => {
        await todoPage.addTodo(TODO_ITEMS.first);

        await todoPage.expectCount(1);
        await todoPage.expectItemText(0, TODO_ITEMS.first);
    });
});
