import { Link } from 'react-router-dom'
import { ROUTES } from '../utils/constants'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to={ROUTES.TENANT.DASHBOARD}
            className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-2xl font-bold text-encora-green dark:text-white mb-4">Tenant Dashboard</h2>
            <p className="text-encora-text dark:text-white/80">View and manage your tenant requests</p>
          </Link>

          <Link
            to={ROUTES.LANDLORD.DASHBOARD}
            className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <h2 className="text-2xl font-bold text-encora-green dark:text-white mb-4">Landlord Dashboard</h2>
            <p className="text-encora-text dark:text-white/80">View and manage property requests</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
