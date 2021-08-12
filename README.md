# Interview Scheduler

Interview Scheduler is a responsive single page app built with React,
using PostgreSQL to persist data to a local API.

## Setup

Install dependencies with `npm install`.

Clone the api server from https://github.com/lighthouse-labs/scheduler-api and follow the instructions to setup the database.
(Make sure PSQL is running before starting the app).

Run the development server and api server using `npm start` from the respective file paths for each.

## Screenshots

!["Desktop View"]()
Desktop layout displaying interviews for Monday with an appointment hovered to show edit/delete buttons.

!["Mobile View"]() 
Mobile layout displaying interviews for Monday, including form for editing/creating interviews.


## Dependencies

- axios
- classnames
- react
- react-dom
- react-scripts
- @testing-library/react-hooks
- prop-types
- react-test-renderer

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
