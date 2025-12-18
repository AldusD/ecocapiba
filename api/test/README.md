# Testes Automatizados da API

Este diretório contém os testes automatizados para a API do projeto.

## Estrutura

```
test/
├── helpers/
│   ├── testApp.ts          # Helper para criar app Express para testes
│   └── mockData.ts         # Dados mockados para os testes
├── modules/
│   ├── auth/
│   │   ├── AuthController.test.ts
│   │   ├── AuthService.test.ts
│   │   └── AuthRepository.test.ts
│   ├── quiz/
│   │   ├── QuizController.test.ts
│   │   ├── QuizService.test.ts
│   │   └── QuizRepository.test.ts
│   └── recycle/
│       ├── RecycleController.test.ts
│       ├── RecycleService.test.ts
│       └── RecycleRepository.test.ts
├── integration/
│   ├── auth.integration.test.ts
│   ├── quiz.integration.test.ts
│   └── recycle.integration.test.ts
└── TEST_TEMPLATE.md        # Template padronizado para criar novos testes
```

## Executando os Testes

Para executar todos os testes:

```bash
npm test
```

Para executar testes específicos:

```bash
npm test -- test/modules/auth/AuthController.test.ts
```

Para executar em modo watch:

```bash
npm test -- --watch
```

Para ver cobertura de código:

```bash
npm test -- --coverage
```

## Tipos de Testes

### Testes de Unidade (Unit Tests)

- **Controllers**: Testam a lógica dos controllers isoladamente, mockando os services
- **Services**: Testam a lógica de negócio dos services, mockando os repositories

### Testes de Integração (Integration Tests)

- Testam o fluxo completo das rotas HTTP, incluindo middleware de autenticação
- **Auth**: Testa rotas de login, register, profile, getXp, addXp
- **Quiz**: Testa rota de registro de tentativas de quiz (`/quiz/attempt/:quizId`)
- **Recycle**: Testa rotas de check-recycle, create, calendar, streak
- **Auth**: Testa rotas de login, register, profile, getXp, addXp
- **Quiz**: Testa rota de registro de tentativas de quiz
- **Recycle**: Testa rotas de check-recycle, create, calendar, streak

## Cobertura

Os testes cobrem:

- ✅ Módulo Auth (login, register, profile, getXp, addXp)
- ✅ Módulo Quiz (registerAttempt)
- ✅ Módulo Recycle (checkRecycle, create, getCalendar, getStreak)

## Mocks

Os seguintes módulos são mockados nos testes:

- `bcrypt` - Para testes de autenticação sem hash real
- `jwt.utils` - Para testes sem geração real de tokens
- `AuthRepository` - Para testes isolados do service

## Notas

- Os testes usam Jest com suporte a ES modules
- Mocks são configurados no início de cada arquivo de teste
- Helpers compartilhados estão em `test/helpers/`
