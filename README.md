# tokyo-catch-backend

## Table of contents
* [General info](#general-info)
* [Setup](#setup)

## General info
This project consists of 2 API. 

## GET users/{userId}/rewards?at={availableAtDate}
* By calling this API, a user with {userId} will be created.
* Then a weekly rewards will be created, for example, if {availableAtDate} is 2021-04-13T12:00:00Z, rewards, will be created from 2021-04-11 to 2021-04-17.
* The weekly rewards data will then be returned as a response.

* If a user is already present, the user will not be created again.
* If the weekly rewards is already found in the existing record, there will not be new rewards created as well.

### Sample Query Params
|Param|Value               |
|-----|--------------------|
|at   |2021-04-17T00:00:00Z|
|userId|1|


### Sample Response

```
{
    "data": [
        {
            "availableAt": "2021-04-11T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-12T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-12T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-13T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-13T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-14T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-14T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-15T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-15T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-16T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-16T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-17T00:00:00.000Z"
        },
        {
            "availableAt": "2021-04-17T00:00:00.000Z",
            "redeemedAt": null,
            "expiresAt": "2021-04-18T00:00:00.000Z"
        }
    ]
}
```

## PATCH users/{userId}/rewards/{availableAtDate}/redeem
* By calling this API, the reward will be redeemed when the reward's records has the same availableAt as the {availableAtDate} in the URI parameters, and when the expired date has not passed.
* It will return an object of the successfully redeemed reward upon successful request.
* This API will throw an error when:
  * the reward is not in the record
  * the expired date has passed
  * the reward has been redeemed.

### Sample URI Params
|Param|Value               |
|-----|--------------------|
|availableAtDate   |2021-04-17T00:00:00Z|
|userId|1|


### Sample Response

```
{
    "data": {
        "availableAt": "2021-04-17T00:00:00.000Z",
        "redeemedAt": "2021-04-17T15:05:28.860Z",
        "expiresAt": "2021-04-18T00:00:00.000Z"
    }
}
```
  
## Setup
To run this project, clone this project locally.\
In the project directory, you can run:

### `npm install`

Install all the required packages.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
