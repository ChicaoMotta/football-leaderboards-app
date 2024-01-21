# Football Leaderboards App

Welcome to the Football Leaderboards App! This is a full-stack Dockerized application that provides a comprehensive overview of soccer team matches and statistics. The app renders a table with team stats, including points, games played, goals scored, goals conceded, etc. Admins can log in to modify match scores, add matches, and control ongoing matches in real time. The project follows RESTful API principles, incorporating SOLID principles and Object-Oriented Programming (OOP).

## Technologies Used:

- Docker
- Typescript
- Node.js
- Express.js
- Sequelize (Backend ORM)
- Mocha (Testing framework)
- Chai (Assertion library)
- jsonwebtoken (JWT for authentication)
- mysql2 (MySQL client)
- React (Frontend)

## Features:

- Full-stack Dockerized application.
- Real-time updates for match scores, added matches, and ongoing matches.
- RESTful API design with SOLID principles and OOP.
- Admin login to modify match scores, add matches, and manage ongoing matches.

## How to Run:

To run the app, use the following commands:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/football-leaderboards-app.git
    cd football-leaderboards-app
    ```

2. Start the application with Docker Compose:
    ```bash
    cd app && docker-compose up -d --build
    ```

3. To stop the application:
    ```bash
    cd app && docker-compose down --remove-orphans
    ```

## Admin and User Login:

- Admin:
  - Email: 'admin@admin.com'
  - Password: 'secret_admin'

- User:
  - Email: 'user@user.com'
  - Password: 'secret_user'

## How to Test:

To test the application, navigate to the backend folder and run:
```bash
cd backend && npm run test
```

Feel free to contribute or report issues!

---

**Portuguese:**

# Football Leaderboards App

Bem-vindo ao Football Leaderboards App! Este é um aplicativo full-stack Dockerizado que fornece uma visão abrangente das partidas e estatísticas das equipes de futebol. O aplicativo renderiza uma tabela com estatísticas das equipes, incluindo pontos, jogos disputados, gols marcados, gols sofridos, etc. Os administradores podem fazer login para modificar os resultados das partidas, adicionar novas partidas e controlar partidas em andamento em tempo real. O projeto segue os princípios de API RESTful, incorporando os princípios SOLID e a Programação Orientada a Objetos (OOP).

## Tecnologias Utilizadas:

- Docker
- Typescript
- Node.js
- Express.js
- Sequelize (ORM para o Backend)
- Mocha (Framework de testes)
- Chai (Biblioteca de assertivas)
- jsonwebtoken (JWT para autenticação)
- mysql2 (Cliente MySQL)
- React (Frontend)

## Recursos:

- Aplicativo Dockerizado full-stack.
- Atualizações em tempo real para resultados de partidas, adição de novas partidas e controle de partidas em andamento.
- Design de API RESTful com princípios SOLID e OOP.
- Login de administrador para modificar resultados de partidas, adicionar novas partidas e gerenciar partidas em andamento.

## Como Executar:

Para executar o aplicativo, use os seguintes comandos:

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-nome/football-leaderboards-app.git
    cd football-leaderboards-app
    ```

2. Inicie o aplicativo com o Docker Compose:
    ```bash
    cd app && docker-compose up -d --build
    ```

3. Para parar o aplicativo:
    ```bash
    cd app && docker-compose down --remove-orphans
    ```

## Login de Administrador e Usuário:

- Administrador:
  - Email: 'admin@admin.com'
  - Senha: 'secret_admin'

- Usuário:
  - Email: 'user@user.com'
  - Senha: 'secret_user'

## Como Testar:

Para testar o aplicativo, navegue até a pasta backend e execute:
```bash
cd backend && npm run test
```

Sinta-se à vontade para contribuir ou relatar problemas!