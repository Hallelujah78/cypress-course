# Testing JavaScript with Cypress

Commenced: 5th December 2023
README last updated: 10th December 2023

- Course available [here](https://www.youtube.com/watch?v=u8vMu7viCm8 "Click to view a course on testing javascript with cypress tutorial on YouTube")

- documentation, examples, references, tutorials, real-world app example for Cypress seem extremely good and should be checked out

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
  - flaky = run tests and all pass, then run it again with no changes and some fail

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

## Get Form

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
- this is actually an issue with `type()`
  - stopping the dev server and cypress test runner and restarting didn't fix, nor did restarting VSCode.
  - restarted PC
    - test ran successfully on first run but with same errors in console
    - on second run we get the same or a similar error and it hangs indefinitely
    - took me probably 2 hours of fiddling and searching
- a few things to solve the issue relating to `type()` causing the test runner to hang
  - clear the history/cache of your actual browser
  - in the Cypress app, click `Developer Tools>View App Data` and delete the contents of `cy` folder - i.e. delete the production folder and restart Cypress
    - this is an official troubleshooting recommendation
  - run your `type()` with a preceding click and change the delay between key strokes:

```js
cy.get('[data-test="form-input"]')
  .find("input")
  .click()
  .type("gavan@email.com", { delay: 15 });
```

- this step appears (caution!) to have removed the flakiness completely (I've thought this before over the previous 2 hours):

```js
cy.visit("/forms");
cy.wait(500);
```

- put a wait in before you do anything
- code so far:

```js
describe("form tests", () => {
  it("test subscribe form", () => {
    cy.visit("/forms");
    cy.wait(500);
    cy.contains(/testing forms/i).should("exist");
    cy.contains(/successfully subbed: gavan@email.com!/i).should("not.exist");
    cy.get('[data-test="form-input"]')
      .find("input")
      .click()
      .type("gavan@email.com", { delay: 15 });

    cy.getDataTest("subscribe-button").click();
    cy.contains(/successfully subbed: gavan@email.com!/i).should("exist");
  });
});
```

- and all working perfectly!
- if we want to get the same input multiple times in a specific test file
  - can create an alias for it
- aliases and retryability
- retryability
  - Cypress automatically waits without adding async/awaits
- Explicit Waits
  - in some cases (data fetching), you may want to wait for something
  - best way is to `wait on aliases`
    - I'm thinking this is similar to waiting for a specific element to render which lets you know when the data fetching is finished and the page has rendered?
    - things that can be aliased (elements, intercepts, requests), can also be waited on
- example of giving a request an alias and waiting on the request alias from docs:

```js
describe("User Sign-up and Login", () => {
  beforeEach(() => {
    cy.request("POST", "/users").as("signup"); // creating the signup alias
  });

  it("should allow a visitor to sign-up, login, and logout", () => {
    cy.visit("/");
    // ...

    cy.wait("@signup"); // waiting upon the signup alias

    // ...
  });
});
```

- now we use `as()` to give our input an alias

```js
cy.get('[data-test="form-input"]').find("input").as("subscribe-input");
```

- and later we use the alias to `get` it

```js
cy.get("@subscribe-input").type("gavan@email.com", { delay: 15 });
```

- the unhappy path code:

```js
//unhappy path 1 - invalid email
cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");
cy.get("@subscribe-input").type("gavan@email.io", { delay: 15 });
cy.getDataTest("subscribe-button").click();
cy.contains(/invalid email: gavan@email.io!/i).should("exist");
cy.wait(3000);
cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");
```

- again, we are asserting error message doesn't exist, we input badly formed email address, click button, error message exists, wait 3 seconds, error message doesn't exist
  - all working great!
- we also test nothing entered into the input
- full code for our form tests:

```js
describe("form tests", () => {
  beforeEach(() => {
    cy.visit("/forms");
    cy.contains(/testing forms/i).should("exist");
    cy.get('[data-test="form-input"]').find("input").as("subscribe-input");
  });
  it("test subscribe form", () => {
    cy.wait(500);
    // happy path

    cy.contains(/successfully subbed: gavan@email.com!/i).should("not.exist");
    cy.get("@subscribe-input").type("gavan@email.com", { delay: 15 });
    cy.getDataTest("subscribe-button").click();
    cy.contains(/successfully subbed: gavan@email.com!/i).should("exist");
    cy.wait(3000);
    cy.contains(/successfully subbed: gavan@email.com!/i).should("not.exist");

    //unhappy path 1 - invalid email
    cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");
    cy.get("@subscribe-input").type("gavan@email.io", { delay: 15 });
    cy.getDataTest("subscribe-button").click();
    cy.contains(/invalid email: gavan@email.io!/i).should("exist");
    cy.wait(3000);
    cy.contains(/invalid email: gavan@email.io!/i).should("not.exist");

    // unhappy path 2 - nothing typed into input
    cy.contains(/fail!/i).should("not.exist");
    cy.getDataTest("subscribe-button").click();
    cy.contains(/fail!/i).should("exist");
    cy.contains(/fail!/i).should("not.exist");
  });
});
```

## Examples

- multi-page testing
- intercepts
- helpful methods
- grudge list (cf. to do list!)

## Examples 1 - Multi-Page Testing

- you can write tests across pages to better test user workflow
- you can click on navigation buttons/links or use cy.visit()
- you can use `cy.location('pathname).should('equal', '/some-path')` to assert correct location

- we have a navbar in our app
- we need to add `data-test` attributes to these so that we can get and click them

```js
const navItems = [
    {
    label: 'Why Cypress?',
    path: '/',
    dataTest: 'nav-why-cypress'
    },
    {
    label: 'Overview',
    path: '/overview',
    dataTest: 'nav-overview',
    },
    {
    label: 'Fundamentals',
    path: '/fundamentals',
    dataTest: 'nav-fundamentals',
    }
    ...]
```

- pass dataTest to NavItem (we want to add `data-test` to the Link):

```js
export default function NavBar() {
  return (
    <ul className="nav-bar">
      {navItems.map((item) => (
        <NavItem
          dataTest={item.dataTest}
          key={item.label}
          label={item.label}
          path={item.path}
        />
      ))}
    </ul>
  );
}
```

- add `data-test` to Link in NavItem:

```js
export default function NavItem({ label, path, dataTest }) {
  return (
    <Link data-test={dataTest} href={path}>
      {label}
    </Link>
  );
}
```

- now we can do this:

```js
cy.getDataTest("nav-why-cypress").click();
cy.location("pathname").should("equal", "/");
```

- can repeat for all of our routes and this, as the tutorial says, is multi-page testing (is that it?)

## Example 2 - Intercepts

- intercepts are one way to work with network requests in Cypress
- you intercept a network request and return mocked/dummy/fake data for testing purposes
- on the Examples page in our test app, there's a Post Data button
- the button is a PostButton component
- the click handler makes a POST request to localhost:3000/examples
- we can intercept it and return something for our tests:

```js
cy.intercept("POST", "http://localhost:3000/examples", {
  body: { message: "successfully intercepted request" },
});
```

- if we want to return data instead of a simple message, we use a fixture
- you can alias an intercept:

```js
cy.intercept("POST", "/users").as("signup");
// and then wait
cy.wait("@signup");
```

- this means we can hold off executing the rest of a test until the intercept completes
- fixture example:

```js
cy.intercept("GET", "/transactions/public*", {
  fixture: "public-transactions.json",
}).as("mockedPublicTransactions");
```

- the fixture appears to be a json file, which is pretty cool in terms of what you can do with this!
- you can also adjust the headers of the response
- modify response data
- inspecting a request, from the docs

```js
cy.intercept("POST", apiGraphQL, (req) => {
  const { body } = req;

  if (
    body.hasOwnProperty("operationName") &&
    body.operationName === "CreateBankAccount"
  ) {
    req.alias = "gqlCreateBankAccountMutation";
  }
});
```

- Cypress adds a fixtures folder for us
- in fixtures, we can place mocked data files, e.g. json files
  - Cypress adds an example.json file with mock data in it
- we can return this example.json from our intercept:

```js
cy.intercept("POST", "http://localhost:3000/examples", {
  fixture: "example.json",
});
```

- no import needed, Cypress just looks in fixture folder I guess!

## Examples 3 - Helpful Methods

- Cypress [docs](https://learn.cypress.io/advanced-cypress-concepts/important-cypress-methods-you-need-to-know "navigates to 'cypress methods you need to know' page on learn.cypress.io")

- `.its()`
  - used to get a property off of something
  - example, make assertion against array:

```js
cy.wrap(["Wai Yan", "Yu"]).its(1).should("eq", "Yu"); // true
```

- get object property:

```js
cy.wrap({ age: 52 }).its("age").should("eq", 52); // true
```

- get `results` from `@publicTransactions` alias:

```js
it("first five items belong to contacts in public feed", () => {
  // ...

  cy.wait("@publicTransactions")
    .its("response.body.results")
    .invoke("slice", 0, 5);
});
```

- note how we use `.invoke()` to call `slice()` on `response.body.results`

- `.invoke()`

  - invoke func on previously yielded subject

- `.request()`
  - make a http request

```js
cy.request("POST", "http://localhost:8888/users/admin", { name: "Jane" }).then(
  (response) => {
    // response.body is automatically serialized into JSON
    expect(response.body).to.have.property("name", "Jane"); // true
  }
);
```

- `.within()`
  - scopes subsequent Cypress commands to within an element

```js
it("ensures the section lesson exists", () => {
  cy.getBySel("section-steps").within(() => {
    cy.getBySel("lesson-complete-0").should("exist");
  });
});
```

- `getBySel` is getting by data-test selector (similar to our `getDataTest`)

## Example 4 - Grudge List

- we can add a grudge
- we can remove a grudge
- we can clear all grudges
- here we write tests for our grudge list
- i had a go at writing the tests on my own
  - I was placing a data-test on a container and then using `.find()`
  - a better approach that the tutor uses using `.within()`

```js
// list is empty when there are no grudges
cy.getDataTest("grudge-list").within(() => {
  cy.get("li").should("have.length", 0);
});
```

- complete grudge list tests
  - we test as much of the logic as possible (by as much as possible, I mean all of it):

```js
it.only("grudge list test", () => {
  const grudgeOne = "a grudge";
  const grudgeTwo = "second one";

  cy.wait(500);
  cy.getDataTest("grudge-list-container").as("grudgeContainer");
  cy.getDataTest("add-grudge").as("addGrudgeButton");
  cy.getDataTest("clear-grudges").should("not.exist");
  cy.getDataTest("grudge-list-title").as("grudgeListTitle");

  // check title of grudge container when there are no grudges
  cy.contains(/add some grudges/i).should("exist");
  cy.get("@grudgeListTitle").should("not.have.text", "Grudges");

  // list is empty when there are no grudges
  cy.getDataTest("grudge-list").within(() => {
    cy.get("li").should("have.length", 0);
  });

  // enter a grudge
  cy.get("@grudgeContainer").find("input").type(grudgeOne);
  cy.get("@addGrudgeButton").click();
  cy.getDataTest("grudge-list").within(() => {
    cy.get("li").should("have.length", 1);
  });
  cy.contains(/add some grudges/i).should("not.exist");
  cy.get("@grudgeListTitle").should("have.text", "Grudges");

  // enter another grudge
  cy.get("@grudgeContainer").find("input").type(grudgeTwo);
  cy.get("@addGrudgeButton").click();
  cy.getDataTest("grudge-list").within(() => {
    cy.get("li").should("have.length", 2);
    cy.get("li").its(1).should("contains.text", "second one");
  });

  // delete a grudge
  cy.get("@grudgeContainer").find("li").its(0).find("button").click();
  cy.getDataTest("grudge-list").within(() => {
    cy.get("li").should("have.length", 1);
  });

  // clear all grudges
  cy.getDataTest("clear-grudges").click();
  cy.getDataTest("grudge-list").within(() => {
    cy.get("li").should("have.length", 0);
  });
});
```

## Component Testing

- restart Cypress and choose component testing
- select the framework (react, next, angular etc)
- click continue
- start testing in chrome
- click 'Create New Spec'
- we'll test the Accordion component
  - rename the new spec to Accordion.cy.jsx
  - run the spec
- back in VSCode, we have the Cypress folder and in there we have a `component` folder
- in there is our `Accordion.cy.jsx` file that we open up
  - in Cypress, component tests very similar to E2E tests
- our file contains:

```js
describe("Accordion.cy.jsx", () => {
  it("playground", () => {
    // cy.mount()
  });
});
```

## Component Testing 1 - Overview

- can test individual components of app with component tests

## Component Testing 2 - Component vs E2E

- component testing and E2E testing use the same Cypress test runner, commands and API
- main difference is Cypress builds components using dev server instead of rendering within complete website
  - faster tests
  - fewer dependencies on infrastructure than E2E tests covering same code paths
- an example of where you might prefer a component test over a E2E test is new account creation

## Component Testing 3 - Additional Configuration

- you may need to add additional configuration to support component tests
  in Next.js you need to add something like:

```js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
```

- in our case, Cypress has added this into our `cypress.config.js` for us

## Component Testing 4 - Example

- you can mount a component using `cy.mount()
- then interact & make assertions as you would in E2E testing
- let's test Accordion
- since the ItemsAccordion expects an items prop we have to pass something in:

```js
import { default as ItemsAccordion } from "@/app/components/Accordion";
// expects items {id, summary, details}

const items = [
  {
    summary: "Reason 1",
    details:
      "An all-in-one testing framework, assertion library, with mocking and stubbing",
    id: "1",
  },
  {
    summary: "Reason 2",
    details: "Focus on E2E and Component Testing -- real world testing",
    id: "2",
  },
  {
    summary: "Reason 3",
    details: "Runs in the browser and wrote in JavaScript",
    id: "3",
  },
];

describe("Accordion.cy.jsx", () => {
  it("playground", () => {
    cy.mount(<ItemsAccordion items={items} />);
  });
});
```

- we just copy and paste the `reasonsCypressIsGreat` array from app>page.jsx
- our ItemsAccordion successfully renders
- now we can test
- we want to assert we have 3 items
  - give the div wrapping our Accordion items a `data-test` of `accordion-wrapper`
- get the wrapper and get the items inside

```js
cy.getDataTest("accordion-wrapper").within(() => {
  cy.get('[data-test^="accordion-item"]').should("have.length", 3);
});
```

- note, `data-test^=`, `^=` means `that starts with`, which is handy
- next test
  - get the first accordion item
  - assert the text is not visible
  - click it
  - assert its text is visible
  - close it by clicking and assert the text is no longer visible
- our completed component test code:

```js
import { default as ItemsAccordion } from "@/app/components/Accordion";
// expects items {id, summary, details}

const items = [
  {
    summary: "Reason 1",
    details:
      "An all-in-one testing framework, assertion library, with mocking and stubbing",
    id: "1",
  },
  {
    summary: "Reason 2",
    details: "Focus on E2E and Component Testing -- real world testing",
    id: "2",
  },
  {
    summary: "Reason 3",
    details: "Runs in the browser and wrote in JavaScript",
    id: "3",
  },
];

describe("Accordion.cy.jsx", () => {
  it("items accordion", () => {
    cy.mount(<ItemsAccordion items={items} />);
    cy.getDataTest("accordion-wrapper").within(() => {
      cy.get('[data-test^="accordion-item"]').should("have.length", 3);
    });

    //
    cy.contains("An all-in-one testing framework,").should("not.be.visible");

    cy.getDataTest("accordion-item-1").within(() => {
      cy.get('[role="button"]').click();
    });

    cy.contains("An all-in-one testing framework,").should("be.visible");
    cy.getDataTest("accordion-item-1").within(() => {
      cy.get('[role="button"]').click();
    });
    cy.contains("An all-in-one testing framework,").should("not.be.visible");
  });
});
```

- note that `cy.get('[role="button"]')` is the syntax for getting elements by attribute
  - the attribute here is `role`
  - the attribute value is `button`

## Best Practices Recommended by Cypress

## Best Practice 1 - Test Unhappy Paths

- test with the idea that the user might be malicious or just trying to do stuff in an uncommon way, inputting incorrect data etc

## Best Practice 2 - Use Stable Selectors

- Use `data-` attributes to provide context to selectors to isolate them from CSS or JS changes that may occur.
- don't use CSS attributes like id, class, tag
- don't target elements that may change textContent
- be specific with selectors
  - `cy.get('button')` is bad
- don't couple to styles

## Best Practice 3 - Don't Assign Return Values

- Cypress is asynchronous

## Best Practice 4 - Don't Test External Sites

- only test stuff you control
- avoid visiting or requiring 3rd party server
- you might use `cy.request()` to talk to 3rd party servers via APIs
  - if possible, cache results via `cy.session()` to avoid repeated fetches

## Best Practice 5 - Keep Tests Independent

- A given test should not rely on the results of other tests

## Best Practice 6 - Don't Worry About Writing Tiny Tests

- these are non-performant and excessive (unit tests)
- Cypress resets states between tests and it's resource intensive
  - small tests hurt performance
  - you'll know what assertions are failing in longer E2E tests

## Best Practice 7 - Clean Up State Before Tests Run

- don't use `after` or `afterEach` to clean up state after the test runs
- you want to be able to look at the finished state in the test runner to decide what to test next etc
- if something fails, the after/afterEach won't run

## Best Practice 8 - Avoid Using Arbitrary `cy.wait()`

- instead, use route aliases or assertions to guard Cypress from proceeding until an explicit condition is met
