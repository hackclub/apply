# Contributing

First, thank you for contributing! Here’s some basics about our codebase.

## Quick Start

1. Clone the repository and enter it

````sh
git clone https://github.com/hackclub/apply.git
cd apply
```sh
2. Install packages & run
```sh
yarn && yarn run dev
````

3. It should now be running, open [localhost:8000](http://localhost:8000) to view

## Formatting

In all prose (form labels, text blocks, etc), use rich quotes.

For code formatting, we use [Prettier](https://prettier.io) with options.
Before committing, run `yarn run fmt` and you’re good to go.

## Design System

This site uses the [Hack Club Design System](https://design.hackclub.com) for
all UI primitives (Text, Buttons, etc).

- Use `styled-components` to add any custom styling to DS components.
- Whenever style utility props (whitespace, color, etc) might be used,
  make use of DS’s components.
- If style utility props aren’t needed, use JSX tags or `styled.tag`
  for performance.
