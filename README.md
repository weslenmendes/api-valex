<p align="center">
  <a href="https://github.com/weslenmendes/api-valex">
    <img src="https://www.svgrepo.com/show/234261/credit-card.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    API Valex
  </h3>
</p>

## About

<p>
  This application consists of an api to simulate a benefit card management system, designed to help companies.
</p>

## Usage

```bash
$ git clone https://github.com/weslenmendes/api-valex.git

$ cd api-valex

$ npm install

$ npm run dev
```

## API:

```
- POST /cards
    - Route to create a new card (authenticated)
    - headers: {
        "x-api-key": "valid api key"
      }
    - body: {
        "employeeId": number,
        "type": 'groceries' | 'restaurant' | 'transport' | 'education' | 'health'
      }

- PUT /cards/activate/:cardId
    - Route to activate a card
    - headers: {}
    - body: {
        "CVC": string,
        "password": string(4-digit),
      }

- GET /cards/statements/:cardId
    - Route to get card statements
    - headers: {}
    - body: {}

- PUT /cards/block/:cardId
    - Route to block a card
    - headers: {}
    - body: {
      "password": string(4-digit),
    }

- PUT /cards/unlock/:cardId
    - Route to unlock a card
    - headers: {}
    - body: {
      "password": string(4-digit),
    }

- POST /recharges/:cardId
    - Route to recharge a card (authenticated)
    - headers: {
        "x-api-key": "valid api key"
      }
    - body: {
        "amount": number
      }

- POST /purchases
    - Route to make purchases
    - headers: {}
    - body: {
        "cardId": number,
        "businessId": number,
        "amount": number,
        "password": string(4-digit)
      }

- POST /purchases/online
    - Route to make online purchases
    - headers: {}
    - body: {
        "number": string,
        "holderName": string,
        "expirationDate": string("MM/YY"),
        "CVC": string(3-digit),
        "businessId": number,
        "amount": number
      }
```
