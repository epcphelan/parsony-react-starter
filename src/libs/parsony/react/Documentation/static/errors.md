## Error Response
All processed API requests respond with a 200 whether or not the request was
successful. Failed requests returns both `{ success: false }`, along with an error object.
If services are running with API_DEBUG = true, the response also includes the
request payload.

#### Response

```$xslt
{
    "requested": "user.login",
    "success": false,
    "error": {
        "code": 401,
        "type": "authentication_failed",
        "message": "Email or password were incorrect.",
        "detail": "The username and password provided do not match any records."
    },
    "data": {
        "received": {
            "username": "john.doe@gmail.com",
            "password": "********"
        }
    }
}
```

### Method Errors
Each endpoint may define and throw it's own custom errors. These
error types and codes are described in the endpoint's documentation.


### Standard API Errors
Generic access errors including validation failures, authentication, authorization
and configuration.





