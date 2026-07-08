# Games

A collection of small browser games built with HTML, CSS, JavaScript, and TypeScript.

This repository contains a simple website for launching and organizing multiple web games. Each game is placed in its own folder, while shared TypeScript source code is stored in the `src` directory.

## Live Demo

You can play the games online here:

[https://microegor.github.io/Games](https://microegor.github.io/Games)

## Games

The project currently includes:

* Bird
* Bridge
* Cross Road
* Jumper
* Tower Defence

## Tech Stack

* HTML
* CSS
* JavaScript
* TypeScript

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/microegor/Games.git
cd Games
```

Install dependencies:

```bash
npm install
```

### Build

Compile the TypeScript source files:

```bash
npm run build
```

The compiled files will be generated in the `dist` directory.

### Run Locally

Open `index.html` in your browser, or use any local static server.

For example:

```bash
npx serve .
```

Then open the local URL shown in the terminal.

## Development

Game source code is organized by game name. To add a new game:

1. Create a new folder inside `games/`.
2. Add the game HTML, CSS, JavaScript, and assets.
3. Add TypeScript source files inside `src/` if needed.
4. Link the new game from the main page.

## License

This project is licensed under the MIT License.
