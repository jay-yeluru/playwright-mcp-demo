# 🛠️ Playwright MCP — Complete Setup Guide

This guide walks you through setting up `@playwright/mcp` from scratch. It covers three AI tools: **Claude Desktop**, **VS Code (GitHub Copilot)**, and **Antigravity IDE**.

> **What is MCP?**
> MCP (Model Context Protocol) is a standard that lets AI assistants connect to external tools — in this case, a live browser. Without MCP, your AI can only read code. With MCP, it can actually open a browser, click buttons, read the DOM, and write tests based on what it sees.

---

## 📋 Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Clone and Install](#2-clone-and-install)
3. [Understand the Two Playwright MCP Packages](#3-understand-the-two-playwright-mcp-packages)
4. [Configure Your AI Tool](#4-configure-your-ai-tool)
   - [Claude Desktop](#41-claude-desktop)
   - [VS Code — GitHub Copilot](#42-vs-code--github-copilot-agent-mode)
   - [Antigravity IDE](#43-antigravity-ide)
5. [Verify MCP is Connected](#5-verify-mcp-is-connected)
6. [Fix Your tsconfig.json](#6-fix-your-tsconfigjson)
7. [Common Errors and Fixes](#7-common-errors-and-fixes)

---

## 1. Prerequisites

Before starting, make sure you have the following installed on your machine.

### Node.js (v18 or higher)

Check if you have it:

```bash
node --version
```

If the command is not found or shows a version below 18, download it from [nodejs.org](https://nodejs.org).

### npm (comes with Node.js)

```bash
npm --version
```

### Git

```bash
git --version
```

If not installed, download from [git-scm.com](https://git-scm.com).

---

## 2. Clone and Install

### Clone the repository

```bash
git clone https://github.com/jay-yeluru/playwright-mcp.git
cd playwright-mcp
```

### Install all dependencies

```bash
npm install
```

> This installs Playwright, `@playwright/mcp`, and all other packages listed in `package.json`.

### Install the Chromium browser

Playwright needs a browser binary to run tests. Install Chromium:

```bash
npx playwright install chromium
```

### Set up your environment file

```bash
cp .env.example .env
```

The default `BASE_URL` in `.env` points to the TodoMVC demo app — no changes needed to get started.

---

## 3. Understand the Two Playwright MCP Packages

This is the most common source of confusion for beginners. There are **two different MCP packages** that ship with Playwright, and they do very different things.

| Package            | Command                              | What it does                                                      |
| ------------------ | ------------------------------------ | ----------------------------------------------------------------- |
| `@playwright/mcp`  | `npx @playwright/mcp`                | Gives AI a **live browser** — navigate, click, snapshot, read DOM |
| `@playwright/test` | `npx playwright run-test-mcp-server` | Lets AI **run existing tests** — no browser control               |

**This project uses `@playwright/mcp`.** If your `package.json` scripts look like this, update them:

```json
// ❌ wrong — this is the test-runner MCP, not browser control
"mcp": "npx playwright run-test-mcp-server"

// ✅ correct
"mcp": "npx @playwright/mcp"
```

### Verify `@playwright/mcp` is installed

```bash
cat package.json | grep "@playwright/mcp"
```

You should see:

```json
"devDependencies": {
  "@playwright/mcp": "^0.0.x"
}
```

If it's missing, install it:

```bash
npm install @playwright/mcp --save-dev
```

### Check there is only one version of `@playwright/test`

```bash
npm ls @playwright/test
```

You should see a single version. If two versions appear, run:

```bash
npm dedupe
```

---

## 4. Configure Your AI Tool

### Find your project's absolute path

Every AI tool config requires the **absolute path** to your project folder. Run this in your terminal from inside the project:

```bash
pwd
```

Example output:

```
/Users/jay/learn/automation/playwright-mcp
```

Save this — you'll need it in the config below.

> **Windows users:** Run `pwd` in PowerShell. Use forward slashes in JSON configs, e.g. `C:/Users/jay/projects/playwright-mcp`.

---

### 4.1 Claude Desktop

#### Step 1 — Find the config file

| OS      | Path                                                              |
| ------- | ----------------------------------------------------------------- |
| macOS   | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Windows | `%APPDATA%\Claude\claude_desktop_config.json`                     |

Open it in any text editor. If it doesn't exist, create it.

#### Step 2 — Add the MCP server

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"],
      "env": {
        "PATH": "/usr/local/bin:/usr/bin:/bin"
      },
      "cwd": "/Users/jay/learn/automation/playwright-mcp"
    }
  }
}
```

> Replace the `cwd` value with your own path from `pwd`.
> The `PATH` in `env` ensures Claude can find `npx`. On macOS, `/usr/local/bin` is the standard Node.js location. Adjust if needed.

#### Step 3 — Validate the JSON

A single missing comma or bracket breaks the whole config silently. Validate it:

```bash
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json | python3 -m json.tool
```

If it prints the JSON back cleanly, it's valid. If it throws an error, fix the syntax first.

#### Step 4 — Restart Claude Desktop

Fully quit Claude Desktop (don't just close the window — quit from the menu bar or Dock) and reopen it.

---

### 4.2 VS Code — GitHub Copilot (Agent mode)

#### Step 1 — Enable Agent mode in Copilot

1. Open the Copilot Chat panel (`Ctrl+Shift+I` / `Cmd+Shift+I`)
2. Switch the mode dropdown from **Ask** to **Agent**

#### Step 2 — Create `.vscode/mcp.json`

Create this file in your project root (VS Code auto-reads it):

```json
{
  "servers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

> No `cwd` needed here — VS Code uses the workspace root automatically.

#### Step 3 — Confirm the server is registered

1. Open Command Palette → `Ctrl+Shift+P` (Mac: `Cmd+Shift+P`)
2. Type **"MCP: List Servers"**
3. `playwright` should appear with status **running**

If it doesn't appear, check `View → Output → MCP` for error messages.

---

### 4.3 Antigravity IDE

> Antigravity is Google's AI-powered IDE built on VS Code with Gemini integration.

#### Step 1 — Open the MCP config

1. Click on the **Agent session** panel
2. Click the **"…"** dropdown at the top
3. Select **MCP Servers** → **Manage MCP Servers** → **View raw config**

This opens `mcp_config.json` directly in the editor.

#### Step 2 — Find the config file location

| OS      | Path                                                |
| ------- | --------------------------------------------------- |
| macOS   | `~/.gemini/antigravity/mcp_config.json`             |
| Windows | `%USERPROFILE%\.gemini\antigravity\mcp_config.json` |

#### Step 3 — Add the MCP server

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"],
      "cwd": "/Users/jay/learn/automation/playwright-mcp"
    }
  }
}
```

> ⚠️ Antigravity does **not** support `${workspaceFolder}` — always use the absolute path from `pwd`.

#### Step 4 — Verify in the MCP Servers panel

1. Go back to **Manage MCP Servers**
2. Refresh the page
3. Confirm `playwright` appears in the active server list

---

## 5. Verify MCP is Connected

Once configured, confirm the AI can actually reach the browser tools before running any prompts.

### Smoke test prompt

Send this to your AI in any tool:

> _"List all available MCP tools"_

If connected, you'll see tools like:

```
browser_navigate
browser_click
browser_snapshot
browser_type
browser_wait_for
browser_select_option
...
```

If the AI says it has no tools or doesn't know what MCP is — the server isn't connected. Check the steps below.

---

### Claude Desktop — check the hammer icon

After restarting, open a new chat. Look for the **🔨 hammer icon** in the message input bar. Click it — the Playwright tools should be listed there.

If the icon is missing, check the logs:

```bash
# macOS
tail -f ~/Library/Logs/Claude/mcp-server-playwright.log

# Windows (run in PowerShell)
Get-Content "$env:APPDATA\Claude\logs\mcp-server-playwright.log" -Wait
```

### VS Code (Copilot) — check MCP output

```
View → Output → select "MCP" from the dropdown
```

Any startup errors will be logged here.

### Antigravity — check the server status

Go to **Manage MCP Servers** and look for a green status indicator next to `playwright`.

---

## 6. Fix Your `tsconfig.json`

Without an explicit `include` field, TypeScript scans all files including `playwright.config.ts` — this causes false IDE errors like `test.describe() called in wrong context` even when your tests run fine.

Update your `tsconfig.json` to scope it correctly:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "CommonJS",
    "moduleResolution": "Node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["tests/**/*", "pages/**/*", "fixtures/**/*", "data/**/*"],
  "exclude": ["node_modules", "playwright.config.ts"]
}
```

After saving, restart the TS language server:

- VS Code / Antigravity: `Cmd+Shift+P` → **"TypeScript: Restart TS Server"**

Also make sure VS Code uses the project's TypeScript, not its bundled version. Add this to `.vscode/settings.json`:

```json
{
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

---

## 7. Common Errors and Fixes

| Error / Symptom                                  | Cause                             | Fix                                                              |
| ------------------------------------------------ | --------------------------------- | ---------------------------------------------------------------- |
| 🔨 Hammer icon missing in Claude Desktop         | Config not loaded                 | Fully quit and reopen; validate JSON with `python3 -m json.tool` |
| AI says it has no browser tools                  | MCP server not connected          | Check logs; verify `cwd` is absolute path                        |
| `npx @playwright/mcp` prompts to install         | Package not installed locally     | Run `npm install @playwright/mcp --save-dev`                     |
| MCP script uses `playwright run-test-mcp-server` | Wrong package                     | Update `package.json` scripts to `npx @playwright/mcp`           |
| `test.describe() called here` error in IDE       | `tsconfig.json` missing `include` | Add `include` and `exclude` as shown in Section 6                |
| Browser doesn't open during test run             | Chromium not installed            | Run `npx playwright install chromium`                            |
| Two versions of `@playwright/test`               | Dependency conflict               | Run `npm dedupe`                                                 |
| `cwd` not found error in Antigravity             | Used `${workspaceFolder}`         | Replace with absolute path from `pwd`                            |

---

## ✅ Setup Checklist

Use this to confirm everything is in order before writing your first AI-generated test:

- [ ] Node.js v18+ installed
- [ ] `npm install` completed
- [ ] `npx playwright install chromium` completed
- [ ] `@playwright/mcp` in `devDependencies`
- [ ] `package.json` mcp script uses `npx @playwright/mcp`
- [ ] AI tool config updated with correct absolute `cwd` path
- [ ] Config JSON is valid (no syntax errors)
- [ ] AI tool restarted after config change
- [ ] Smoke test prompt returns browser tools list
- [ ] `tsconfig.json` has `include` and `exclude` fields
- [ ] No duplicate `@playwright/test` versions (`npm ls @playwright/test`)

---

Once all boxes are checked — head back to [README.md](../README.md) and start generating tests. ⭐
