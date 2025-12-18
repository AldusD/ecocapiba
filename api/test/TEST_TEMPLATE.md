# Template de Testes Padronizado

Este documento descreve o padrão de testes unitários para os módulos da API.

## Estrutura de Testes

Cada módulo deve ter 3 arquivos de teste:

1. `{Module}Controller.test.ts` - Testes do Controller
2. `{Module}Service.test.ts` - Testes do Service
3. `{Module}Repository.test.ts` - Testes do Repository

## Padrão de Testes do Controller

```typescript
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { ModuleController } from "../../../src/modules/module/ModuleController.js";
import { ModuleService } from "../../../src/modules/module/ModuleService.js";
import { HttpStatusEnum } from "../../../src/modules/shared/enums/httpStatusEnum.js";
import { MessagesEnum } from "../../../src/modules/shared/enums/messagesEnum.js";
import { Request, Response } from "express";

describe("ModuleController", () => {
  let moduleController: ModuleController;
  let mockModuleService: jest.Mocked<ModuleService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockModuleService = {
      // Mock dos métodos do service
      methodName: jest.fn(),
    } as any;

    moduleController = new ModuleController(mockModuleService);

    mockRequest = {
      params: {},
      body: {},
    };

    mockResponse = {
      status: jest.fn().mockReturnThis() as any,
      json: jest.fn().mockReturnThis() as any,
      send: jest.fn().mockReturnThis() as any,
      locals: {},
    };
  });

  describe("methodName", () => {
    it("deve executar ação com sucesso", async () => {
      mockModuleService.methodName.mockResolvedValue(mockData);
      mockRequest.body = {
        /* dados de teste */
      };
      (mockResponse.locals as any).user = "1";

      await moduleController.methodName(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(
        mockModuleService.methodName
      ).toHaveBeenCalledWith(/* parâmetros esperados */);
      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatusEnum.OK);
      expect(mockResponse.json).toHaveBeenCalledWith(/* resposta esperada */);
    });

    it("deve retornar erro quando ocorre falha", async () => {
      mockModuleService.methodName.mockRejectedValue(
        new Error(MessagesEnum.ERROR_MESSAGE)
      );

      await moduleController.methodName(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatusEnum.INTERNAL_SERVER_ERROR
      );
      expect(mockResponse.send).toHaveBeenCalledWith({
        error: MessagesEnum.ERROR_MESSAGE,
      });
    });
  });
});
```

## Padrão de Testes do Service

```typescript
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { ModuleService } from "../../../src/modules/module/ModuleService.js";
import { ModuleRepository } from "../../../src/modules/module/ModuleRepository.js";
import { MessagesEnum } from "../../../src/modules/shared/enums/messagesEnum.js";

// Mock Repository
jest.mock("../../../src/modules/module/ModuleRepository.js");

describe("ModuleService", () => {
  let moduleService: ModuleService;
  let mockModuleRepository: jest.Mocked<ModuleRepository>;

  beforeEach(() => {
    mockModuleRepository = {
      // Mock dos métodos do repository
      methodName: jest.fn(),
    } as any;

    moduleService = new ModuleService();
    (moduleService as any).moduleRepository = mockModuleRepository;
  });

  describe("methodName", () => {
    it("deve executar lógica de negócio com sucesso", async () => {
      mockModuleRepository.methodName.mockResolvedValue(mockData);

      const result = await moduleService.methodName(/* parâmetros */);

      expect(
        mockModuleRepository.methodName
      ).toHaveBeenCalledWith(/* parâmetros esperados */);
      expect(result).toEqual(/* resultado esperado */);
    });

    it("deve lançar erro quando validação falha", async () => {
      await expect(
        moduleService.methodName(/* parâmetros inválidos */)
      ).rejects.toThrow(MessagesEnum.ERROR_MESSAGE);
    });
  });
});
```

## Padrão de Testes do Repository

```typescript
import { describe, it, expect, beforeEach, jest } from "@jest/globals";
import { ModuleRepository } from "../../../src/modules/module/ModuleRepository.js";

// Mock PrismaClient
jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    modelName: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

describe("ModuleRepository", () => {
  let moduleRepository: ModuleRepository;
  let mockPrismaClient: any;

  beforeEach(() => {
    mockPrismaClient = {
      modelName: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        findMany: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    moduleRepository = new ModuleRepository();
    (moduleRepository as any).prisma = mockPrismaClient;
  });

  describe("methodName", () => {
    it("deve executar query com sucesso", async () => {
      const mockData = {
        /* dados mockados */
      };
      mockPrismaClient.modelName.findUnique.mockResolvedValue(mockData);

      const result = await moduleRepository.methodName(/* parâmetros */);

      expect(mockPrismaClient.modelName.findUnique).toHaveBeenCalledWith({
        where: {
          /* condições */
        },
      });
      expect(result).toEqual(mockData);
    });

    it("deve retornar null quando não encontra dados", async () => {
      mockPrismaClient.modelName.findUnique.mockResolvedValue(null);

      const result = await moduleRepository.methodName(/* parâmetros */);

      expect(result).toBeNull();
    });
  });
});
```

## Boas Práticas

1. **Isolamento**: Cada camada deve ser testada isoladamente, mockando as dependências
2. **Nomenclatura**: Use `describe` para agrupar testes por método e `it` para casos específicos
3. **Arrange-Act-Assert**: Organize os testes em 3 partes: preparação, execução, verificação
4. **Cobertura**: Teste casos de sucesso e falha
5. **Mocks**: Use mocks para dependências externas (banco de dados, serviços externos)
6. **Dados de Teste**: Use helpers/mockData.ts para dados reutilizáveis

## Checklist de Testes

Para cada método, teste:

- [ ] Caso de sucesso
- [ ] Caso de erro/validação
- [ ] Casos extremos (null, undefined, valores inválidos)
- [ ] Verificação de chamadas aos métodos mockados
- [ ] Verificação de status HTTP (para controllers)
- [ ] Verificação de dados retornados
