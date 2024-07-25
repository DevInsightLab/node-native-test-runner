# Node.js Native Test Runner Examples

Welcome to the **Node Native Test Runner** repository! This project contains code samples and unit tests utilizing Node.js's native test runner.

This repository serves as a practical guide for developers looking to leverage Node.js's built-in testing capabilities. Here, you'll find examples that demonstrate efficient testing practices, focusing on simplicity and integration.

## About Node.js Native Test Runner

Node.js version 18 (and later) includes a powerful, built-in test runner that simplifies the testing process.  It offers features like:

- **Test Suites (`describe`)** 
- **Test Cases (`it` or `test`)** 
- **Assertions (`assert`)** 
- **Mocking (`mock`)**
- **Subtests**
- **Reporters** 

...and more! This means you can write robust tests without relying on external testing frameworks.

## Examples

This repository provides code samples that demonstrate:

- **Basic Test Setup:** How to structure your test files and use the core features of `node:test`.
- **Mocking Dependencies:** Techniques for isolating your code and simulating external dependencies using the built-in `mock` module.

## Getting Started

### Prerequisites

- Node.js 20 or later
- [`Yarn`](https://yarnpkg.com/getting-started/install) 

### Installation

1. **Clone the Repository:**
   
    ```sh
    git clone https://github.com/DevInsightLab/node-native-test-runner.git
    ```

2. **Navigate to the project directory**
   
    ```sh
    cd node-native-test-runner
    ```

3. **Install dependencies**
   
    ```sh
    yarn install
    ```

Browse the different examples to see how `node:test` is used in various scenarios.

### Running Tests

- Execute the following command to run the tests:

  ```sh
  yarn test
  ```
- Run tests with coverage

  ```sh
  yarn run test:cov
  ```

## Blog Post

Check out our blog post for a detailed explanation of the examples in this repository. It provides insights and additional context to help you get the most out of these resources.

- [medium.com](https://chetan07.medium.com/level-up-your-node-js-testing-with-native-test-runner-and-mocks-a-bigquery-example-1ac4b5aca0b2)
- [dev.to](https://dev.to/chetanppatil/level-up-your-nodejs-testing-with-native-test-runner-and-mocks-a-bigquery-example-n7a)

## Contributing

Contributions are welcome! If you have an example that demonstrates a specific testing concept or best practice using Node.js's native test runner, feel free to open a pull request.

## Contact

For questions or suggestions, please open an issue or contact us directly.

## Support

💙 If you find this project helpful, please give it a ⭐ and share it with others!
