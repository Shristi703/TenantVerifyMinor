# TenantVerify - Smart Return Infrastructure Platform

A modern React application for tenant verification and property management.

## 🚀 Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Forms**: Formik + Yup
- **HTTP Client**: Axios
- **State Management**: React Query
- **Build Tool**: Vite
- **Notifications**: React Hot Toast

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Mock Data (set to 'true' to use mock data instead of API)
VITE_USE_MOCK_DATA=false
```

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your repository
5. Vercel will auto-detect Vite configuration
6. Add environment variables if needed:
   - `VITE_API_BASE_URL` - Your API base URL
   - `VITE_USE_MOCK_DATA` - Set to `true` to use mock data
7. Click "Deploy"

### Vercel Configuration

The project includes a `vercel.json` file with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`
- SPA routing rewrites (all routes serve index.html)
- Asset caching headers

## 📁 Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
│   ├── Tenant/      # Tenant-specific pages
│   └── Landlord/    # Landlord-specific pages
├── utils/          # Utilities and helpers
│   ├── api.ts       # API functions
│   ├── axiosInterceptor.ts  # Axios interceptors
│   ├── mockData.ts  # Mock data for development
│   ├── constants.ts # Constants
│   └── validationSchemas.ts # Yup schemas
└── main.tsx         # Entry point
```

## 🔑 Features

- ✅ Authentication (Login/Signup)
- ✅ Role-based access (Tenant/Landlord)
- ✅ Property listings with search & filters
- ✅ Multi-step verification request form
- ✅ File upload with drag & drop
- ✅ Real-time status updates
- ✅ Messaging system
- ✅ Settings & profile management
- ✅ Help & FAQ
- ✅ Dark mode support
- ✅ Responsive design

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Using Mock Data

Set `VITE_USE_MOCK_DATA=true` in your `.env` file to use mock data instead of API calls. This is useful for:
- Development without backend
- Testing
- Demos

### API Configuration

Set `VITE_API_BASE_URL` to your backend API URL. If not set, defaults to `http://localhost:3000/api`.

## 📄 License

MIT
