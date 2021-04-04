# Backend Template
### A Template using Express, Apollo GraphQL with file uploads, JWT Auth, S3 Storage, Postgres, and Redis for scalable GraphQL Subscriptions

### Instructions:
- Create and env folder in the root directory with a dev.env file
- Populate env/dev.env with:
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - POSTGRES_DB
    - POSTGRES_PORT
    - REDIS_HOST
    - REDIS_PORT
    - AWS_ACCESS_KEY_ID
    - AWS_SECRET_ACCESS_KEY
    - AWS_BUCKET
    - AWS_HOSTNAME
- ``docker-compose -f docker-compose-dev.yml up -d``