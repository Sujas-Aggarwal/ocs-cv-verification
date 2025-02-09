#!/bin/sh
echo "Waiting for MySQL to be ready..."

# Wait for MySQL to accept connections
until nc -z -v -w30 mysql 3306; do
  echo "Waiting for database connection..."
  sleep 2
done

echo "MySQL is ready. Running Prisma migrations..."
npx prisma generate
npx prisma migrate deploy
npx prisma db push
