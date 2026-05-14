# React + TypeScript Frontend with JWT Authentication

A modern, feature-rich authentication frontend built with React 18, TypeScript, Vite, and TailwindCSS. Includes JWT-based authentication, role-based access control, protected routes, and a responsive dashboard.

## ✨ Features

### Authentication
- 🔐 **JWT-based Authentication**: Secure token-based authentication system
- 💾 **localStorage Persistence**: JWT tokens stored securely in browser storage
- ✅ **Form Validation**: Comprehensive client-side validation using React Hook Form
- 🔒 **Password Requirements**: Strong password validation (8+ chars, uppercase, lowercase, numbers)

### Authorization & Routing
- 🛡️ **Protected Routes**: Dashboard only accessible to authenticated users
- 👥 **Role-Based Access Control**: Different content for USER and ADMIN roles
- 🎯 **Automatic Redirects**: Unauthenticated users redirected to login
- 📱 **Route Guards**: Protected route wrapper component

### User Interface
- 🎨 **TailwindCSS Styling**: Modern, professional design system
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- 🌈 **Gradient Backgrounds**: Beautiful gradient-based UI
- ⚡ **Loading States**: Smooth loading spinner during async operations
- 🎯 **Error Handling**: User-friendly error messages and alerts

### API Integration
- 🔌 **Axios Instance**: Pre-configured HTTP client with interceptors
- 🎫 **Token Injection**: Automatic JWT token attachment to requests
- 🔄 **Request Interceptors**: Handles request configuration and JWT injection
- 🚨 **Response Interceptors**: Auto-logout on token expiration (401)

### Data Management
- ⚙️ **React Query**: Server state management (TanStack React Query)
- 🧠 **React Context**: Local auth state management
- 📊 **useReducer**: Predictable state updates

### Developer Experience
- 📘 **TypeScript**: Full type safety and IDE support
- 🔧 **Vite**: Lightning-fast build tool and dev server
- 🧪 **Component Structure**: Organized, modular component architecture
- 📚 **Custom Hooks**: Reusable authentication hook

## 📁 Project Structure

```
src/
├── api/
│   └── axiosInstance.ts      # Axios config with JWT interceptor
├── components/
│   ├── Navbar.tsx             # Navigation component
│   ├── Loader.tsx             # Loading spinner
│   ├── UserCard.tsx           # User role content card
│   ├── AdminCard.tsx          # Admin role content card
│   └── ProtectedRoute.tsx     # (in routes/) Protected route wrapper
├── context/
│   └── AuthContext.tsx        # Authentication state management
├── hooks/
│   └── useAuth.ts             # Custom hook for auth state
├── pages/
│   ├── Register.tsx           # Registration page
│   ├── Login.tsx              # Login page
│   └── Dashboard.tsx          # Protected dashboard
├── routes/
│   ├── routes.tsx             # Route definitions
│   └── ProtectedRoute.tsx     # Protected route component
├── services/
│   └── authService.ts         # API service methods
├── types/
│   └── auth.ts                # TypeScript interfaces
├── App.tsx                    # Main app component
├── main.tsx                   # Application entry point
└── index.css                  # Tailwind styles
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Backend API server running on `http://localhost:8080`

### Installation

1. **Clone and setup the project:**
```bash
cd c:\Coding\Assignment
npm install
```

2. **Configure environment variables:**
```bash
# Copy .env.example to .env (optional)
# Default: http://localhost:8080/api
cp .env.example .env
```

3. **Update .env if needed:**
```env
VITE_API_URL=http://your-backend-url/api
```

### Development

**Start the development server:**
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite default)

**Build for production:**
```bash
npm run build
```

**Preview production build:**
```bash
npm run preview
```

## 🔐 Authentication Flow

### Registration
1. User fills registration form with name, email, password, and role
2. Password validation: min 8 chars, uppercase, lowercase, numbers
3. API call to `POST /api/auth/register`
4. Server returns JWT token and user data
5. Token and user stored in localStorage
6. User redirected to dashboard

### Login
1. User enters email and password
2. API call to `POST /api/auth/login`
3. Server returns JWT token and user data
4. Token and user stored in localStorage
5. Axios interceptor automatically attaches token to requests
6. User redirected to dashboard

### Logout
1. User clicks logout button
2. Token and user data removed from localStorage
3. Axios interceptor clears token
4. User redirected to login page

## 🛡️ Protected Routes

The `ProtectedRoute` component wraps protected pages:

```tsx
<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Behavior:**
- Shows loading spinner while checking auth status
- Redirects to `/login` if not authenticated
- Allows access if authenticated

## 👥 Role-Based Access Control

### User Content
- Visible to `USER` role
- Shows user information card with available features
- Basic user-level features

### Admin Content
- Visible to `ADMIN` role only
- Shows admin information card with admin privileges
- Admin-only features and management options

### Rendering Logic
```tsx
// USER role sees user card only
{user?.role === 'USER' ? <UserCard /> : null}

// ADMIN role sees both cards
{user?.role === 'ADMIN' ? (
  <>
    <UserCard />
    <AdminCard />
  </>
) : null}
```

## 🔗 API Integration

### Axios Interceptors

**Request Interceptor:**
- Automatically attaches JWT token to `Authorization` header
- Format: `Authorization: Bearer <token>`

**Response Interceptor:**
- Handles 401 Unauthorized responses
- Clears stored token and user data
- Redirects to login page

### API Service

```typescript
// src/services/authService.ts
export const authService = {
  register(data: RegisterRequest): Promise<AuthResponse>
  login(data: LoginRequest): Promise<AuthResponse>
  logout(): Promise<void>
  getCurrentUser(): Promise<User>
}
```

## 📋 Form Validation

### Registration Form
- **Name**: Required, min 2 characters
- **Email**: Required, valid email format
- **Password**: 
  - Required
  - Minimum 8 characters
  - Must include uppercase letters
  - Must include lowercase letters
  - Must include numbers
- **Role**: Required (USER or ADMIN)

### Login Form
- **Email**: Required, valid email format
- **Password**: Required, min 8 characters

## 🎨 Styling with TailwindCSS

The project uses TailwindCSS for responsive, utility-first styling:

- **Color scheme**: Blue/Indigo theme with gradients
- **Responsive breakpoints**: Mobile-first design
- **Custom components**: Buttons, cards, forms with consistent styling
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: Semantic HTML and ARIA attributes

## 🧰 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Framework** | React 18.3 |
| **Language** | TypeScript 5.7 |
| **Build Tool** | Vite 6.0 |
| **Styling** | TailwindCSS 3.4 |
| **Routing** | React Router 6.28 |
| **Forms** | React Hook Form 7.54 |
| **HTTP Client** | Axios 1.7 |
| **State Management** | React Context + useReducer |
| **Server State** | TanStack React Query 5.62 |
| **Package Manager** | npm |

## 📝 API Endpoints Expected

The backend should provide these endpoints:

```
POST /api/auth/register
  Request: { name, email, password, role }
  Response: { token, user }

POST /api/auth/login
  Request: { email, password }
  Response: { token, user }

POST /api/auth/logout
  Response: { message }

GET /api/auth/me
  Headers: { Authorization: Bearer <token> }
  Response: { user }
```

## 🔍 Key Components & Hooks

### useAuth Hook
```typescript
const {
  user,           // Current authenticated user
  token,          // JWT token
  isLoading,      // Loading state
  error,          // Error message if any
  register,       // Register function
  login,          // Login function
  logout,         // Logout function
  isAuthenticated // Boolean auth status
} = useAuth();
```

### AuthContext
Provides authentication state and methods to entire app. Automatically restores session from localStorage on mount.

### ProtectedRoute
Checks authentication status before rendering protected content. Shows loader while checking, redirects if not authenticated.

## 🚨 Error Handling

- Form validation errors displayed inline
- API errors displayed in error alerts
- Automatic logout on token expiration
- Graceful handling of network errors

## 📱 Responsive Design

- **Mobile**: Single column layout, optimized touch targets
- **Tablet**: Two-column layout where appropriate
- **Desktop**: Full multi-column responsive grid
- All components scale smoothly between breakpoints

## 🔒 Security Considerations

✅ **Implemented:**
- JWT token storage in localStorage
- Automatic token injection via Axios interceptor
- Token expiration handling (401 response)
- Password strength validation
- Form input validation
- Protected route guards

⚠️ **Note:**
- Always use HTTPS in production
- Implement CSRF protection on backend
- Consider implementing refresh token rotation
- Use secure, HTTP-only cookies for production (requires backend changes)

## 🧪 Testing

To test authentication:

1. **Register**: Fill form and create account
2. **Login**: Use registered credentials
3. **Dashboard**: View role-based content
4. **Logout**: Clear session and redirect
5. **Protected Routes**: Try accessing without authentication

## 📚 Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.1",
  "@tanstack/react-query": "^5.62.16",
  "axios": "^1.7.9",
  "react-hook-form": "^7.54.2",
  "tailwindcss": "^3.4.17"
}
```

## 🤝 Contributing

1. Follow the established component structure
2. Use TypeScript for type safety
3. Maintain consistent styling with TailwindCSS
4. Add proper error handling
5. Write descriptive commit messages

## 📄 License

This project is provided as-is for educational and development purposes.

## 🆘 Troubleshooting

### "Cannot find module" errors
```bash
npm install
```

### Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Styling not working
- Check TailwindCSS config
- Verify `index.css` is imported in `main.tsx`
- Clear browser cache

### API requests failing
- Verify backend is running on correct port
- Check `VITE_API_URL` environment variable
- Verify CORS is configured on backend

### Token not persisting
- Check browser localStorage is enabled
- Verify token is being stored correctly
- Check browser's private/incognito mode limitations

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the API endpoint requirements
3. Verify backend implementation matches expected API
4. Check browser console for errors

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
#   F u l l s t a c k - r b a c - s y s t e m  
 