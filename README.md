# Testing JavaScript with Cypress

Commenced: 5th December 2023
README last updated: 5th December 2023

- Course available [here](https://www.youtube.com/watch?v=u8vMu7viCm8 "Click to view a course on testing javascript with cypress tutorial on YouTube")

---

## Why Cypress?

- Cypress is all-in-one testing framework, assertion library, with mocking and stubbing
- E2E and component testing in more of a real-world environment
  - write tests in workflows that the user will actually go through
- Runs in browser and written in JavaScript
- good performance & integrated into CI/CD easily
- native access to DOM and to your app
  - easy to debug
  - have access to the app in the test runner - no back and forth to figure out what is going on
- great developer UX
  - I agree when comparing it to the hassle of just setting up Jest, RTL, Vite, React, Babel, eslint getting imports to work, eslint, etc, etc
  - just the amount of time eliminating errors in config files and getting the first test to run!
- generally not flaky if using best practices
  - flaky = run tests and all pass
  - run it again with no changes and some fail

---

## Overview and install

- already done this
- clone the repo in the video description
- install deps and Cypress
- `npx cypress open`
- config Cypress - this is as per our simple course
  - E2E, click continue, select Chrome, create the spec but rename it to fundamentals.cy.js, click run spec
- Cypress creates a bunch of folders and files
  - cypress folder
    - e2e folder
      - fundamentals.cy.js file
    - fixtures folder (mocking responses)
    - support folder
      - commands.js (custom commands for Cypress testing)
      - e2e.js
        - global configuration for Cypress
        - loaded before tests
  - cypress.config.js
    - more config

---

## Cypress Fundamentals

## 1 Describe blocks

- `describe` blocks
  - your tests in a test file exist in a describe block
  - two args
    - description of what you are testing
    - callback fn for actual tests in the describe

## 2 It Blocks

- `it` blocks
  - single tests in overall test file
  - API for `it()` is the same as for `describe`
    - descriptive string - title of a test - and a callback containing test code

## 3 Commands & Interacting with Elements

- commands & interacting with elements
  - Cypress has various commands to perform testing
  - use commands on `cy` object
  - `cy.visit('/')` navigates cypress runner to home page
  - `cy.click()`
  - `cy.type()`
  - `cy.check()`
  - dev server must be running for Cypress to work
  - Cypress has async nature
    - Cypress commands don't return their subjects
    - you cannot do the following:

```js
const button = cy.get("button");
button.click();
```

- thus, Cypress does not recommend using variables in your tests
  - Cypress commands yield their subjects - similar to a JavaScript generator function
- generator function rabbit hole/side quest
  - introduced in ES6
  - new approach to handling asynchronous tasks and working with data streams
  - special type of function in JavaScript that allows pausing and resuming its execution during runtime.
  - basic syntax of generator

```js
function* generatorFunction() {
  // Generator function body
  yield value1;
  yield value2;
  // ...
}
```

- an example:

```js
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = simpleGenerator();
console.log(iterator.next()); // Output: { value: 1, done: false }
console.log(iterator.next()); // Output: { value: 2, done: false }
console.log(iterator.next()); // Output: { value: 3, done: false }
console.log(iterator.next()); // Output: { value: undefined, done: true }
```

- more details [here](<https://designtechworld.medium.com/understanding-javascript-generator-functions-ab63c43adf35#:~:text=Using%20Generator%20Functions&text=It%20returns%20an%20object%20with,is%20still%20running%20(%20false%20).> "click to be taken to a Medium article that outlines JavaScript generators and iterators")

- back to Cypress!
- actions that a user can perform in real world exist on the `cy` object
- you can interact with items that you `get` by using `.then()` - very similar to promises
  - Cypress `.then()` is not a promise - can't use async/await
- example of using .then():

```js
cy.get("button").then(($btn) => {
  const cls = $btn.attr("class");
});
```

- `.wrap()`
  - in the above example, `$btn` is a jQuery object
  - if we want Cypress to perform an action on it, we need to use `cy.wrap()` for Cypress to interact
- continued example:

```js
cy.get("button").then(($btn) => {
  const cls = $btn.attr("class");

  cy.wrap($btn).click().should("not.have.class", cls);
});
```

- in english, clicking the button should remove the class from it
- we can see that in order to click the button, we have to use `.wrap()`
- most of the time you DO NOT have to use `.then()` to interact
- sometimes you do need to use it, and so it's useful to know

## 4 Getting Elements
