## Paya

This project is an open source node module for the [Paya](https://developer.sagepayments.com/apis) REST API.

### Installation

```BASH
npm install -g paya
npm install --save paya
```

### Getting Started

In order to call the Paya API, you will need to be setup with:
* client id
* client secret
* merchant id
* merchant key

```JavaScript
const PayaClient = require('paya');

const client = new PayaClient({
    clientId,
    clientSecret,
    merchantId,
    merchantKey,
});
```

### Methods

#### ach.postCharges(data)

[Paya Documentation](https://developer.sagepayments.com/ach/apis/post/charges)

Used to process a charge / Sale transactions in a single request.

```JavaScript
const response = await client.ach.postCharges({
    secCode: '',
    amounts: {
        total: 0,
    },
    account: {
        type: '',
        routingNumber: '',
        accountNumber: '',
    },
    billing: {
        name: {
            first: '',
            last: '',
        },
        address: '',
        city: '',
        state: '',
        postalCode: '',
    },
}));
```

#### ach.postTokens(data)

[Paya Documentation](https://developer.sagepayments.com/ach/apis/post/tokens)

Used to store an account and retrieve a vault token. A vault token allows you to process a charge or credit without knowing the Routing number and Account number.

```JavaScript
const response = await client.ach.postTokens({
    account: {
        type: '',
        routingNumber: '',
        accountNumber: '',
    });
});
```

#### ach.putToken(tokenId, data)

[Paya Documentation](https://developer.sagepayments.com/ach/apis/put/tokens/%7Breference%7D)

Used to update the account data associated with a vault token.

```JavaScript
const response = await client.ach.putToken(tokenId, {
    account: {
        type: '',
        routingNumber: '',
        accountNumber: '',
    });
});
```

#### ach.deleteToken(tokenId    )

[Paya Documentation](https://developer.sagepayments.com/ach/apis/delete/tokens/%7Breference%7D)

Used to delete a vault token.

```JavaScript
const response = await client.ach.deleteToken(tokenId);
```

### Upcoming Additions

* ach.getCharges()

### Contribution Guidelines

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage node versions. This project was created using 12.13.0.

Fork the respository and install all the dependencies:

```BASH
npm install
```

Run the npm setup script in the project root directory:

```BASH
npm run setup
```

Make sure to run the unit tests and linting before committing. Obviously, add to the tests as you make changes:

```BASH
npm run test
```

For watch:

```BASH
npm run test:watch
```

You can also run the scenario tests against the live API:

```BASH
npm run test-scenario
```
