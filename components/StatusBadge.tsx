import { REQUEST_STATUS } from '../src/utils/constants'
import { CheckCircle, Clock, XCircle, AlertCircle, FileText } from 'lucide-react'

interface StatusBadgeProps {
  status: string
  className?: string
}

export default function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case REQUEST_STATUS.SUBMITTED:
        return {
          label: 'Submitted',
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-700 dark:text-blue-300',
          icon: FileText,
        }
      case REQUEST_STATUS.IN_REVIEW:
        return {
          label: 'In Review',
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          icon: Clock,
        }
      case REQUEST_STATUS.APPROVED:
        return {
          label: 'Approved',
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-700 dark:text-green-300',
          icon: CheckCircle,
        }
      case REQUEST_STATUS.REJECTED:
        return {
          label: 'Rejected',
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-700 dark:text-red-300',
          icon: XCircle,
        }
      case REQUEST_STATUS.MORE_INFO_REQUIRED:
        return {
          label: 'More Info Required',
          bgColor: 'bg-orange-100 dark:bg-orange-900/30',
          textColor: 'text-orange-700 dark:text-orange-300',
          icon: AlertCircle,
        }
      default:
        return {
          label: status,
          bgColor: 'bg-gray-100 dark:bg-gray-800',
          textColor: 'text-gray-700 dark:text-gray-300',
          icon: FileText,
        }
    }
  }

  const config = getStatusConfig(status)
  const Icon = config.icon

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${config.bgColor} ${config.textColor} ${className}`}
    >
      <Icon size={14} />
      {config.label}
    </span>
  )
}


