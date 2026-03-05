# Playwright MCP Demo

This project demonstrates how to integrate and use the **Playwright Model Context Protocol (MCP) Server** with AI agents (like GitHub Copilot) to automate, plan, and heal your end-to-end tests intelligently.

## What is Playwright MCP?

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/) is an open standard that enables AI models to securely interact with local tools and data sources.

The `playwright run-test-mcp-server` is an official MCP server provided by Playwright. It exposes Playwright's core testing capabilities directly to AI agents. By connecting an agent framework to this MCP server, the AI can:
* Execute Playwright tests and read results.
* Analyze browser states (snapshots, console logs, network requests).
* Automatically generate test steps, configure page setup, and write spec files.
* Programmatically identify reasons for test failures, suggest locators, and intuitively heal broken tests.

## Included Agent Roles

This project includes specific AI agent instructions located in `.github/agents/` that leverage the Playwright MCP server:

1. **`playwright-test-planner`**: Exploratory testing agent. Designed to browse a target application, identify UI elements, and generate comprehensive markdown test plans.
2. **`playwright-test-generator`**: Test implementation agent. Consumes a test plan (e.g., `e2e/specs/demo-plan.md`) and a seed test file (`e2e/tests/seed.spec.ts`), executes the behavior natively in the browser, and writes out completed Playwright `*.spec.ts` files with perfect locators.
3. **`playwright-test-healer`**: Debugging agent. Whenever a test fails, this agent will execute it using the Playwright debug tools to analyze snapshots and locators, fix the assertions or selectors in the code, and re-test until green.

## Project Structure

This project uses a structured architecture to cleanly separate *requirements*, *framework objects*, and *test execution*:

* **`e2e/specs/` (The Test Plans):** This folder contains plain-English markdown files (e.g., `demo-plan.md`). These describe the features and scenarios the app should support. An AI agent reads these specs to understand *what* needs to be tested before generating code.
* **`e2e/pages/` (The Page Object Model):** The Page Object Model (POM) is a design pattern that creates an object repository for web UI elements. Files in this directory (e.g., `TodoPage.ts`) encapsulate all Playwright locators (`page.locator()`) and interactions for a specific page. This makes tests highly reusable, readable, and easier for AI to maintain.
* **`e2e/tests/` (The Executable Tests):** This directory contains the actual Playwright `.spec.ts` files that are executed. The AI Generator creates or updates these files by combining instructions from `e2e/specs/` with the reusable methods defined in the `e2e/pages/` POM.

## Getting Started

### Prerequisites
* Node.js v18+
* Ensure Playwright browsers are installed:
  ```bash
  npx playwright install chromium
  ```

### Running the Tests
To run the included standard demo tests manually:
```bash
npm run test
```

### Running the MCP Server
To manually start the Playwright MCP Server on your machine:
```bash
npm run mcp
# Which executes: npx playwright run-test-mcp-server
```
*Note: In an actual AI Agent setup (like VS Code Copilot with MCP tool support or Claude Desktop), the server is typically invoked automatically via standard input/output (stdio) when the prompt tools are requested.*

## Beginner's Step-by-Step Guide

This guide will walk you through, step-by-step, how to use this project with an AI agent (like GitHub Copilot in VS Code or Claude Desktop) to write and heal playright tests automatically using MCP.

### Step 1: Client Setup (Connecting the AI to MCP)
For your AI workspace to realize it has access to the Playwright tools, it needs to be configured to talk to the MCP server.

**For VS Code (using an MCP-compatible extension):**  
This repository already includes `.vscode/mcp.json`. Extensions that support MCP will automatically read this file and start the `playwright run-test-mcp-server` so the AI can use it.

**For Claude Desktop:**  
You would configure your `claude_desktop_config.json` with the same `stdio` command to run the Playwright MCP server inside this folder.

### Step 2: The Action Plan
We've included a plain-english test plan inside `e2e/specs/demo-plan.md`. This plan simply tells the AI what standard behaviors a Todo app has (Add a todo, complete a todo, etc).  
Open this file to see what we want to test.

### Step 3: Prompting the AI to Generate Tests 🪄
Open your AI chat window (e.g. Copilot Edits or Claude).  

Type the following prompt. You must *mention* (`@` or `#`) the files so the AI reads them:
> *"Read the test scenarios in `e2e/specs/demo-plan.md`. Use the `e2e/tests/seed.spec.ts` as the starting file template. I want you to act as the test generator. Use your Playwright MCP tools to navigate the site, figure out the locators, and generate the final Playwright test code directly inside `e2e/tests/seed.spec.ts`."*

**What happens next?**
1. The AI uses the MCP server to open a hidden (or visible) chromium browser.
2. It interacts with `https://demo.playwright.dev/todomvc/`.
3. It figures out the perfect `.css` / `text` locators (like `.new-todo`).
4. It edits `e2e/tests/seed.spec.ts` with the fully automated script!

### Step 4: Verify the Tests manually!
Now, just run it like a regular developer.
```bash
npm run test
```
Everything should pass green ✅, meaning the AI successfully wrote end-to-end tests for you by actually driving the browser behind the scenes!

### Step 5: Heal a Broken Test 🩺
Software changes, and locators break. MCP can fix them.

1. **Break it:** Manually open `e2e/tests/seed.spec.ts` and change a valid locator the AI wrote to something wrong (e.g., change `.new-todo` to `.broken-input`).
2. **Fail it:** Run `npm run test` to see it fail.
3. **Heal it:** Go back to your AI Chat and simply prompt:
> *"My tests are failing. Act as a test healer. Use your Playwright MCP debug tools to investigate the test run, find out why the locator is failing, figure out the new correct locator, and fix the file."*

The AI will spin up Playwright MCP, read the error stack, snapshot the page again, and fix your broke code!