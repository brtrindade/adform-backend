# Api backend Adform

Este repositório contém a API RESTful criada para a aplicação adForm.
Para o frontend ir até o seguinte repositório: [adform-frontend](https://github.com/brtrindade/adform-frontend)

### Ferramentas utilizadas para a criação da api:

 - NodeJs
 - Express
 - Sequelize
 - Axios
 - Nodemon


### Como utilizar a api.
Faça uma cópia do repositório e dentro da pasta backend rode o seguinte comando:
```sh
npm install
npm run dev
```
ou
```sh
yarn install
yarn dev
```

Crie um container do Docker com Postgres conforme abaixo:
```sh
docker run --name adsoftform -e POSTGRES_PASSWORD=adsoft -p 5432:5432 -d postgres
```
Agora para criar o banco dentro do Postgres e realizar as migrations e seeds, abra novamente o terminal dentro da pasta backend e digite:
```sh
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
ou
```sh
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
```