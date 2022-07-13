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

| Status | Description              |
| ------ | ------------------------ |
| 200    | ok                       |
| 507    | server or database error |

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

| Name | Required | Description      |
| ---- | -------- | ---------------- |
| page | false    | default value: 1 |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 507    | server or database error       |

### <u>Response Schema:</u>

| Name                         | Type    | Description       |
| ---------------------------- | ------- | ----------------- |
| **data**                     | object  |                   |
| ----- totalCount             | integer |                   |
| ----- pageNumber             | integer |                   |
| ----- pageSize               | integer | default value:100 |
| **----- list**               | array   |                   |
| ----- id                     | integer |                   |
| ----- departure              | string  |                   |
| ----- return                 | string  |                   |
| ----- departure_station_id   | string  |                   |
| ----- departure_station_name | string  |                   |
| ----- return_station_id      | integer |                   |
| ----- return_station_name    | string  |                   |
| ----- covered_distance       | integer |                   |
| ----- duration               | integer |                   |

# Station

## Retreive stations

### <u>Request</u>

| Method | URL                                    |
| ------ | -------------------------------------- |
| GET    | http://127.0.0.1:3007/solita/stationss |

### <u>Params</u>

#### Header:

| Name          | Required | Description |
| ------------- | -------- | ----------- |
| Authorization | true     | token       |

#### Query:

| Name | Required | Description      |
| ---- | -------- | ---------------- |
| page | false    | default value: 1 |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 507    | server or database error       |

### <u>Response Schema:</u>

| Name             | Type    | Description       |
| ---------------- | ------- | ----------------- |
| **data**         | object  |                   |
| ----- totalCount | integer |                   |
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

| Name | Required | Description |
| ---- | -------- | ----------- |
| id   | true     |             |

### <u>Response</u>

| Status | Description                    |
| ------ | ------------------------------ |
| 200    | ok                             |
| 401    | unvalid token or token missing |
| 507    | server or database error       |

### <u>Response Schema:</u>

| Name             | Type    | Description |
| ---------------- | ------- | ----------- |
| **data**         | object  |             |
| ----- fid        | integer |             |
| ----- id         | integer |             |
| ----- nimi       | string  |             |
| ----- namn       | string  |             |
| ----- name       | string  |             |
| ----- osoite     | string  |             |
| ----- adress     | string  |             |
| ----- kaupunki   | string  |             |
| ----- std        | string  |             |
| ----- operaattor | string  |             |
| ----- kapasiteet | integer |             |
| ----- x          | double  |             |
| ----- y          | double  |             |

# 
