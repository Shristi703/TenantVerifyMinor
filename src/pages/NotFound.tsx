import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-encora-green dark:text-encora-mint mb-4">404</h1>
          <h2 className="text-4xl font-bold text-encora-text dark:text-white mb-4">Page Not Found</h2>
          <p className="text-lg text-encora-text/70 dark:text-white/70 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
          >
            <Home size={20} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 border border-encora-green dark:border-encora-mint text-encora-green dark:text-encora-mint rounded-lg font-semibold hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

