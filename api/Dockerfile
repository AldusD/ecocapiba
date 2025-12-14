# Etapa 1: Base
FROM node:18-alpine AS base
WORKDIR /app

# Instalar dependências do sistema necessárias para o Prisma
RUN apk add --no-cache openssl libc6-compat

# Etapa 2: Dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
RUN cp -R node_modules /tmp/node_modules

# Instalar todas as dependências (incluindo dev) para build
RUN npm ci

# Etapa 3: Build
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Se usar TypeScript, descomente a linha abaixo:
# RUN npm run build

# Etapa 4: Production
FROM base AS production

# Copiar apenas node_modules de produção
COPY --from=dependencies /tmp/node_modules ./node_modules

# Copiar arquivos necessários
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY . .

# Gerar Prisma Client novamente no ambiente de produção
RUN npx prisma generate

# Expor porta
EXPOSE 3001

# Comando que roda migrations e inicia a aplicação
CMD sh -c "echo '🚀 Iniciando API...' && \
    echo '⏳ Aguardando PostgreSQL...' && \
    until npx prisma db push --skip-generate 2>/dev/null; do \
    echo '⏳ Aguardando PostgreSQL...'; \
    sleep 2; \
    done && \
    echo '✅ PostgreSQL pronto!' && \
    echo '🔄 Executando migrations...' && \
    npx prisma migrate deploy && \
    echo '✅ Migrations executadas!' && \
    echo '🎯 Iniciando aplicação...' && \
    npm start"