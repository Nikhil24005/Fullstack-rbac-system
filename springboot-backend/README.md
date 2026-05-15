# Auth API

Production-style Spring Boot 3 backend using Java 25 and Maven.

## Stack
- Spring Boot 3
- Spring Security
- JWT with `io.jsonwebtoken`
- Spring Data JPA
- MySQL
- Swagger/OpenAPI
- MapStruct
- Bean Validation

## Run
1. Create a MySQL database named `auth_api`.
2. Update `src/main/resources/application.properties` with your database credentials.
3. Run the app with Maven:
   ```bash
   mvn spring-boot:run
   ```

## API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/public`
- `GET /api/user`
- `GET /api/admin`

## Major Classes
- `AuthApiApplication` starts the Spring Boot application.
- `User` stores the database user record with name, email, password, and role.
- `Role` defines the `USER` and `ADMIN` roles.
- `RegisterRequestDto`, `LoginRequestDto`, `AuthResponseDto`, `UserResponseDto` keep request/response contracts separate from entities.
- `UserMapper` converts between entity and DTO objects using MapStruct.
- `UserRepository` handles persistence and email lookups.
- `AuthServiceImpl` handles registration and login, password hashing, and JWT creation.
- `JwtService` generates tokens, extracts usernames, validates signatures, and checks expiration.
- `JwtAuthenticationFilter` reads the bearer token from each request and restores the authenticated user.
- `SecurityConfig` configures stateless authentication, RBAC, password encoding, and filter-chain rules.
- `AuthController` exposes authentication endpoints.
- `SampleController` exposes public, user, and admin-only endpoints.
- `GlobalExceptionHandler` formats validation and API errors into consistent JSON responses.
- `OpenApiConfig` configures Swagger UI and bearer authentication metadata.

## Access Rules
- `/api/public` is open to everyone.
- `/api/user` is available to `USER` and `ADMIN`.
- `/api/admin` is available only to `ADMIN`.

## Notes
- JWTs are stateless and expire based on `app.jwt.expiration-ms`.
- Passwords are hashed with `BCryptPasswordEncoder` before storage.
- Swagger UI is available at `/swagger-ui.html`.
