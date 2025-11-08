import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Plus, Eye, Edit, Trash2, FileText } from 'lucide-react'
import { tenantAPI } from '../../utils/api'
import StatusBadge from '../../../components/StatusBadge'
import toast from 'react-hot-toast'

export default function RequestsList() {
  const { data: requests, isLoading, refetch } = useQuery(
    'tenantRequests',
    () => tenantAPI.getRequests(),
    {
      onError: (error: any) => {
        toast.error(error.message || 'Failed to load requests')
      },
    }
  )

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this request?')) {
      return
    }

    try {
      await tenantAPI.deleteRequest(id)
      toast.success('Request deleted successfully')
      refetch()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete request')
    }
  }

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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-2">
              My Requests
            </h1>
            <p className="text-encora-text/70 dark:text-white/70">
              View and manage your verification requests
            </p>
          </div>
          <Link
            to="/tenant/request/new"
            className="flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Plus size={20} />
            New Request
          </Link>
        </div>

        {/* Requests List */}
        {requests && requests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {requests.map((request: any) => (
              <div
                key={request.id}
                className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-xl shadow-lg border border-encora-mint/20 dark:border-encora-mint/30 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-encora-text dark:text-white mb-1">
                      {request.propertyName || 'Property Request'}
                    </h3>
                    <p className="text-sm text-encora-text/60 dark:text-white/60">
                      {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>

                <div className="mb-4">
                  <p className="text-sm text-encora-text dark:text-white mb-2">
                    <span className="font-semibold">Address:</span> {request.address}
                  </p>
                  {request.moveInDate && (
                    <p className="text-sm text-encora-text dark:text-white">
                      <span className="font-semibold">Move-in Date:</span>{' '}
                      {new Date(request.moveInDate).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-encora-green/10 dark:border-white/10">
                  <Link
                    to={`/tenant/request/${request.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-encora-gray dark:bg-encora-green/50 text-encora-text dark:text-white rounded-lg hover:bg-encora-green/10 dark:hover:bg-encora-mint/10 transition-colors"
                  >
                    <Eye size={16} />
                    View
                  </Link>
                  {request.status === 'submitted' && (
                    <Link
                      to={`/tenant/request/${request.id}/edit`}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-encora-green/10 dark:bg-encora-mint/20 text-encora-green dark:text-encora-mint rounded-lg hover:bg-encora-green/20 dark:hover:bg-encora-mint/30 transition-colors"
                    >
                      <Edit size={16} />
                      Edit
                    </Link>
                  )}
                  {request.status === 'submitted' && (
                    <button
                      onClick={() => handleDelete(request.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-xl shadow-lg border border-encora-mint/20 dark:border-encora-mint/30 p-12 text-center">
            <FileText className="mx-auto mb-4 text-encora-green/50 dark:text-encora-mint/50" size={48} />
            <h3 className="text-xl font-semibold text-encora-text dark:text-white mb-2">
              No requests yet
            </h3>
            <p className="text-encora-text/60 dark:text-white/60 mb-6">
              Create your first verification request to get started
            </p>
            <Link
              to="/tenant/request/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300"
            >
              <Plus size={20} />
              Create New Request
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

