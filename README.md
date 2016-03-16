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
        "cloud":24 // % clouds
        },
      "temp":{ // Unit Kelvin
        "day":288.56,
        "max":288.56,
        "min":279.66,
        "night":279.66,
        "evening":285.79,
        "morning":282.25
        },
      "pressure":946.95,
      "humidity":94, // % humidity
      "wind":{
        "speed":3.61, // Unit meter/sec
        "direction":323 // degrees
      }
    }]
  }
}
```

### Currency ###

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

### Mock ###

Generate random fake data from a user json.
* POST : /mock

  Create new schema with fake data

  Body
   * (mandatory) schema : schema generator
   * (optional) locale : response data locale


 * GET : /mock/:id

   Recover schema from ID. Schema lives one week.

Usage
 * person
   * person.fullname
   * person.firstname
   * person.lastname
   * person.title
   * person.prefix
   * person.suffix
   * person.job
   * person.company
   * person.avatar
   * person.phone
   * person.email
   * person.password
   * person.username
   * person.accountid
   * person.accountname
 * address
   * address.city
   * address.street
   * address.zipcode
   * address.county
   * address.country
   * address.countrycode
   * address.state
 * date
   * date.random
   * date.future
   * date.past
   * date.recent
   * date.month
   * date.weekday
 * currency
   * currency.code
   * currency.name
   * currency.symbol
 * numbers
   * number.random
   * number.uuid
   * number.ip
   * number.mac
   * number.latitude
   * number.longitude
   * number.boolean
   * number.colorhex
   * number.price
 * internet
   * internet.protocol
   * internet.url
   * internet.domain
   * internet.useragent
 * strings
   * string.word
   * string.sentence
   * string.paragraph
   * string.color
   * string.thing

Locale

The default language is set to English.
 * de
 * en
 * es
 * fa
 * fr
 * it
 * ja
 * ko
 * pt
 * ru
 * tr
 * zh

Requests

```bash
curl -X POST -d '{"locale":"es","schema":{"createdAt": "date.past","user":{"name":"person.fullname","image":"person.avatar"},"auth":{"email":"person.email","password":"person.password"}}}' http://apigateway-jarviscloud.herokuapp.com/mock
```


```bash
curl http://apigateway-jarviscloud.herokuapp.com/mock/2947221520
```

Response

```json
{
	"result": {
		"id": "2947221520", // fake schema id
		"createdAt": "2016-03-14T08:57:26.684Z",
		"locale": "es", // locale
		"schema": { // fake data
			"createdAt": "Mon Aug 24 2015 13:50:46 GMT+0200 (CEST)",
			"user": {
				"name": "Clara Solano",
				"image": "https://s3.amazonaws.com/uifaces/faces/twitter/VinThomas/128.jpg"
			},
			"auth": {
				"email": "Diana_Ortega@hotmail.com",
				"password": "5XrWFSw5UiYKEU0"
			}
		}
	}
}
```
