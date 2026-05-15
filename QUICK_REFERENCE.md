# Quick Reference

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Files you will use most

- [src/context/AuthContext.tsx](src/context/AuthContext.tsx) for auth state.
- [src/hooks/useAuth.ts](src/hooks/useAuth.ts) to read auth state.
- [src/api/axiosInstance.ts](src/api/axiosInstance.ts) for HTTP calls.
- [src/pages/Login.tsx](src/pages/Login.tsx) for login.
- [src/pages/Register.tsx](src/pages/Register.tsx) for register.
- [src/pages/Dashboard.tsx](src/pages/Dashboard.tsx) for the protected page.
- [src/routes/AppRoutes.tsx](src/routes/AppRoutes.tsx) for route setup.

## Routes

| Route | Access |
|---|---|
| `/` | Redirects to dashboard |
| `/login` | Public |
| `/register` | Public |
| `/dashboard` | Protected |

## Auth state shape

```ts
{
  user,
  token,
  isLoading,
  error,
  register,
  login,
  logout,
  isAuthenticated
}
```

## Password rules

- At least 8 characters
- One uppercase letter
- One lowercase letter
- One number

## Common flow

1. Register or login.
2. The backend returns a token and user.
3. The app stores both in `localStorage`.
4. The dashboard opens.
5. Logout clears the session.

## Common issues

- If the dashboard does not open, check whether the token is still in `localStorage`.
- If API calls fail with 401, log out and log back in.
- If styles look broken, restart the dev server.

## Backend endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`
- `GET /api/dashboard/summary`
5. Review API interceptor setup
6. Understand form validation
7. Study responsive TailwindCSS classes

---

**Keep this guide handy for quick reference!**
