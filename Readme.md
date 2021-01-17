<br />
<p align="center">  
  <h1 align="center">GRAPHQL SERVER</h1>
  <p align="center">
    A simple graphql server developed with NodeJs. 
    <br />
    <br />
    <br />
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#example-queries">Example Queries</a></li>

  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

A simple GraphQL server created with NodeJs. We make use of hardcoded data as well as a fake REST API using npm's json-server.

### Built With

- Node.js
  - Express

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running, follow these steps;

### Prerequisites

- Node.js
- Node package manager (NPM)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Luwafemi/graphqlServer.git
   ```
2. Install NPM packages
   ```sh
   npm install
   ```

<!-- USAGE EXAMPLES -->

## Usage

- In the terminal, run
  ```sh
  npm run dev:server
  ```
- In a new terminal, run
  ```sh
  npm run json:server
  ```
- Voilà! The GraphQL server should be live on port 4000 and REST API on port 3000.

- Go to `localhost:4000/graphql` to get access to `graphiql` (A built-in GraphQL client). Here, we can make GraphQL queries
  <br>
  <br>

### EXAMPLE QUERIES

1.  Query with argument (To get the name, email and age of customer with id of 3)
    ```js
    {
    Customer(id:"3") {
    name
    email
    age
    }
    }
    ```
2.  Query to get names and emails of all customers

```js
  {
  Customers {
  name
  email
  }
  }
```

3. Combination of (1) and (2)

```js
  {
  Customers {
  name
  email
  age
  }
  Customer(id:"3") {
  name
  email
  age
  }
}
```

4. Add Customer

```js
  mutation {
    addCustomer(name:"Amandla Sternberg",email:"amandla@gmail.com",age:19) {
      name
          }
           }
```

5. Edit Customer

```js
  mutation {
    editCustomer(id:"1", age:30) {
      name
      age
          }
           }
```

6. Delete Customer

```js
 mutation {
    deleteCustomer(id:"1")
           }
```
