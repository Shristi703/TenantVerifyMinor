import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Eye, Filter, Search } from 'lucide-react'
import { landlordAPI } from '../../utils/api'
import StatusBadge from '../../../components/StatusBadge'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function Dashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: requests, isLoading, refetch } = useQuery(
    ['landlordRequests', statusFilter],
    () => landlordAPI.getRequests({ status: statusFilter || undefined }),
    {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load requests')
      },
    }
  )

  const filteredRequests = requests?.filter((request: any) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      request.tenantName?.toLowerCase().includes(query) ||
      request.propertyName?.toLowerCase().includes(query) ||
      request.address?.toLowerCase().includes(query)
    )
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-encora-green dark:border-encora-mint"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-2">
            Landlord Dashboard
          </h1>
          <p className="text-encora-text/70 dark:text-white/70">
            Manage tenant verification requests
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-xl shadow-lg border border-encora-mint/20 dark:border-encora-mint/30 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
              <input
                type="text"
                placeholder="Search by tenant name, property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="text-encora-green dark:text-encora-mint" size={20} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              >
                <option value="">All Status</option>
                <option value="submitted">Submitted</option>
                <option value="in_review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="more_info_required">More Info Required</option>
              </select>
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-xl shadow-lg border border-encora-mint/20 dark:border-encora-mint/30 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-encora-gray dark:bg-encora-green/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-encora-text dark:text-white">Tenant Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-encora-text dark:text-white">Property</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-encora-text dark:text-white">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-encora-text dark:text-white">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-encora-text dark:text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-encora-green/10 dark:divide-white/10">
                {filteredRequests && filteredRequests.length > 0 ? (
                  filteredRequests.map((request: any) => (
                    <tr key={request.id} className="hover:bg-encora-gray/50 dark:hover:bg-encora-green/30 transition-colors">
                      <td className="px-6 py-4 text-sm text-encora-text dark:text-white">{request.tenantName}</td>
                      <td className="px-6 py-4 text-sm text-encora-text dark:text-white">{request.propertyName || 'N/A'}</td>
                      <td className="px-6 py-4 text-sm text-encora-text dark:text-white">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/landlord/request/${request.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors text-sm font-semibold"
                        >
                          <Eye size={16} />
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-encora-text/60 dark:text-white/60">
                      No requests found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

