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
      - commands.js (write your own custom commands for Cypress testing)
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

- often want to get element from DOM and make assertion, eg h1 contains text
- `cy.get()` and pass in a CSS query selector is how you get elements

## 5 Command Chaining and Assertions

- after you get element, want to do something like make assertion
- do this by chaining assertion after getting element `get(h1).contains('text)`
- Chai and Sinon are bundled and so you have access to assertions provided by Chai and Sinon + jQuery
- can add new assertions
- cool example, getting a list item with a class

```js
cy.get("li.selected").should("have.length", 3);
```

- this is cool because we can just use `li.selected` where selected is the class, very intuitive

## 6 Focusing on a single test

- now we write our first test
- On the Fundamentals page, there should be an element with text of 'Testing Fundamentals'
- my initial idea:

```js
cy.get("h1.fundamentals_header__yRsdA").should("exist");
```

- cypress doesn't recommend using classes, since these can a lot
  - can be brittle/flaky
- best to use specific selectors, data-test (not data-testid!)
  - tests shouldn't fail because a class changes
  - they should fail due to unexpected behavior or missing elements
- we add a data-test attribute
- app>fundamentals>page.jsx

```js
<main className={styles.main}>
  <h1 data-test="fundamentals-header" className={styles.header}>
    Testing Fundamentals
  </h1>
  <ItemsAccordion items={items} />
</main>
```

- the passing test

```js
cy.get('[data-test="fundamentals-header"]').contains(/testing fundamentals/i);
```

- another (more brittle?) way

```js
cy.get('[data-test="fundamentals-header"]').should(
  "contain.text",
  "Testing Fundamentals"
);
```

- we can shorten our `cy.visit` by configuring a base url

```js
cy.visit("http://localhost:3000/fundamentals");
```

- in our cypress.config.js

```js
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

- new `cy.visit`

```js
cy.visit("/fundamentals");
```

- Cypress recommends not writing small tests like we have here, checking a h1 is rendered with text
  - Cypress does cleanup and set up for each test, and so it is less performant to write a bunch of little tests like this
- next test, we can test the "Fundamental 1" block, where text becomes visible when we click on it
- get the element, assert text is not visible (it is always in the DOM), then click to open the block, and then assert that text is visible
  - we can also click again and assert it is no longer visible
- for all these accordion elements that expand when you click, they all have the same class
  - we'll add a data-test to test them
- aside - alt clicking on a component takes you to the file for that component - why did nobody tell me??!
- looking at our page.jsx for Fundamentals, we see it renders ItemsAccordion
  - ItemsAccordion renders materialUI Accordion and we can't 'get to' the html, so we place our data-test on the Accordion
- our data-test needs to be dynamic, since we are rendering a bunch of Accordion components

```js
<Accordion data-test={`accordion-item-${item.id}`} key={item.id}>
```

- in Cypress, we can inspect and see that the first accordion item has a data-test of `accordion-item-1` so we use that to perform our test
- we create a new it block
  - remember, we should write longer tests so this is just while we are learning

```js
it("the accordion works correctly", () => {
  cy.visit("/fundamentals");
  cy.get('[data-test="accordion-item-1"]').click().pause();
});
```

- after we click, we can chain pause to inspect in the test runner
- now, take some text from our expanded accordion item `Your tests will exist in a describe block.`
- we can check for this NOT being visible prior to our click, remembmer clicking is what makes it visible

```js
cy.contains(/Your tests will exist in a describe block./i).should(
  "not.be.visible"
);
```

- prior to clicking, we shouldn't see this text - passes
- after we click, we can assert the text is visible

```js
it("the accordion works correctly", () => {
  cy.visit("/fundamentals");
  cy.contains(/Your tests will exist in a describe block./i).should(
    "not.be.visible"
  );
  cy.get('[data-test="accordion-item-1"]').click();
  cy.contains(/Your tests will exist in a describe block./i).should(
    "be.visible"
  );
});
```

- if we add another click, and then assert that the text is not visible, this actually fails
  - this is because we are clicking on the body - in test runner you can see the data-test attribute is not on the clickable element
- to close the accordion item, we need to click on the div with role of button nested inside accordion-item-1
- use this to close the accordion item

```js
cy.get('[data-test="accordion-item-1"] div[role="button"]').click();
```

- interestingly, if you attempt to open the accordion item with the above, it fails, you must use:

```js
cy.get('[data-test="accordion-item-1"]').click();
```

- however, the tests pass for the dude doing the tutorial using role=button for both clicks

## 6 Focusing on a single test (continued)

- can you it.only()

## 7 Fundamental 7 - beforeEach

- setting things up for your tests
  - navigate to a page
  - mocking data etc
  - Cypress recommends using beforeEach rather than afterAll or afterEach
- for our tests so far, we're repeating `cy.visit`
- we can instead do this in our describe and before the `it` blocks

```js
beforeEach(() => {
  cy.visit("/fundamentals");
});
```

- note our tests actually failed on the second click (to close the accordion item), it appears these tests are a little flaky
  - fixed by adding `div[role="button]` to both `.click()` and now passing again...

## Fundamental 8 - Custom Commands

- not limited to `cy.x` commands
- can create custom commands
- add custom commands to `cypress/support/commands.ts`
  - eg, might add a `getData` command that gets element by `data-test`
- since we're using `get('data-test')` a lot, it might be good to create a custom command for that
- in our commands.ts/commands.js

```js
Cypress.Commands.add("getDataTest", (dataTestSelector) => {
  return cy.get(`[data-test="${dataTestSelector}"]`);
});
```

- and invocation:

```js
it("renders a h1 with text 'testing fundamentals", () => {
  cy.getDataTest("fundamentals-header").should(
    "contain.text",
    "Testing Fundamentals"
  );
});
```

## Forms

- lots we can do with forms, get, click, enter input, test validation, see if submission was successful

### Get Form

- create `forms.cy.js`
- so far

```js
describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
  });
  it("test subscribe form", () => {
    cy.contains(/testing forms/i);
  });
});
```

- we add a `data-test` for the input

```js
<TextField
  className={styles.input}
  label="Email"
  variant="filled"
  data-test="form-input"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
/>
```

- we get the `form-input`

```js
cy.getDataTest("form-input").should("exist");
```

- note, this gets a `div` wrapper that wraps the actual input component
- therefore we must:

```js
cy.getDataTest("form-input").find("input");
```

- and this works
- let's test 'happy' path, user gets it right

```js
cy.getDataTest("form-input").find("input").type("name@email.com");
```

- use `type` to enter input on the page
- add a `data-test` to the button and get the button + click
- note, I am getting some real flakiness at the moment

```js
Warning: Prop `htmlFor` did not match. Server: ":R1mqqcq:" Client: ":R6rb9j9:"
```

- and Cypress test runner hanging indefinitely
  - stopping the dev server and cypress test runner and restarting didn't fix, nor did restarting VSCode.
  - restarted PC
    - test ran successfully on first run but with same errors in console
    - on second run we get the same or a similar error and it hangs indefinitely
