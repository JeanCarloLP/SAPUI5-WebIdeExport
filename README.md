# My Web IDE Project

Application to show how to deploy a simple application exported from the SAP Web IDE to your favourite IDE and work in Local if that is the case.
The configuration is the minimum to make it works, so beyond that you can set your own configuration as you need.

## Requirements

Node.js (version 10 or higher)
UI5 tooling (npm install --global @ui5/cli)
Git (in case you fill confortable to work with commands)
Yarn (not necessary but is a plus)

## First Steps
This project is to use it, as a template to deploy local projects with your favourite IDE, but REMEMBER that we are speaking for a SAPUI5 project!!
Export the App from the Web IDE. Due to the configuration of the online framework SAP Web IDE Full stack, the files will save their own configuration.
So we will erase the following two files (remember to have copies in case of need, you are the main responsible for your developments):
· ui5.yaml
· package.json

## Run your Project
After checkig the [requirements](#requirements) and erase the files in the previous step, proceed as follows:

· verify UI5 tooling
```ruby
ui5 --help
```

· create your new package.json file
```ruby
npm init --yes
```

· create your new ui5.yaml
```ruby
ui5 init
```

· define the framework you want to use (OpenUI5 or SAPUI5, in my case the second one)
```ruby
ui5 use sapui5@latest
```

· now you must add the libraries necessaries for the project (for this project movil and forms are required)
```ruby
ui5 add sap.ui.core sap.m sap.f themelib_sap_fiori_3
```

· now you can execute your project on the localhost
```ruby
ui5 serve
```

### TIPS
· remember to have coppies

· in case you dont want to add the core librarie you can set directly in the index the uri 
```ruby
src="https://openui5.hana.ondemand.com/resources/sap-ui-core.js"
```
this process can save you same time on the compilation process.

· in case you don´t know how to proceed on https://localhost8080 because the are so many folders just click on the index ;)

## Build to deploy
Now your front-end is working so if you need to build it to deploy the dist folder just execute 
```ruby
ui5 build --all
```

## OData Connection
In case of need, like happens with this project, you will need to set the proxy configuration to stublish the connection with your service
Otherwise you will confront the famous CORS error or any similar issue with the OData service.

· In first place we will need to update the uri on our manifest.json in this case:
```ruby
"mainService": {
    "uri": "http://localhost:8081/https://set/here/your/odata/AppService/",
    "type": "OData",
    "settings": {
        "odataVersion": "2.0",
        "localUri": "localService/metadata.xml"
    }
}
```

· Now we must update the package.json 
```ruby
{
  "author": "",
  "description": "your description",
  "devDependencies": {
    "cors-anywhere": "^0.4.1"
  },
  "dependencies": {},
  "keywords": [],
  "license": "ISC",
  "main": "index.js",
  "name": "App Name",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "proxy": "node proxy.js"
  },
  "version": "1.0.0"
}
```
run npm install to install the new packages.

· Create a proxy.js file and paste this minimum configuration
```ruby
var cors_proxy = require('cors-anywhere'),
	// Listen on a specific IP Address
	host = 'localhost',

	// Listen on a specific port, adjust if necessary
	port = 8081;

cors_proxy.createServer({
	originWhitelist: [], // Allow all origins
	requireHeader: ['origin', 'x-requested-with'],
	removeHeaders: ['cookie', 'cookie2']
	}).listen(port, host, function() {
		console.log('Running CORS Anywhere on ' + host + ':' + port);
});
```

And that´s all, in case you are working with visual studio remember you have the option of several terminals
Terminal 1
```ruby
npm run proxy
```

Terminal 2
```ruby
ui5 serve
```
