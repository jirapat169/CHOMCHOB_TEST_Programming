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

|  Description   | Method | URL                             | Body | Respnose                                                                          |
| :------------: | :----: | :------------------------------ | :--: | :-------------------------------------------------------------------------------- |
|  Get all user  |  GET   | localhost:3100/api/user         | null | ![img](/documentation/GetAllUser.PNG)                                             |
|  Get one user  |  GET   | localhost:3100/api/user/user1   | null | ![img](/documentation/GetOneUser.PNG)                                             |
| Get all wallet |  GET   | localhost:3100/api/wallet       | null | ![img](/documentation/GetAllWallet1.PNG) ![img](/documentation/GetAllWallet2.PNG) |
| Get one wallet |  GET   | localhost:3100/api/wallet/user2 | null | ![img](/documentation/GetOneWallet.PNG)                                           |
