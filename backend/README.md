# tsconfig.json :

    "module": "NodeNext",                                
    "rootDir": "src",                                  
    "moduleResolution": "nodenext",
    "target": "es2020", 
    outDir : dist

# package.json:

added : type:"module" --> we can directly use import statements instead of require

  "scripts": {
    "start": "node dist/app.js" --> used to start the application in production,
    "build": "tsc",
    "watch": "tsc -w" --> automatically use build command as changes are made in TS file
  },


npm i --save @types/dependecies --> install types/tools as dev dependencies because be don't need types in production we only need javascript

# zod:
for request body authentication

# multer :
used for multipart forms

# twilio :
used for OTP authentication
