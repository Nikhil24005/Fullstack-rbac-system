# 📊 Project Overview - Visual Architecture

## 🏗️ Application Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        VITE DEV SERVER                          │
│                    (localhost:5173)                             │
└─────────────────────────────────────────────────────────────────┘
                              ▼
                    ┌──────────────────┐
                    │   React App      │
                    │   (Router)       │
                    └──────────────────┘
                      ▼        ▼        ▼
         ┌────────────┴────────┴────────┴─────────────┐
         │                                             │
    ┌────▼────┐    ┌────────┐    ┌────────┐    ┌────▼────┐
    │Register │    │ Login  │    │Dashboard   │    │ *      │
    │(Public) │    │(Public)│    │(Protected) │    │ Navbar │
    └────┬────┘    └────┬───┘    └────┬───────┘    └────┬────┘
         │              │             │                   │
         └──────────────┴─────────────┴───────────────────┘
                        ▼
              ┌─────────────────────┐
              │  AuthContext        │
              │  (State + Reducer)  │
              └─────────────────────┘
                        │
         ┌──────────────┼──────────────┐
         │              │              │
    ┌────▼────┐  ┌─────▼──────┐  ┌───▼─────┐
    │useAuth  │  │localStorage│  │sessionStorage
    │(Hook)   │  │(JWT Token) │  │(optional)
    └─────────┘  └────────────┘  └──────────┘
         │
         └─────────────────────┐
                               ▼
                    ┌──────────────────────┐
                    │  Axios Instance      │
                    │  (HTTP Client)       │
                    │  - Request Interceptor
                    │  - Response Interceptor
                    └──────────────────────┘
                               │
                        ┌──────▼──────┐
                        │  Backend API │
                        │  (Port 8080) │
                        └──────┬──────┘
         ┌──────────────────────┼──────────────────────┐
         │                      │                      │
    ┌────▼─────┐        ┌──────▼──────┐       ┌──────▼─────┐
    │/auth/... │        │ Database    │       │  JWT Verify│
    │endpoints │        │ (Users)     │       │  (Backend) │
    └──────────┘        └─────────────┘       └────────────┘
```

## 📱 Page Flow Diagram

```
Start
  │
  ├─ Unauthenticated?
  │  └─→ [/register] → Form → API Call → Success → localStorage.setToken()
  │                                              → AuthContext Update
  │                                              → [/dashboard]
  │
  ├─ [/login] → Form → API Call → Success → localStorage.setToken()
  │                                      → AuthContext Update
  │                                      → [/dashboard]
  │
  └─ Authenticated?
     ├─→ [/dashboard] (Protected)
     │   ├─ User Role?  → Show UserCard only
     │   └─ Admin Role? → Show UserCard + AdminCard
     │
     └─ Logout Click?
        ├─ localStorage.removeToken()
        ├─ AuthContext Update
        └─ [/login] ← Redirect
```

## 🔐 Authentication State Machine

```
┌─────────────────┐
│ Initial State   │
│ token: null     │
│ user: null      │
└────────┬────────┘
         │
         ├─ Register/Login Start
         │  └─→ ┌──────────────┐
         │      │ Loading      │
         │      │ state        │
         │      └──────┬───────┘
         │             │
         │             ├─ Success
         │             │  └─→ ┌──────────────────────────┐
         │             │      │ Authenticated           │
         │             │      │ token: <JWT>            │
         │             │      │ user: {name,role,...}   │
         │             │      └──────┬─────────────────┐
         │             │             │                 │
         │             │      Page Refresh     Logout
         │             │      (Restore Token)   Click
         │             │             │                 │
         │             │      ┌──────▼──┐      ┌──────▼─────┐
         │             │      │Still Auth   │      │Clear Token │
         │             │      └───────────┘      │Clear User  │
         │             │                         └──────┬─────┘
         │             │                                │
         │             └─ Error                        │
         │                └─→ ┌──────────────┐         │
         │                    │ Error State  │         │
         │                    │ Message: ??? │         │
         │                    └──────┬───────┘         │
         │                           │                 │
         │                    Retry Login          ┌───▼────────┐
         │                           │             │ Unauthenticated
         │                           └─────────────│ token: null
         │                                         │ user: null
         └─────────────────────────────────────────└────────────┘
```

## 🗂️ Component Hierarchy

```
App
├── QueryClientProvider
│   └── AuthProvider
│       └── Router
│           ├── Route: /
│           │   └── Navbar
│           │       └── Navigate to /dashboard
│           │
│           ├── Route: /register
│           │   ├── Register
│           │   │   ├── Form
│           │   │   │   ├── Input: name
│           │   │   │   ├── Input: email
│           │   │   │   ├── Input: password
│           │   │   │   ├── Select: role
│           │   │   │   └── Button: submit
│           │   │   └── Link: to /login
│           │
│           ├── Route: /login
│           │   ├── Login
│           │   │   ├── Form
│           │   │   │   ├── Input: email
│           │   │   │   ├── Input: password
│           │   │   │   └── Button: submit
│           │   │   └── Link: to /register
│           │
│           └── Route: /dashboard (Protected)
│               ├── ProtectedRoute
│               │   ├── Loader (if loading)
│               │   ├── Navbar
│               │   ├── Dashboard
│               │   │   ├── Welcome Section
│               │   │   ├── UserCard (if USER or ADMIN)
│               │   │   ├── AdminCard (if ADMIN)
│               │   │   ├── Account Info
│               │   │   └── Features List
```

## 🔀 Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interaction                         │
│         (Form Submit, Button Click, Page Load)              │
└─────────────┬───────────────────────────────────────────────┘
              ▼
      ┌──────────────────┐
      │ Event Handler    │
      │ (useForm etc)    │
      └──────────┬───────┘
                 ▼
      ┌──────────────────────┐
      │ Validation Check     │
      │ (React Hook Form)    │
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐         No
      │ Valid Input?  ────────────→ Show Error
      └──────────┬───────────┘
                 │ Yes
                 ▼
      ┌──────────────────────┐
      │ API Call via Axios   │
      │ (axiosInstance)      │
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────────────┐
      │ Request Interceptor          │
      │ (Attach JWT Token to header) │
      └──────────┬────────────────────┘
                 ▼
         ┌───────────────────┐
         │   Backend API     │
         └─────────┬─────────┘
                   ▼
      ┌────────────────────────────┐
      │ Response Interceptor       │
      │ Handle 401, etc            │
      └──────────┬─────────────────┘
                 ▼
      ┌────────────────────────────┐
      │ Success?                   │
      └──────────┬────────────┬────┘
                 │            │
              Yes│            │ No (401)
                 ▼            ▼
      ┌──────────────────┐  ┌──────────────────┐
      │ Dispatch Action  │  │ Logout           │
      │ to AuthContext   │  │ Clear Storage    │
      └──────────┬───────┘  │ Redirect /login  │
                 ▼          └──────────────────┘
      ┌──────────────────────┐
      │ Update Auth State    │
      │ (user, token)        │
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐
      │ Re-render Components │
      │ (via Context)        │
      └──────────┬───────────┘
                 ▼
      ┌──────────────────────┐
      │ Show Result to User  │
      │ or Redirect          │
      └──────────────────────┘
```

## 🔌 API Integration Points

```
Frontend                    Axios Interceptor           Backend
  │                              │                        │
  ├─ POST /auth/register        │                        │
  │───────────────────────────────────────────────────────>
  │                              │ Request Headers:      │
  │                              │ Authorization: Bearer  │
  │                              │ (if exists)           │
  │                                                       ├─ Validate Input
  │                                                       ├─ Hash Password
  │                                                       ├─ Create User
  │                                                       ├─ Generate JWT
  │<───────────────────────────────────────────────────────
  │                              │ Response:              │
  │                              │ {token, user}          │
  │
  │ Store Token & User in LocalStorage
  │ Update AuthContext
  │ Redirect to Dashboard
  │
  ├─ GET /api/endpoint          │                        │
  │───────────────────────────────────────────────────────>
  │                              │ Headers:              │
  │                              │ Authorization:        │
  │                              │ "Bearer <token>"      │
  │                                                       ├─ Verify Token
  │                                                       ├─ Fetch Data
  │<───────────────────────────────────────────────────────
  │                              │ Response Data          │
  │
  ├─ POST /auth/logout          │                        │
  │───────────────────────────────────────────────────────>
  │                                                       ├─ Clear Session
  │<───────────────────────────────────────────────────────
  │
  │ Clear LocalStorage
  │ Update AuthContext
  │ Redirect to Login
```

## 📊 State Management Flow

```
┌──────────────────────────────────────────────────────────────┐
│                      AuthContext                             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │               Initial State                           │  │
│  │  {                                                    │  │
│  │    user: null,           // from localStorage        │  │
│  │    token: null,          // from localStorage        │  │
│  │    isLoading: false,     // during auth ops         │  │
│  │    error: null,          // error message           │  │
│  │    isAuthenticated: false // computed               │  │
│  │  }                                                   │  │
│  └────────────────────────────────────────────────────────┘  │
│                              │                               │
│         ┌────────────────────┼────────────────────┐          │
│         │                    │                    │          │
│    ┌────▼────┐      ┌────────▼─────┐      ┌──────▼────┐    │
│    │register()│      │login()       │      │logout()   │    │
│    └─────┬────┘      └───────┬──────┘      └─────┬─────┘    │
│          │                   │                    │          │
│    Dispatch           Dispatch              Dispatch         │
│    LOGIN_START        LOGIN_START           LOGOUT           │
│          │                   │                    │          │
│          ▼                   ▼                    ▼          │
│    ┌────────────────────────────────────────────────────┐   │
│    │         Reducer Function                           │   │
│    │                                                    │   │
│    │  case 'LOGIN_START':                             │   │
│    │    return {...state, isLoading: true}            │   │
│    │                                                    │   │
│    │  case 'LOGIN_SUCCESS':                           │   │
│    │    return {user, token, isLoading: false, ...}   │   │
│    │                                                    │   │
│    │  case 'LOGIN_ERROR':                             │   │
│    │    return {...state, error, isLoading: false}    │   │
│    │                                                    │   │
│    │  case 'LOGOUT':                                  │   │
│    │    return {user: null, token: null, ...}         │   │
│    └────────────────────────────────────────────────────┘   │
│                              │                               │
│                              ▼                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Updated State                             │   │
│  │  {user: {...}, token: "...", isLoading: false, ...} │   │
│  └──────────────────────────────────────────────────────┘   │
│                              │                               │
│              ┌───────────────┴───────────────┐               │
│              │                               │               │
│    ┌─────────▼────────┐          ┌──────────▼─────┐        │
│    │ useAuth() Hook   │          │ Components Re- │        │
│    │ in Components    │          │ render with    │        │
│    │ can access all   │          │ new state      │        │
│    │ state & methods  │          │ values         │        │
│    └──────────────────┘          └────────────────┘        │
└──────────────────────────────────────────────────────────────┘
```

## 🎯 Form Validation Pipeline

```
User Input
    │
    ▼
┌─────────────────────────────────────┐
│ React Hook Form Validation          │
│ (Client-side)                       │
│                                     │
│ ├─ Required Fields                 │
│ ├─ Min/Max Length                  │
│ ├─ Pattern Matching (email)        │
│ ├─ Custom Validation               │
│ │  ├─ Password strength            │
│ │  ├─ Password confirmation        │
│ │  └─ Email format                 │
│ └─ Real-time error display         │
└────────┬────────────────────────────┘
         │
    Valid│    Invalid
         │        │
         │        └─→ Show Error Message
         │             (Clear on next valid input)
         │
         ▼
┌─────────────────────────────────────┐
│ Enable Submit Button                │
│ (Only when all valid)               │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│ Send to Backend                     │
│ (Server-side validation)            │
└────────┬────────────────────────────┘
         │
    Success│    Error
         │        │
         │        └─→ Show Error Alert
         │             (Email exists, etc)
         │
         ▼
┌─────────────────────────────────────┐
│ Success Response                    │
│ ├─ Store Token                      │
│ ├─ Update State                     │
│ └─ Redirect to Dashboard            │
└─────────────────────────────────────┘
```

## 🌐 Responsive Breakpoints

```
Mobile                  Tablet                  Desktop
(<768px)               (768px-1024px)          (>1024px)

┌──────────┐        ┌────────────────┐      ┌─────────────────┐
│ Navbar   │        │    Navbar      │      │     Navbar      │
│ ─────    │        │    ─────────── │      │  ─────────────  │
│ Logo     │        │  Logo + User   │      │ Logo + Nav+User │
│ User(v)  │        │    Info        │      │      Info       │
│ Logout(v)│        │  Logout Button │      │   Logout Button │
└──────────┘        └────────────────┘      └─────────────────┘

┌──────────┐        ┌────────────────┐      ┌─────────────────┐
│          │        │                │      │                 │
│Dashboard │        │  Dashboard     │      │    Dashboard    │
│ Title    │        │   Title        │      │     Title       │
│          │        │                │      │                 │
│ Cards    │        │    Cards       │      │   Cards Grid    │
│ Stack    │        │  (1-2 cols)    │      │  (2+ cols)      │
│ 100%     │        │                │      │                 │
│          │        │                │      │                 │
│ User     │        │ User + Admin    │      │ User + Admin    │
│ Card     │        │ Cards          │      │ Cards Side-by   │
│ (full)   │        │ (side-by)      │      │ -side           │
│          │        │                │      │                 │
│ Admin    │        │ Info Section   │      │ Info Grid       │
│ Card     │        │ (3 cols)       │      │ (3+ cols)       │
│ (full)   │        │                │      │                 │
│          │        │ Features       │      │ Features (2col) │
│ Info     │        │ (2 cols)       │      │                 │
│ Stacked  │        │                │      │                 │
│          │        │                │      │                 │
└──────────┘        └────────────────┘      └─────────────────┘
```

---

This visual architecture helps understand how all pieces connect to form a complete authentication system.
