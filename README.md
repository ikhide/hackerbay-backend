# hackerbay microservice API

A stateless Microservice API

```
- The online version of the swagger Api documentation is avaliable at \api-docs for testing.
```

### Content

- User login with any name and password

- Create image thumbnail from a public image URL

- perform json patching on a json object

- it also returns the logs of all request made to the endpoints

###

## POST login

```
http://localhost:5009/api/login
```

- Login a user with any username and password combination

- Status code 200 is returned on successful login

```
BODY raw
```

```
{
"username": "ikhide",
"password" : "pass"
}
```

```
Example Request
```

```
--data-raw '{
"username": "ikhide",
"password" : "pass"
}'
```

```
Success Response
```

```
{
"status": "success",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ewJ1c2VybmFtZSI6ImtvbGEiLCJwYXNzd29yZCI6Im5mZGYiLCJpYXQiOjE1ODc3MzIzMzYsImV4cCI6MTU4NzczNTkzNn0.6CjatyGeybhQvZY8izragnWBx4IOPvRbRsAeSPZELPDL"
}
```

## POST image_thumbnail

```
http://localhost:5009/api/thumbnail
```

- Endpoint to create image thumbnail from a public image URL

- A successful request will result in an http 200 status code

- An invalid data body will result in an error 400 status code

- An invalid or expired token will return an error 401 status code

- HEADERS

```
BODY raw
```

```
Content-Type
application/json
```

```
{
"url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
}
```

```
Example Request
```

```
image thumbnail example
```

```
curl --location --request POST 'http://localhost:5009/api/thumbnail' \
--header 'Content-Type: application/json' \
```

```
data-raw '{
"url": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
}'
```

```
Example Response
200 － OK
```

```
{
"status": "success",
"thumbnail": {
"type": "Buffer",
"data": [
255,
255,
255,
255,
10,
```

## PATCH json-patch

```
http://localhost:5009/api/json-patch
```

- Api endpoint to json-patch will return a patched json object

- A successful request will result in an http 200 status code

- An invalid data body will result in an error 400 status code

- An invalid or expired token will return an error 401 status code

```
BODY raw
```

```
Content-Type
application/json
```

```
json patch example request
```

```
json-patch example
curl --location --request PATCH 'http://localhost:5009/api/json-patch' \
--header 'Content-Type: application/json' \
```

```
--data-raw{
    "baseJson": {
        "baz": "qux",
        "foo": "bar",
    },
    "jsonPatchObject": [{
        "op": "replace",
        "path": "/baz",
        "value": "boo"
    }],
}
```

```
Example Response
200 － OK
{
    "status": "success",
    "jsonObject": {
        "baz": "boo",
        "foo": "bar"
    }
}
```

## GET Logs

```
http://localhost:5009/api/log"
```

- Api endpoint to logs will return the logs of all request made to endpoints

- A successful request will result in an http 200 status code

- An invalid or expired token will return an error 401 status code

- HEADERS

```
BODY raw
```

```
Content-Type
application/json
```

```
Example Request
request logs example
```

```
curl --location --request GET 'http://localhost:5009/api/log' \
--header 'Content-Type: application/json' \

```

```
Example Response
200 － OK
```

```
{"message":"::1 - - [10/Nov/2020:09:36:39 +0000] \"POST /api/login HTTP/1.1\" 200 212 \"-\" \"PostmanRuntime/7.26.8\"\n","level":"info"}
{"message":"::1 - - [10/Nov/2020:09:37:12 +0000] \"GET /api-docs HTTP/1.1\" 301 183 \"-\" \"PostmanRuntime/7.26.8\"\n","level":"info"}
{"message":"::1 - - [10/Nov/2020:09:37:12 +0000] \"GET /api-docs/ HTTP/1.1\" 200 3104 \"http://localhost:5009/api-docs\" \"PostmanRuntime/7.26.8\"\n","level":"info"}
```

```
End
```
