# udacity-image-proccessing
This applciation is process some images as a project of nodejs nonodgree of udacity

## BUILD 
To build this application first run 

``` bash
npm install 
```

To install the dependancy 

Then run
``` bash
 npm run build
 ```

To build the applicaiton into `/dist` directory.

## Run

To run the application into a dev environment run
``` bash
 npm run dev
 ```

This will keep the application watching any changes happens in the source code files.

To run the applicaiton in production like environment run 

``` bash
npm start
```

## Linting

To run the ts linter 

``` bash
npm run lint
```

## End Points

We have just one API end point

` GET /image/resize/:imageName?/:imageType`

`imageName String (required)` [Path Param] is the name that needs to be retrieved.
`imageType String (required)` [Path Param] Now this end point supports `jpg` and `png types only.
`width Number (required)`  [Query Param] the width for the image to be resized.
`height Number (required)`  [Query Param] the height for the image to be resized.








