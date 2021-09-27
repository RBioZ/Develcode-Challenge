<h1 align="center">
	Backend
</h1>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=Version&message=1.0.0&color=F00&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=License&message=MIT&color=F00&labelColor=000000">
</p>

<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-licença">Licença</a>
</p>

<br>

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [NodeJS](https://facebook.github.io/react-native/)
- [Express](https://expo.io/)

## 🗒 Projeto

A aplicação crud de usuários

## 💻 Instalação

```bash

# Movendo-se para dentro
$ cd backend

# Instalando as dependências
$ yarn install

```

### Para criar um container PostgresSQL:

```
docker run --name database -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

yarn typeorm migration:run

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```