# Prueba Técnica - Backend (NestJS + PostgreSQL)

## Requisitos

- Node.js 18+
- PostgreSQL 13+

## Variables de entorno

Crea un fichero `.env` basado en `.env.example`:

```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=postgres
DB_NAME=products_db
DB_SSL=false
```

## Instalar y ejecutar

```
npm install
npm run start:dev
```

La API quedará en `http://localhost:3000`.

## Endpoints

- POST `/products`
- GET `/products`
- GET `/products/:id`
- PATCH `/products/:id`
- DELETE `/products/:id`

Todos los endpoints validan DTOs y retornan excepciones adecuadas.

## Pruebas

```
npm test
```

## Despliegue en AWS (ECS + RDS) [Resumen]

- **RDS (PostgreSQL)**: crear instancia en subredes privadas, SG que permita acceso desde ECS. Parámetros: nombre DB, usuario y contraseña.
- **Secrets Manager**: crear un secreto con credenciales DB (`username`, `password`, `host`, `port`, `db`). Otorgar permiso al task role de ECS para `secretsmanager:GetSecretValue`.
- **ECS (Fargate)**: definir Task Definition con contenedor Node, imagen del repo (ECR). Inyectar variables de entorno a partir del secreto (o usar `AWS_SECRET_ARN` y resolver en entrypoint). Colocar detrás de un ALB si se requiere público.
- **Configuración de la app**: mapear variables de entorno en ECS a `DB_*` y `PORT`.

### Terraform (opcional - idea)

- Módulos para `aws_db_instance` (RDS PostgreSQL), `aws_secretsmanager_secret` + `aws_secretsmanager_secret_version`, `aws_ecs_cluster`, `aws_ecs_task_definition`, `aws_ecs_service`, `aws_lb`.
- Salidas: endpoint de RDS, ARN del secreto, URL del ALB.

## CI/CD (GitHub Actions)

Workflow en `.github/workflows/ci.yml` ejecuta las pruebas en cada push/PR.

