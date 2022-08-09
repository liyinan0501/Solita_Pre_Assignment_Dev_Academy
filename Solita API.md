# User

### <u>Request</u>

| Method | URL                             |
| ------ | ------------------------------- |
| GET    | http://127.0.0.1:3007/api/login |

### <u>Params</u>

#### Query:

| Name     | Required | Description                     |
| -------- | -------- | ------------------------------- |
| username | ture     | for testing username: solita123 |
| password | ture     | for testing passowrd: 123456    |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | username or password incorrect |
| 500    | server or database error       |

### <u>Response Schema:</u>

| Name          | Type   | Description      |
| ------------- | ------ | ---------------- |
| data          | object |                  |
| ----- message | string |                  |
| ----- token   | string | 'Bearer + token' |

# Journey

## Retrieve journeys

### <u>Request</u>

| Method | URL                                |
| ------ | ---------------------------------- |
| GET    | http://127.0.0.1:3007/solita/trips |

### <u>Params</u>

#### Header:

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | true     | token       |

#### Query:

| Name               | Required | Description        |
| ------------------ | -------- | ------------------ |
| pageNumber         | false    | default value: 1   |
| pageSize           | false    | default value: 100 |
| departureStationId | false    |                    |
| departureDate      | false    |                    |
| returnDate         | false    |                    |

### <u>Response</u>

| Status | Description                         |
| ------ | ----------------------------------- |
| 200    | ok                                  |
| 204    | request succeeds, no content found. |
| 401    | unvalid token or token missing.     |
| 500    | server or database error.           |

### <u>Response Schema:</u>

| Name                         | Type    | Description           |
| ---------------------------- | ------- | --------------------- |
| **data**                     | object  |                       |
| ----- totalCount             | integer | amount of the records |
| ----- pageNumber             | integer |                       |
| ----- pageSize               | integer | default value:100     |
| **----- list**               | array   |                       |
| ----- id                     | integer |                       |
| ----- departure              | string  |                       |
| ----- return                 | string  |                       |
| ----- departure_station_id   | string  |                       |
| ----- departure_station_name | string  |                       |
| ----- return_station_id      | integer |                       |
| ----- return_station_name    | string  |                       |
| ----- covered_distance       | integer |                       |
| ----- duration               | integer |                       |

## Adding journey

### <u>Request</u>

| Method | URL                                  |
| ------ | ------------------------------------ |
| POST   | http://127.0.0.1:3007/solita/addTrip |

# Station

## Retreive stations

### <u>Request</u>

| Method | URL                                   |
| ------ | ------------------------------------- |
| GET    | http://127.0.0.1:3007/solita/stations |

### <u>Params</u>

#### Header:

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | true     | token       |

#### Query:

| Name       | Required | Description        |
| ---------- | -------- | ------------------ |
| pageNumber | false    | default value: 1   |
| pageSize   | false    | default value: 100 |
| stationId  | false    |                    |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 500    | server or database error       |

### <u>Response Schema:</u>

| Name             | Type    | Description       |
| ---------------- | ------- | ----------------- |
| **data**         | object  |                   |
| ----- totalCount | integer | amount of records |
| ----- pageNumber | integer |                   |
| ----- pageSize   | integer | default value:100 |
| **----- list**   | array   |                   |
| ----- fid        | integer |                   |
| ----- id         | integer |                   |
| ----- nimi       | string  |                   |
| ----- namn       | string  |                   |
| ----- name       | string  |                   |
| ----- osoite     | string  |                   |
| ----- adress     | string  |                   |
| ----- kaupunki   | string  |                   |
| ----- std        | string  |                   |
| ----- operaattor | string  |                   |
| ----- kapasiteet | integer |                   |
| ----- x          | double  |                   |
| ----- y          | double  |                   |



## Retreive station list

### <u>Request</u>

| Method | URL                                      |
| ------ | ---------------------------------------- |
| GET    | http://127.0.0.1:3007/solita/stationlist |

### <u>Params</u>

#### Header:

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | true     | token       |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 500    | server or database error       |

### <u>Response Schema:</u>

| Name       | Type    | Description |
| ---------- | ------- | ----------- |
| **data**   | object  |             |
| ----- id   | integer |             |
| ----- nimi | string  |             |



## Retreive a single station

### <u>Request</u>

| Method | URL                                            |
| ------ | ---------------------------------------------- |
| GET    | http://127.0.0.1:3007/solita/singlestation/:id |

### <u>Params</u>

#### Header:

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | true     | token       |

#### Query:

| Name      | Required | Description |
| --------- | -------- | ----------- |
| stationId | true     |             |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 500    | server or database error       |

### <u>Response Schema:</u>

| Name                               | Type    | Description                                                  |
| ---------------------------------- | ------- | ------------------------------------------------------------ |
| **data**                           | object  |                                                              |
| ----- fid                          | integer |                                                              |
| ----- id                           | integer |                                                              |
| ----- nimi                         | string  |                                                              |
| ----- namn                         | string  |                                                              |
| ----- name                         | string  |                                                              |
| ----- osoite                       | string  |                                                              |
| ----- adress                       | string  |                                                              |
| ----- kaupunki                     | string  |                                                              |
| ----- std                          | string  |                                                              |
| ----- operaattor                   | string  |                                                              |
| ----- kapasiteet                   | integer |                                                              |
| ----- x                            | double  |                                                              |
| ----- y                            | double  |                                                              |
| ----- startCount                   | integer | Total number of journeys starting from queried stationId     |
| ----- endCount                     | integer | Total number of journeys ending at queried stationId         |
| ----- startAvg                     | string  | The average distance of a journey starting from queried stationId |
| ----- endAvg                       | string  | The average distance of a journey ending at queried stationId |
| ----- topReturn                    | array   | Top 5 most popular return stations starting from queried stationId |
| ----- ----- return_station_name    | string  |                                                              |
| ----- ----- times                  | integer |                                                              |
| ----- topDeparture                 | array   | Top 5 most popular departure stations ending at queried stationId |
| ----- ----- departure_station_name | string  |                                                              |
| ----- ----- times                  | integer |                                                              |

