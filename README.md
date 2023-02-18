# NODEPOP API
Install dependencies:
```sh
npm install
```

Initialize the database with:

```sh
npm run initDB
```
```

Sart in development mode:
```sh
npm run dev
```
## General info

Application created with:

```sh
npx express-generator nodeapp --ejs
```

## Start a MongoDB Server in Macos or Linux

In la console go to MongoDB folder and:

```sh
    ./bin/mongod --dbpath ./data
```

## API Methods

### GET/apiv1/anuncio

{
  "results": [
     {
            "_id": "63f0b16fcb20fd14c25428aa",
            "nombre": "Bicicleta",
            "venta": true,
            "precio": 230.15,
            "foto": "bici.jpg",
            "tag": [
                "lifestyle",
                "motor"
            ],
            "__v": 0
        },
  ]  
}    