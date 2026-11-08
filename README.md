# Daylist

Daylist is a small, browser-based to-do list for capturing tasks and keeping track of what needs attention. It uses plain HTML, CSS, and vanilla JavaScript—no account, backend, framework, or package installation is required.

## Features

- Add tasks with an optional due date.
- Mark tasks complete or pending, mark them important, and delete them.
- Filter by all tasks, tasks due today, important, pending, or completed.
- Search task text and task dates; sort by creation date, due date, or name.
- See task totals for each filter.
- Keep tasks between visits with browser `localStorage`.

## Technology

- HTML5
- CSS3
- Vanilla JavaScript

## Project structure

```text
.
├── index.html              # Home page
├── workspace.html          # To-do list workspace
├── blog.html               # Short notes about lists and routines
├── myintro.html            # Project information
├── CSS/
│   ├── default.css         # Shared colors, typography, and base styles
│   ├── navbar-footer.css   # Shared navigation and footer
│   ├── home.css
│   ├── workspace.css
│   ├── blog.css
│   └── about.css
├── Javascript/
│   ├── navbar.js
│   └── workspace.js
└── Assets/
    └── Avtar/              # Original avatar asset (not required by current pages)
```

## Run locally

Open `index.html` in a browser, or serve this folder with any static file server. For example, from the project directory:

```powershell
py -m http.server 8000
```

Then open `http://localhost:8000`.

## Task storage

Tasks are stored in the browser's `localStorage` under the `daylist.tasks.v1` key. They stay in the same browser profile on the same device, but are not synced between devices or browsers. Clearing site data removes the saved list. If saved data is malformed or browser storage is unavailable, the workspace reports the issue and remains usable for the current page session.

## Deploy

This is a static site. Publish the project files to any static hosting provider (for example, GitHub Pages) with the HTML files at the published root. No build step or server configuration is needed.
