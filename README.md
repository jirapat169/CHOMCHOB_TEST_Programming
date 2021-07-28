# CHOMCHOB Backend testing

This is Part 1 of [ChomCHOB Backend Testing](https://github.com/ChomCHOB/chomchob-backend-testing)

**This project using**

- NodeJS ( Support Javascript ES6 )
- Sequelize
- Express
- JSON API Format
- MySQL

# Installation

```bash
$ npm install
```

# Initial the database

```bash
$ npx sequelize-cli db:create
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

# Running the app

```bash
# development mode
$ npm run dev
```

---

# API Document

JSON API Format only GET Method

### Get all users
- Method : GET
- URL : localhost:3100/api/user
- Request Body : null
- Respnose :
```json
{
    "data": [
        {
            "type": "users",
            "id": "admin",
            "attributes": {
                "username": "admin",
                "name": "Administrator",
                "email": "admin@crypto.com",
                "role": "admin",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        },
        {
            "type": "users",
            "id": "user1",
            "attributes": {
                "username": "user1",
                "name": "User Person1",
                "email": "user1@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        },
        {
            "type": "users",
            "id": "user2",
            "attributes": {
                "username": "user2",
                "name": "User Person2",
                "email": "user2@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        }
    ]
}
```
---
### Get one user

- Method : GET
- URL : localhost:3100/api/user
- Request Body : null
- Respnose :
```json
{
    "data": [
        {
            "type": "users",
            "id": "user2",
            "attributes": {
                "username": "user2",
                "name": "User Person2",
                "email": "user2@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        }
    ]
}
```
---
### Get all wallets

- Method : GET
- URL : localhost:3100/api/wallet
- Request Body : null
- Respnose :
```json
{
    "data": [
        {
            "type": "users",
            "id": "user1",
            "attributes": {
                "username": "user1",
                "name": "User Person1",
                "email": "user1@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            },
            "relationships": {
                "wallets": {
                    "data": [
                        {
                            "type": "Wallets",
                            "id": "1"
                        },
                        {
                            "type": "Wallets",
                            "id": "2"
                        }
                    ]
                }
            }
        },
        {
            "type": "users",
            "id": "user2",
            "attributes": {
                "username": "user2",
                "name": "User Person2",
                "email": "user2@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            },
            "relationships": {
                "wallets": {
                    "data": [
                        {
                            "type": "Wallets",
                            "id": "3"
                        }
                    ]
                }
            }
        },
        {
            "type": "users",
            "id": "admin",
            "attributes": {
                "username": "admin",
                "name": "Administrator",
                "email": "admin@crypto.com",
                "role": "admin",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            },
            "relationships": {
                "wallets": {
                    "data": []
                }
            }
        }
    ],
    "included": [
        {
            "type": "Wallets",
            "id": "1",
            "attributes": {
                "id": 1,
                "username": "user1",
                "crypto-name": "BTC",
                "amount": 5,
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        },
        {
            "type": "Wallets",
            "id": "2",
            "attributes": {
                "id": 2,
                "username": "user1",
                "crypto-name": "ETH",
                "amount": 10,
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        },
        {
            "type": "Wallets",
            "id": "3",
            "attributes": {
                "id": 3,
                "username": "user2",
                "crypto-name": "ETH",
                "amount": 1000,
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        }
    ]
}
```
---
### Get one wallet

- Method : GET
- URL : localhost:3100/api/wallet/user2
- Request Body : null
- Respnose :
```json
{
    "data": [
        {
            "type": "wallets",
            "id": "3",
            "attributes": {
                "id": 3,
                "username": "user2",
                "crypto-name": "ETH",
                "amount": 1000,
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            },
            "relationships": {
                "user": {
                    "data": {
                        "type": "Users",
                        "id": "user2"
                    }
                }
            }
        }
    ],
    "included": [
        {
            "type": "Users",
            "id": "user2",
            "attributes": {
                "username": "user2",
                "name": "User Person2",
                "email": "user2@crypto.com",
                "role": "user",
                "created-at": "2021-07-28T05:44:03.000Z",
                "updated-at": "2021-07-28T05:44:03.000Z"
            }
        }
    ]
}
```
