# RowPermitCalculator

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# COR-Specific AWS Deployment

### Pre-AWS

- ng build --prod --bh /name-of-thing (this name will need to correspond with the future URL)
* Need trailing slash on this! Ex: ng build --prod --bh /row-permit-calculator/

- ***In project folder***: zip -r dist.zip dist

- scp -i *full path of pem file* AND *full path of dist file* ubuntu@54.148.0.119:/tmp  
Example: scp -i ~/Desktop/code/sysadmin/bc-prod.pem ~/Desktop/code/row-permit-calculator/dist.zip ubuntu@54.148.0.119:/tmp

- ssh -i *full path of pem file* ubuntu@54.148.0.119   
Example: ssh -i ~/Desktop/code/sysadmin/bc-prod.pem ubuntu@54.148.0.119

### Upon SSH into Server

- cd /tmp

- -ls to make sure old dist file exists  

***Before unzipping zipped dist, get rid of old one:***

- rm -rf dist

***Then unzip zipped dist***

- unzip dist.zip

***Move to URL, using the path that corresponds with the build's name-of-thing***

- sudo cp -R * /var/www/html/row-permit-calculator/
* Need trailing slahs on this too! 

###### Hooray!
