# NODEPOP API
Install dependencies:
```sh
npm install
```

Copy .env.example to .env and customize your variables.

```sh
cp .env.example .env
```

Initialize the database with:

```sh
npm run initDB
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
```
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
``` 
***
### GET/apiv1/anuncio/tags
```
{
  "Tags": [
    "work",
    "lifestyle",
    "motor",
    "mobile"
  ]
}
```
***
### POST /apiv1/anuncios
##### New register

![New register](/public/images/document/NewAnuncio.JPG)

### List of records with tags
#### Possible filter combinations
* tag
* sale or search (venta = true/false)
* price range- between values (precio=10-50),
value greater than (precio=10-), 
value less than (precio=-50), value equal to (precio=50)
* Name of the article that begins with (nombre=sa)
* Start of displayed article (start=0)
* Number of items to display (limit=3)
* Order of articles (sort=precio)

#### Example of the request
```
http://localhost:3000/apiv1/anuncios?tag=mobile&venta=false&nombre=sa&precio=60-&start=0&limit=3&sort=precio
```


## BROWSER

### List of records in the browser
```
http://localhost:3000/
```
### List of available tags
```
http://localhost:3000/tags
```
### List of records filter in the browser

#### Possible filter combinations
* tag
* sale or search (venta = true/false)
* price range- between values (precio=10-50),
value greater than (precio=10-), 
value less than (precio=-50), value equal to (precio=50)
* Name of the article that begins with (nombre=sa)
* Start of displayed article (start=0)
* Number of items to display (limit=3)
* Order of articles (sort=precio)

#### Example of the request
```
http://localhost:3000?tag=mobile&venta=false&nombre=sa&precio=60-&start=0&limit=3&sort=precio
