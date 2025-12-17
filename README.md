# 🌱 EcoCapiba

> Transformando Lixo em Moedas, Atitude em Futuro

O EcoCapiba é uma plataforma de gamificação que incentiva práticas sustentáveis através de um sistema de recompensas. Usuários acumulam **Capibas** (moeda virtual) e **XP** ao participar de quizzes educativos, registrar reciclagens e convidar amigos para a plataforma.

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Executando o Projeto](#-executando-o-projeto)
- [Testes](#-testes)
- [API](#-api)
- [Contribuindo](#-contribuindo)
- [Equipe](#-equipe)
- [Licença](#-licença)

## 🎯 Sobre o Projeto

O EcoCapiba nasce do desejo de inovar a sustentabilidade urbana. O objetivo principal é desenvolver um sistema de recompensas e níveis que incentive diretamente atividades cidadãs de reciclagem e coleta seletiva.

A plataforma permite que os usuários acumulem a moeda virtual **Capibas** como uma recompensa tangível por aprender, praticar e divulgar práticas de descarte correto, transformando uma responsabilidade cívica em uma atividade gratificante.

## ✨ Funcionalidades

### 🔐 Autenticação
- Registro de usuários com código de convite
- Login seguro com JWT
- Sistema de perfil do usuário
- Gerenciamento de XP e Capibas

### 📚 Quizzes Educativos
- Quizzes sobre descarte correto e sustentabilidade
- Sistema de pontuação e aprovação
- Limite de tentativas por dia
- Recompensas em XP e Capibas

### ♻️ Sistema de Reciclagem
- Registro de reciclagens realizadas
- Calendário de reciclagens do mês
- Sistema de streak (sequência de semanas)
- Multiplicador de recompensas baseado em streak

### 🎁 Sistema de Recompensas
- **XP (Experiência)**: Acumulada através de atividades
- **Capibas**: Moeda virtual ganha por ações sustentáveis
- Sistema de convites com recompensas para convidante e convidado
- Níveis e progressão baseados em XP

## 🛠 Tecnologias

### Backend (API)
- **Node.js** com **Express 5**
- **TypeScript** para type safety
- **Prisma** como ORM
- **PostgreSQL** como banco de dados
- **JWT** para autenticação
- **bcrypt** para hash de senhas
- **Jest** para testes

### Frontend (Client)
- **React 18** com hooks
- **Vite** como build tool
- **React Router** para navegação
- **React Query** para gerenciamento de estado do servidor
- **Styled Components** para estilização
- **HTML5 QR Code** para leitura de QR codes
- **Lucide React** para ícones

## 📁 Estrutura do Projeto

```
ecocapiba/
├── api/                    # Backend API
│   ├── src/
│   │   ├── modules/        # Módulos da aplicação
│   │   │   ├── auth/       # Autenticação
│   │   │   ├── quiz/       # Quizzes
│   │   │   └── recycle/    # Reciclagem
│   │   ├── db/             # Configuração do banco
│   │   ├── middleware/      # Middlewares
│   │   ├── resources/      # Recursos compartilhados
│   │   └── utils/         # Utilitários
│   ├── prisma/             # Schema e migrations
│   └── test/               # Testes automatizados
│
└── client/                 # Frontend React
    ├── src/
    │   ├── components/     # Componentes React
    │   ├── hooks/          # Custom hooks
    │   ├── pages/          # Páginas da aplicação
    │   └── enums/          # Enumerações
    └── public/             # Arquivos estáticos
```

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 12 ou superior)
- **Git**

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <repository-url>
cd ecocapiba
```

2. Instale as dependências do backend:
```bash
cd api
npm install
```

3. Instale as dependências do frontend:
```bash
cd ../client
npm install
```

## ⚙️ Configuração

### Backend (API)

1. Crie um arquivo `.env` na pasta `api/`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecocapiba?schema=public"

# JWT
JWT_SECRET_KEY="your-secret-key-here"
JWT_ACCESS_EXPIRATION=3600

# Rewards
CAPIBA_REWARD=10
XP_REWARD=50
```

2. Execute as migrations do Prisma:
```bash
cd api
npx prisma migrate dev
```

3. (Opcional) Gere o cliente Prisma:
```bash
npx prisma generate
```

### Frontend (Client)

1. Crie um arquivo `.env` na pasta `client/`:
```env
VITE_API_URL=http://localhost:8080
```

## 🏃 Executando o Projeto

### Backend

Em modo de desenvolvimento:
```bash
cd api
npm run dev
```

O servidor estará rodando em `http://localhost:8080`

Para produção:
```bash
cd api
npm run build
npm start
```

### Frontend

Em modo de desenvolvimento:
```bash
cd client
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite)

Para produção:
```bash
cd client
npm run build
npm run preview
```

## 🧪 Testes

### Backend

Execute todos os testes:
```bash
cd api
npm test
```

Execute testes com cobertura:
```bash
cd api
npm test -- --coverage
```

Execute testes em modo watch:
```bash
cd api
npm test -- --watch
```

## 📡 API

### Endpoints Principais

#### Autenticação
- `POST /auth/login` - Login do usuário
- `POST /auth/register` - Registro de novo usuário
- `GET /auth/profile` - Obter perfil do usuário (requer autenticação)
- `GET /auth/getxp` - Obter XP do usuário (requer autenticação)
- `POST /auth/addxp` - Adicionar XP ao usuário (requer autenticação)

#### Quiz
- `POST /quiz/attempt/:quizId` - Registrar tentativa de quiz (requer autenticação)

#### Reciclagem
- `POST /recycle/check-recycle` - Verificar se usuário reciclou em uma data
- `POST /recycle` - Registrar nova reciclagem
- `POST /recycle/calendar` - Obter calendário de reciclagens do mês (requer autenticação)
- `GET /recycle/streak` - Obter streak e multiplicador (requer autenticação)

### Autenticação

A maioria dos endpoints requer autenticação via JWT. Inclua o token no header:

```
Authorization: Bearer <seu-token-jwt>
```

## 👥 Equipe

Projeto desenvolvido por alunos de Sistemas de Informação do 2º período de 2025, sob a tutela do docente **Kiev Gama** e em parceria com a **Prefeitura do Recife**.

<div align="center">
    <table style="margin: 0 auto;">
        <tr>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/helington">
                    <img src="https://avatars.githubusercontent.com/u/78865806?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>Helington Willamy</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/GabrielNSB007">
                    <img src="https://avatars.githubusercontent.com/u/154392376?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>Gabriel Nóbrega</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/luismiguuel">
                    <img src="https://avatars.githubusercontent.com/u/224866738?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>Luis Miguel</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/vitorlins0">
                    <img src="https://avatars.githubusercontent.com/u/224650528?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>João Vitor Lins</b></sub>
                </a>
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/Igor-a-Soares">
                    <img src="https://avatars.githubusercontent.com/u/223944470?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>Igor Soares</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/AldusD">
                    <img src="https://avatars.githubusercontent.com/u/98439753?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>Aldus Daniel</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <a href="https://github.com/joao-valentim-dias">
                    <img src="https://avatars.githubusercontent.com/u/176482867?v=4" width="120px" style="border-radius: 50%; border: 3px solid #4CAF50;"><br />
                    <sub><b>João Vitor Valentim</b></sub>
                </a>
            </td>
            <td align="center" style="padding: 10px;">
                <!-- Espaço vazio para manter alinhamento -->
            </td>
        </tr>
    </table>
</div>

## 📝 Licença

Este projeto está sob a licença ISC.

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

Para mais informações sobre o projeto, entre em contato com a equipe de desenvolvimento.

---

**"Seu lixo vale moedas. Sua atitude vale o futuro."** 🌍✨
