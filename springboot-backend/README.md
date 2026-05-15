# Auth API (springboot-backend)

Lightweight Spring Boot 3 backend that provides JWT-based authentication, role-based access control (RBAC), and example protected endpoints used by the frontend.

## Tech stack
- Spring Boot 3.3.x
- Spring Security
- JWT (jjwt)
- Spring Data JPA (Hibernate)
- MySQL
- MapStruct
- SpringDoc OpenAPI (Swagger UI)

## Prerequisites
- Java 17 (matching `pom.xml`)
- Maven 3.6+
- MySQL (or compatible RDBMS)

## Quick setup

1. Clone the repo and open the backend folder:

   ```bash
   git clone <repo-url>
   cd springboot-backend
   ```

2. Create a MySQL database (default name used in `application.properties`):

   ```sql
   CREATE DATABASE rbac_system CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. Configure database credentials and JWT secret in `src/main/resources/application.properties` or via environment variables. Default keys in the project:

- `spring.datasource.url` (e.g. `jdbc:mysql://localhost:3306/rbac_system`)
- `spring.datasource.username`
- `spring.datasource.password`
- `app.jwt.secret` (change for production)
- `app.jwt.expiration-ms` (token lifetime in ms)

You can override any value with environment variables (example names): `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, `SPRING_DATASOURCE_PASSWORD`, `APP_JWT_SECRET`, `APP_JWT_EXPIRATION_MS`.

4. Run the application in development:

   ```bash
   mvn spring-boot:run
   ```

   By default the app starts on port `8080`.

5. Build a runnable JAR:

   ```bash
   mvn clean package -DskipTests
   java -jar target/auth-api-0.0.1-SNAPSHOT.jar
   ```

## API overview

- `POST /api/auth/register` — register a new user (body: `RegisterRequestDto`).
- `POST /api/auth/login` — login and receive a JWT (body: `LoginRequestDto`).
- `GET /api/public` — open endpoint.
- `GET /api/user` — requires `USER` or `ADMIN` role.
- `GET /api/admin` — requires `ADMIN` role.

Use the returned `Authorization: Bearer <token>` header for protected requests.

Example curl (login):

```bash
curl -s -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## Swagger / OpenAPI

Swagger UI is available when the app is running at `/swagger-ui.html` (or `/swagger-ui/index.html`).

## Development notes

- The project uses MapStruct for DTO mapping; annotation processors are configured in `pom.xml`.
- Passwords are hashed with `BCryptPasswordEncoder`.
- JWT configuration is read from `app.jwt.secret` and `app.jwt.expiration-ms`.
- `spring.jpa.hibernate.ddl-auto=update` is convenient for dev but consider `validate` or managed migrations for production.

## Troubleshooting

- If the application fails to connect to the DB, verify `spring.datasource.*` settings and that MySQL is listening on the configured host/port.
- If you see JWT signature/validation errors, confirm `app.jwt.secret` matches between token issuer and verifier.
- To see SQL and Hibernate logs, `spring.jpa.show-sql=true` is already enabled in `application.properties`.

## Next steps (suggested)

- Add a `.env` or `application-dev.properties` to keep local secrets out of source control.
- Add Dockerfile and docker-compose for easy local setup (DB + app).

---

If you want, I can also add a simple `docker-compose.yml` and a small run script. Want me to do that?
