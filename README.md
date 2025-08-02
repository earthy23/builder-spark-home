# UEC Launcher - Complete Eaglercraft Gaming Platform

A modern, full-featured Eaglercraft HTML5 gaming platform with authentication, social features, admin panel, and real-time chat.

## 🎮 Features

### **Frontend (React + TypeScript)**

- ✅ **Modern UI/UX** - Black & white theme with Minecraft landscape background
- ✅ **Authentication System** - Login, register, role-based access
- ✅ **Game Launcher** - Multiple Eaglercraft clients with quick launch
- ✅ **Social Features** - Friends system, direct messages, chat
- ✅ **Admin Panel** - Complete administrative interface
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### **Backend (Node.js + TypeScript)**

- ✅ **RESTful API** - Complete authentication and user management
- ✅ **Real-time Chat** - Socket.io for instant messaging
- ✅ **PostgreSQL Database** - Prisma ORM with full schema
- ✅ **JWT Authentication** - Secure token-based auth with refresh tokens
- ✅ **Role-based Access** - Member, VIP, VIP+, Mod, Admin roles
- ✅ **Security Features** - Rate limiting, CORS, validation, encryption
- ✅ **Redis Caching** - Session management and performance optimization

## 🚀 Quick Start

### **Prerequisites**

- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- npm or yarn

### **1. Clone & Install**

```bash
git clone <repository-url>
cd uec-launcher

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### **2. Environment Setup**

**Frontend (.env):**

```bash
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

**Backend (.env):**

```bash
# Copy from backend/.env.example and configure
cp .env.example .env

# Required variables:
DATABASE_URL="postgresql://username:password@localhost:5432/uec_launcher"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret-key"
REDIS_URL="redis://localhost:6379"
```

### **3. Database Setup**

```bash
cd backend

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed database with default admin
npm run db:seed
```

### **4. Start Development**

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
npm run dev
```

**Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- Admin Panel: http://localhost:3000/admin

### **5. Default Login Credentials**

```
Admin Account:
- Username: admin
- Password: admin123

Demo User:
- Username: steve_builder
- Password: demo123
```

## 📁 Project Structure

```
uec-launcher/
├── client/                    # React frontend
│   ├── components/           # Reusable components
│   │   ├── ui/              # UI component library
│   │   ├── Layout.tsx       # Main layout
│   │   └── AdminLayout.tsx  # Admin panel layout
│   ├── contexts/            # React contexts
│   ├── pages/               # Route pages
│   │   ├── auth/           # Authentication pages
│   │   ├── admin/          # Admin panel pages
│   │   └── ...             # Other pages
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions
├── backend/                  # Node.js backend
│   ├── src/
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Express middleware
│   │   ├── lib/           # Core utilities
│   │   ├── sockets/       # Socket.io handlers
│   │   └── index.ts       # Server entry point
│   ├── prisma/            # Database schema & migrations
│   └── package.json       # Backend dependencies
├── public/                  # Static assets
│   ├── client/             # Eaglercraft game clients
│   └── background-placeholder.svg # Fallback background
└── README.md               # This file
```

## 🗄️ Database Schema

### **Core Tables**

- **users** - User accounts, profiles, roles
- **friendships** - Friend relationships
- **friend_requests** - Pending friend requests
- **conversations** - Chat conversations (DM/group)
- **messages** - Chat messages
- **game_clients** - Available Eaglercraft clients
- **game_sessions** - Player gaming sessions
- **tickets** - Support ticket system
- **moderation_logs** - Admin action history
- **user_analytics** - Usage statistics

### **User Roles**

- **MEMBER** - Default user role
- **VIP** - Premium member
- **VIP_PLUS** - Premium+ member
- **MOD** - Moderator
- **ADMIN** - Administrator

## 🔧 API Endpoints

### **Authentication**

```
POST /api/auth/register      # User registration
POST /api/auth/login         # User login
POST /api/auth/refresh       # Refresh access token
POST /api/auth/logout        # Logout user
GET  /api/auth/me           # Get current user
```

### **User Management**

```
GET    /api/users/profile/:id    # Get user profile
PUT    /api/users/profile        # Update profile
GET    /api/users/search         # Search users
POST   /api/users/avatar         # Upload avatar
```

### **Friends System**

```
GET    /api/friends              # Get friends list
POST   /api/friends/request      # Send friend request
PUT    /api/friends/accept/:id   # Accept friend request
DELETE /api/friends/:id          # Remove friend
```

### **Chat System**

```
GET    /api/chat/conversations   # Get conversations
POST   /api/chat/message         # Send message
GET    /api/chat/history/:id     # Get chat history
```

### **Game Management**

```
GET    /api/games/clients        # Get available clients
POST   /api/games/session        # Start game session
PUT    /api/games/session/:id    # End game session
```

### **Admin Panel**

```
GET    /api/admin/users          # Manage users
POST   /api/admin/ban            # Ban user
GET    /api/admin/analytics      # System analytics
GET    /api/admin/tickets        # Support tickets
```

## 🌐 Production Deployment

### **Environment Variables**

Set these in production:

```bash
NODE_ENV=production
DATABASE_URL=<production-postgres-url>
REDIS_URL=<production-redis-url>
JWT_SECRET=<strong-secret-key>
CORS_ORIGIN=<your-domain>
```

### **Build & Deploy**

**Frontend:**

```bash
npm run build
# Deploy dist/ folder to your hosting service
```

**Backend:**

```bash
cd backend
npm run build
npm start
# Or use PM2: pm2 start dist/index.js
```

### **Deployment Options**

**Frontend:**

- **Netlify** - Connect Netlify MCP for automatic deployment
- **Vercel** - Connect Vercel MCP for seamless hosting
- **Static hosting** - Any CDN/static host (AWS S3, Cloudflare Pages)

**Backend:**

- **Railway** - Easy Node.js hosting with database
- **Heroku** - Classic PaaS with add-ons
- **AWS/GCP/Azure** - Cloud platforms with managed services
- **VPS** - Any Linux server with PM2

**Database:**

- **Neon** - Serverless PostgreSQL (connect Neon MCP)
- **Supabase** - PostgreSQL with auth (connect Supabase MCP)
- **PlanetScale** - MySQL-compatible serverless
- **Managed PostgreSQL** - AWS RDS, GCP Cloud SQL, etc.

## 🔌 Backend Integration

The frontend is **fully prepared** for backend integration:

### **Authentication Context**

```typescript
// Already implemented in client/contexts/AuthContext.tsx
const { user, login, logout, loading } = useAuth();
```

### **API Layer**

```typescript
// Update client/lib/api.ts with your backend URL
const API_BASE = process.env.VITE_API_URL || "http://localhost:5000/api";
```

### **Socket.io Integration**

```typescript
// Real-time chat ready for WebSocket connection
// Update socket configuration in chat components
```

### **Environment Configuration**

```bash
# Frontend .env
VITE_API_URL=https://your-backend-api.com/api
VITE_SOCKET_URL=https://your-backend-api.com

# Backend .env
CORS_ORIGIN=https://your-frontend-domain.com
DATABASE_URL=postgresql://user:pass@host:5432/dbname
```

## 🛠️ Development

### **Adding New Features**

1. **Frontend**: Add components in `client/components/`
2. **Backend**: Add routes in `backend/src/routes/`
3. **Database**: Update `backend/prisma/schema.prisma`
4. **Types**: Add TypeScript interfaces

### **Testing**

```bash
# Backend tests
cd backend
npm test

# Frontend tests
npm test
```

### **Code Quality**

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Formatting
npm run format
```

## 📦 Available MCP Integrations

Connect these integrations through the [MCP Servers button](#open-mcp-popover):

- **Supabase** - Database and authentication
- **Netlify** - Frontend deployment and hosting
- **Vercel** - Full-stack deployment
- **Neon** - Serverless PostgreSQL database
- **Linear** - Project management and issue tracking
- **Sentry** - Error monitoring and debugging
- **Builder.io CMS** - Content management

## 🎯 Roadmap

### **Phase 1: Core Features** ✅

- Authentication system
- Game launcher interface
- Basic admin panel
- Friend system foundation

### **Phase 2: Backend Integration** ✅

- Complete REST API
- Real-time chat with Socket.io
- Database schema and migrations
- Security and validation

### **Phase 3: Enhanced Features** 🚧

- Email verification system
- Advanced moderation tools
- Voice chat integration
- Mobile app (React Native)

### **Phase 4: Scaling** 📋

- Microservices architecture
- Kubernetes deployment
- CDN integration
- Advanced analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Documentation**: Check this README and code comments
- **Issues**: Open GitHub issues for bugs
- **Feature Requests**: Use GitHub discussions
- **Security**: Email security@ueclauncher.com

---

**Ready to launch!** 🚀 Your UEC Launcher is production-ready with a complete backend, modern frontend, and deployment options.
