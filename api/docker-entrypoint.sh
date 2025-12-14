set -e

echo "🚀 Iniciando API EcoCapiba..."

# Aguardar o banco de dados estar pronto
echo "⏳ Aguardando PostgreSQL..."
until npx prisma db push --skip-generate 2>/dev/null || npx prisma migrate deploy 2>/dev/null; do
  echo "⏳ PostgreSQL ainda não está pronto - aguardando..."
  sleep 2
done

echo "✅ PostgreSQL está pronto!"

# Rodar migrations
echo "🔄 Executando migrations..."
npx prisma migrate deploy

echo "✅ Migrations executadas com sucesso!"

# Executar o comando passado para o container
echo "🎯 Iniciando aplicação..."
exec "$@"