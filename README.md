
<h3 align=center>A nodejs sports car rent API 🔥</h3>

<div align=center>
<a href="#About-the-project">about</a> |
<a href="#Tecnologies">tecnologies</a> |
<a href="#How-to-run">run</a> |
<a href="#How-to-contribute">contribute</a> |
</div>

---

## About the project

RentalX is a nodejs REST API developed on a back-end bootcamp called [Ignite](https://pages.rocketseat.com.br/ignite). It is platform for renting sports cars which allows you to manage your vehicles, it's features and, of couse, their rents!

Since it's an Open source project, feel free to make your contributions to help make this application a really nice thing :)

## Tecnologies

- [Typescript](https://www.typescriptlang.org/) - Main language
- [Nodejs](https://www.nodejs.org) - Runtime environment
- [Multer](https://github.com/expressjs/multer) - File upload middleware
- [Expressjs](https://github.com/expressjs/express) - Web server
- [Swagger UI](https://swagger.io/) - API documentation

## How to run

**fork this repository on your github**

then, use your terminal to clone your fork to your local machine

```bash
$ git clone <your-fork-url>
$ cd rentalx
$ docker-compose up -d
```

**Some app commands**
```bash
$ yarn dev # run development code
# $ yarn test # run tests (not implemented yet...)
# $ yarn build # creates a javascript build (not implemented yet...)
# $ yarn start # run build code (not implemented yet...)
```

## How to contribute

**make sure to complete the steps on the previous sections**

then,

```bash
# create a branch to wrap your changes
$ git checkout -b <your-branch-name>

# write some code...

# commit your chages
git add . && git commit -m "type(scope): description"

# send them to your fork
git push origin <your-branch-name>
```

**the last step is to create a pull request here on github**

*ps: if you're not familiar with the commit message structure above, please check [this]()*

## Documentation

The API endpoints are well documented on the swagger interface. To check it, just run the api and access 

*http://localhost:3333/api-docs*


---
<div align=center>Project By <a href="https://www.linkedin.com/in/felipekafuri/">Felipe Ramos Kafuri</a></div>

<div align=center>README TEMPLATE BY <a href="https://www.linkedin.com/in/lucas-prazeres/">Lucas Prazeres</a></div>
