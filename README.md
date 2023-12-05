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
- config Cypress
