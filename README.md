# better-chat

![Imgur](https://i.imgur.com/CtOO51r.png)
![Imgur](https://i.imgur.com/iAjSI4E.gif)
![Imgur](https://i.imgur.com/HtCitrs.gif)

## Getting Started

### Installation

```bash
yarn
```

### Run the project

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo

Here is a working live demo : https://better-chat.vercel.app

## Technologies

- React
- Next.js
- Firebase

#### Testing

- Cypress (End to End Testing)

#### Tools

- ESLint
- Prettier

## Features

#### The Production Ready React Framework - Next.js

Using `Next.js` to embrace lots of features with little or no configuration required, like server-side rendering capabilities, file-system based routing, code splitting, and other features we need for production.

#### Ensuring Code Quality and Keep Style Consistent

Using `ESLint` and `Prettier` as the code linter and formatter to enforces a consistent style, find and fix problems.

#### End to End Testing with Cypress

Using `Cypress` to test both logic and view, such as log in the chatroom, see and send messages.

## Description

1. Auth is the login page, only support for `Google Login` currently.
2. After login, your `name` and `email` will display on the top right corner
3. You can `see` the latest 30 messages (if exist) by default
4. You can `send` any text or emoji to the chatroom by typing the message at the bottom of the input, then press enter or tap the send button to send it
5. If anyone else sends a message to the chatroom, you can see it rapidly without reloading needed
