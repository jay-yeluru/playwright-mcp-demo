import { test, expect } from "@playwright/test";
import { TodoPage } from "../pages/TodoPage";

test.describe("Demo application POM", () => {
  test("seed using POM", async ({ page }) => {
    // 1. Initialize the Page Object Model
    const todoPage = new TodoPage(page);

    // 2. Navigate using POM method
    await todoPage.goto();

    // The AI or developer can now generate code here using the `todoPage` object!
    // Example: await todoPage.addTodo('Buy groceries');
  });
});
