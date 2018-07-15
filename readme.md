# Parsony React Web Starter
Web App starter compatible with [Parsony WebServices](https://github.com/epcphelan/parsony-services-starter)
* React / Redux
* Semantic UI
* Parsony-Web
* Webpack 4.0


## Installation
Clone or download this repository. 
Or, install along with WebServices using [Parsony-CLI](https://www.npmjs.com/package/parsony-cli)
```
$ [sudo] npm i -g parsony-cli
$ mkdir <Project Name>
$ cd <Project Name>
$ parsony init
```
## Configuration
**HTTP Ports:** Recommended dev configuration:

* WebServices : 8070
* WebServer :  8090
* Webpack Dev Server : 3000

Your production configuration may vary, as you might choose to use separate
machines for your WebServer and for your Services.
```
{
  "http_port": 8090,
  "api_key": "bb224fb48eb71479d533982a34d479bc1e9b8200.key",
  "secret":"9701bcccb27693b1268c7c6d3dcbf4666e5ea7e2.secret",
  "services_uri": "http://localhost:8070/json-api",
  "endpoints":{
    "api":"/json-api",
    "sms":"/sms"
  },
  "static_files":"/dist"
}

```
###API Key and Secret
A default key pair can be found in your WebServices root dir in ```.parsony.json```.
Additional credentials can be generated and managed by the Auth module.

From **.parsony.json** :
```
{
  "installed": true,
  "init": {
    "key": "bb224fb48eb71479d533982a34d479bc1e9b8200.key",
    "secret": "9701bcccb27693b1268c7c6d3dcbf4666e5ea7e2.secret"
  }
}
```


## Run
### WebServer 
Whether running in dev mode or in production, you will need to start the 
WebServer, which routes and handles Parsony API requests.

Start WebServer:
```$xslt
$ npm run server
```

### Webpack
Webpack is configured to run in dev mode with Webpack Dev Server (defaults to port:3000).
Hot reloading is enabled by default.

**Note:** occasionally Hot-reloading stalls. It can help to build the project
once before running in dev mode.

#### Run in dev mode with hot-reloading:

```$xslt
$ npm run dev
```
>http://localhost:3000

#### Build for production:

```$xslt
$ npm run build
```
>http://localhost:8090

## API Documentation
Parsony generates API documentation which can always be fetched as JSON from
```
GET http://localhost:8070/api/doc
```

Parsony Web Starter also provides a React Component that provides a rich
UI for the API Docs, which can be found in ```src/libs/parsony/react/Documentation```

By default, Parsony WebServices Starter has placed api documentation at the route
```/api```. You can move this by changing the route, or by using the component elsewhere:
```jsx
import APIDocumentation from '../../libs/parsony/react/Documentation';

<APIDocumentation
    endpoint = '/json-api' // optional, defaults to '/json-api'
/>
```

## Semantic UI Theming
Learn more about theming at [Semantic UI](https://semantic-ui.com/usage/theming.html)
Override styles in ```/semantic-theme```
Parsony React Web Starter provides a Theming page at ```/theming```. As with
API documentation, this is a single React Component which should be removed in
production. It can be moved and used as:
```js
import ThemingLayout from'../../libs/parsony/react/Theming';

<ThemingLayout/>
```