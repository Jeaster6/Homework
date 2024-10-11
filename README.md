# Cypress test for Hudy webstore

This project contains an automated Cypress test designed to verify the basic functionality of [Hudy webstore](https://www.hudy.cz/).
The test navigates to the store, selects a category and a sub-category of jackets, then filters out to only include L size.
The results are then sorted by price, in descending order. The two most expensive items are browsed and added to the shopping cart.
The test opens up the shopping cart menu, selects the delivery option and the payment method and fills in the personal details.
This only leaves out the pressing of the confirmation button, which would send the order.

The repository includes a workflow, which executes the test via GitHub actions when new code is pushed.

## Prerequisites

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (comes with Node.js)

You can check if everything is installed by running the following commands in your terminal:

```bash
git -v
node -v
npm -v
```

## Setting up the project

Inside your workspace directory run:

```bash
git clone https://github.com/Jeaster6/Homework.git
```
```bash
cd Homework
```
```bash
npm install cypress --save-dev
```

## Running the test

To run the test from the project root directory:

```bash
npx cypress open
```

This opens the Cypress Test Runner, where you can choose to run E2E test by selecting your prefered browser.


To run the test headless in chrome:

```bash
npx cypress run --browser chrome
```
