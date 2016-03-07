***API Gateway*** serves all the content in JARVIS services.

Services:
------------

### Weather ###

Get weather of a specific [latitude,longitude].
* GET : /weather

Parameters
 * (mandatory) lat : latitude [type = number]
 * (mandatory) lon : longitude [type = number]
 * (optional) forecast : forecast [type = number]

Request

```bash
curl 'http://apigateway-jarviscloud.herokuapp.com/weather?lat=40.415363&lon=-3.707398&forecast=1'
```

Response

```json
{
  "result":{
    "latitude":40.418308,
    "longitude":-3.70275,
    "city":"City Center",
    "country":"ES",
    "forecast":[{
      "datetime":"2016-03-07",
      "weather":{
        "main":"Snow",
        "description":"light snow",
        "cloud":24
        },
      "temp":{
        "day":288.56,
        "max":288.56,
        "min":279.66,
        "night":279.66,
        "evening":285.79,
        "morning":282.25
        },
      "pressure":946.95,
      "humidity":94,
      "wind":{
        "speed":3.61,
        "direction":323
      }
    }]
  }
}
```

### Currency (working on it) ###

Get currency rate.
* GET : /currency

Parameters
 * (mandatory) from : from currency [type = string]
 * (mandatory) to : to currency [type = string]
 * (optional) amount : amount [type = number]

 Request

 ```bash
curl 'http://apigateway-jarviscloud.herokuapp.com/currency?from=EUR&to=GBP&amount=10'
 ```

Response

```json
{
  "result":{
    "from":"EUR",
    "to":"USD",
    "rate":0.13,
    "amount":1.3
  }
}
```

### Mock (next service) ###

Generate random fake data from a json schema.
* POST : /mock

Body
 * (mandatory) schema : schema generator

Request

```bash
```

Response

```json
```
