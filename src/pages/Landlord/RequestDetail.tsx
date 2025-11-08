import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useParams, useNavigate } from 'react-router-dom'
import { CheckCircle, XCircle, MessageSquare, Download, ArrowLeft } from 'lucide-react'
import { landlordAPI } from '../../utils/api'
import StatusBadge from '../../../components/StatusBadge'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function RequestDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false)
  const [moreInfoMessage, setMoreInfoMessage] = useState('')

  const { data: request, isLoading } = useQuery(
    ['landlordRequest', id],
    () => landlordAPI.getRequestDetail(id!),
    {
      enabled: !!id,
    }
  )

  const [showApproveModal, setShowApproveModal] = useState(false)

  const approveMutation = useMutation(
    () => landlordAPI.approveRequest(id!),
    {
      onSuccess: () => {
        toast.success('Request approved successfully')
        setShowApproveModal(false)
        queryClient.invalidateQueries(['landlordRequest', id])
        queryClient.invalidateQueries('landlordRequests')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to approve request')
      },
    }
  )

  const rejectMutation = useMutation(
    () => landlordAPI.rejectRequest(id!, rejectReason),
    {
      onSuccess: () => {
        toast.success('Request rejected')
        setShowRejectModal(false)
        setRejectReason('')
        queryClient.invalidateQueries(['landlordRequest', id])
        queryClient.invalidateQueries('landlordRequests')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to reject request')
      },
    }
  )

  const moreInfoMutation = useMutation(
    () => landlordAPI.requestMoreInfo(id!, moreInfoMessage),
    {
      onSuccess: () => {
        toast.success('Request for more info sent')
        setShowMoreInfoModal(false)
        setMoreInfoMessage('')
        queryClient.invalidateQueries(['landlordRequest', id])
        queryClient.invalidateQueries('landlordRequests')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to send request')
      },
    }
  )

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-encora-green dark:border-encora-mint"></div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-encora-text dark:text-white">Request not found</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/landlord/dashboard')}
          className="flex items-center gap-2 text-encora-green dark:text-encora-mint mb-6 hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-encora-text dark:text-white mb-2">
                {request.tenantName}
              </h1>
              <StatusBadge status={request.status} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Email</h3>
              <p className="text-encora-text dark:text-white">{request.email}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Phone</h3>
              <p className="text-encora-text dark:text-white">{request.phone}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Address</h3>
              <p className="text-encora-text dark:text-white">{request.address}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Move-in Date</h3>
              <p className="text-encora-text dark:text-white">
                {new Date(request.moveInDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Documents */}
          {request.documents && request.documents.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-encora-text dark:text-white mb-4">Documents</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {request.documents.map((doc: any, index: number) => (
                  <a
                    key={index}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-4 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors"
                  >
                    <Download size={24} className="text-encora-green dark:text-encora-mint mb-2" />
                    <span className="text-xs text-encora-text dark:text-white text-center">{doc.name || `Document ${index + 1}`}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Employment Details */}
          {(request.employerName || request.jobTitle || request.monthlyIncome) && (
            <div className="mb-6 pb-6 border-b border-encora-green/10 dark:border-white/10">
              <h3 className="text-lg font-semibold text-encora-text dark:text-white mb-4">Employment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {request.employerName && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-1">Employer</h4>
                    <p className="text-encora-text dark:text-white">{request.employerName}</p>
                  </div>
                )}
                {request.jobTitle && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-1">Job Title</h4>
                    <p className="text-encora-text dark:text-white">{request.jobTitle}</p>
                  </div>
                )}
                {request.monthlyIncome && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-1">Monthly Income</h4>
                    <p className="text-encora-text dark:text-white">₹{Number(request.monthlyIncome).toLocaleString()}</p>
                  </div>
                )}
                {request.employmentType && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-1">Employment Type</h4>
                    <p className="text-encora-text dark:text-white capitalize">{request.employmentType.replace('-', ' ')}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* References */}
          {(request.reference1Name || request.reference2Name) && (
            <div className="mb-6 pb-6 border-b border-encora-green/10 dark:border-white/10">
              <h3 className="text-lg font-semibold text-encora-text dark:text-white mb-4">References</h3>
              <div className="space-y-4">
                {request.reference1Name && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Reference 1</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-encora-text/60 dark:text-white/60">Name</p>
                        <p className="text-encora-text dark:text-white">{request.reference1Name}</p>
                      </div>
                      {request.reference1Phone && (
                        <div>
                          <p className="text-xs text-encora-text/60 dark:text-white/60">Phone</p>
                          <p className="text-encora-text dark:text-white">{request.reference1Phone}</p>
                        </div>
                      )}
                      {request.reference1Email && (
                        <div>
                          <p className="text-xs text-encora-text/60 dark:text-white/60">Email</p>
                          <p className="text-encora-text dark:text-white">{request.reference1Email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                {request.reference2Name && (
                  <div>
                    <h4 className="text-sm font-semibold text-encora-text/60 dark:text-white/60 mb-2">Reference 2</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <p className="text-xs text-encora-text/60 dark:text-white/60">Name</p>
                        <p className="text-encora-text dark:text-white">{request.reference2Name}</p>
                      </div>
                      {request.reference2Phone && (
                        <div>
                          <p className="text-xs text-encora-text/60 dark:text-white/60">Phone</p>
                          <p className="text-encora-text dark:text-white">{request.reference2Phone}</p>
                        </div>
                      )}
                      {request.reference2Email && (
                        <div>
                          <p className="text-xs text-encora-text/60 dark:text-white/60">Email</p>
                          <p className="text-encora-text dark:text-white">{request.reference2Email}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Actions */}
          {request.status !== 'approved' && request.status !== 'rejected' && (
            <div className="flex flex-wrap gap-4 pt-6 border-t border-encora-green/10 dark:border-white/10">
              <button
                onClick={() => setShowApproveModal(true)}
                disabled={approveMutation.isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={20} />
                Approve
              </button>
              <button
                onClick={() => setShowRejectModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                <XCircle size={20} />
                Reject
              </button>
              <button
                onClick={() => setShowMoreInfoModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
              >
                <MessageSquare size={20} />
                Request More Info
              </button>
            </div>
          )}
        </div>

        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-encora-green/95 rounded-xl shadow-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-encora-text dark:text-white mb-4">Reject Request</h3>
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Reason for rejection (optional)"
                rows={4}
                className="w-full px-3 py-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowRejectModal(false)
                    setRejectReason('')
                  }}
                  className="flex-1 px-4 py-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg text-encora-text dark:text-white hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => rejectMutation.mutate()}
                  disabled={rejectMutation.isLoading}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {rejectMutation.isLoading ? 'Rejecting...' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Approve Confirmation Modal */}
        {showApproveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-encora-green/95 rounded-xl shadow-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-encora-text dark:text-white mb-4">Confirm Approval</h3>
              <p className="text-encora-text/70 dark:text-white/70 mb-6">
                Are you sure you want to approve this verification request? This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowApproveModal(false)}
                  className="flex-1 px-4 py-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg text-encora-text dark:text-white hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => approveMutation.mutate()}
                  disabled={approveMutation.isLoading}
                  className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors disabled:opacity-50"
                >
                  {approveMutation.isLoading ? 'Approving...' : 'Confirm Approval'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* More Info Modal */}
        {showMoreInfoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-encora-green/95 rounded-xl shadow-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-encora-text dark:text-white mb-4">Request More Information</h3>
              <textarea
                value={moreInfoMessage}
                onChange={(e) => setMoreInfoMessage(e.target.value)}
                placeholder="What additional information do you need?"
                rows={4}
                required
                className="w-full px-3 py-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white mb-4 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              />
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setShowMoreInfoModal(false)
                    setMoreInfoMessage('')
                  }}
                  className="flex-1 px-4 py-2 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg text-encora-text dark:text-white hover:bg-encora-gray dark:hover:bg-encora-green/30 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => moreInfoMutation.mutate()}
                  disabled={moreInfoMutation.isLoading || !moreInfoMessage.trim()}
                  className="flex-1 px-4 py-2 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors disabled:opacity-50"
                >
                  {moreInfoMutation.isLoading ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

