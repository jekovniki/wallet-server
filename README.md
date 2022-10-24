<h1 align="center">
  Wallet server
</h1>

<p align="center">
  A simple wallet web server with identity management.
</p>

# How to use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/jekovniki/wallet-server.git

# Go into the repository
$ cd wallet-server

# Environment variables
create .env file from .env.default

# Run the docker-compose command
$ docker-composer up

# Run the wallet-server
$ npm install
$ npm build
$ npm run start
```

The server is now  working on port 3131;

# Information for API

There is a default user:
<strong>username:</strong> user
<strong>password:</strong> Aa123456!
Default role is BASIC (can only logout and check balance);

On login you will receive sessionId. Put it as Bearer token in postman when you execute the private methods.

# Public
<h3>/health-check</h3>
<strong>type: GET</strong>

<h3>/auth/login</h3>
<strong>type: POST</strong>
REQUEST

```json
{
    "username": string,
    "password": string
}
```

# Private
This requires the sessionId as Bearer token
<h3>/auth/logout</h3>
<strong>type: GET</strong>

<h3>/users/balance</h3>
<strong>type: GET</strong>

<h3>/wallet/list</h3>
<strong>type: POST</strong>
REQUEST:

```json
{
    "userId": number, // optional
    "list": number // optional
}
```

<h3>/wallet/deposit</h3>
<strong>type: POST</strong>
REQUEST:

```json
{
    "amount": number
}
```

<h3>/wallet/withdraw</h3>
<strong>type: POST</strong>
REQUEST:

```json
{
    "amount": number
}
```