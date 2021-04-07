## Indices
- [Cadastro de carros](#cadastro-de-carros)
- [Listagem de carros](#listagem-de-carros)
- [Cadastro de especificação no carro](#cadastro-de-especificação-no-carro)
- [Cadastro de imagens do carros](#cadastro-de-imagens-do-carros)
- [Aluguel de carro](#aluguel-de-carro)


# Cadastro de carros

> **RF** => Requisitos funcionais
- Deve ser possível listar todas as categorias.
- Deve ser possível cadastrar um carro.

> **RNF** => Requisitos não funcionais



> **RN** => Regra de negócio

- Não deve ser possível cadastrar um carro com uma placa ja existente.
- Não deve ser possível alterar a placa de um carro já cadastrado.
- O carro deve ser cadastrado por padrão com disponibilidade.
- O usuário responsável pelo cadastro de um carro deve ser um usuário administrador.

# Listagem de carros

> **RF**
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome da marca
- Deve ser possível listar todos os carros disponíveis pelo nome do carro

> **RNF**

> **RN**
- O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

> **RF**
- Deve ser possível cadastrar uma especificação para um carro.
- Deve ser possível listar todas as especificações.
- Deve ser possível listar todos os carros.

> **RN**
- Não dever ser possível cadstrar uma especificação para um caro não cadastrado
- Não deve ser possível cadastrar uma especificação já existente para um mesmo carro.
- O usuário responsável pelo cadastro de uma especificação deve ser um usuário administrador.

# Cadastro de imagens do carros

> **RF**
- Deve ser possível cadastrar a imagem do carro.
- Deve ser possível listar todos os carros.

> **RNF**
- Utilizar o multer para upload dos arquivos.


> **RN**
- O usuário deve poser cadastrar mais de uma imagem para o mesmo carro.
- O Usuário responsável pelo cadastro das imagens deve ser um administrador.

# Aluguel de carro

> **RF**
- Deve ser possível cadastrar um alugel.

> **RN**

> **RNF**
- O aluguel deve ter duração minima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
