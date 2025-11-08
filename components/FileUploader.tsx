import { useState, useRef } from 'react'
import { Upload, X, File, Image as ImageIcon } from 'lucide-react'
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE, VALIDATION_MESSAGES } from '../src/utils/constants'

interface FileUploaderProps {
  name: string
  label: string
  value: File | null
  onChange: (file: File | null) => void
  error?: string
  required?: boolean
  accept?: string
  multiple?: boolean
  onUploadProgress?: (progress: number) => void
}

export default function FileUploader({
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  accept = '.jpg,.jpeg,.png,.pdf',
  multiple = false,
  onUploadProgress,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      alert(VALIDATION_MESSAGES.INVALID_FILE_TYPE)
      return
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      alert(VALIDATION_MESSAGES.FILE_TOO_LARGE)
      return
    }

    onChange(file)

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleRemove = () => {
    onChange(null)
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const getFileIcon = () => {
    if (value?.type.startsWith('image/')) {
      return <ImageIcon size={24} />
    }
    return <File size={24} />
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {!value ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragging
              ? 'border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/10'
              : 'border-encora-green/30 dark:border-encora-mint/30 hover:border-encora-green dark:hover:border-encora-mint hover:bg-encora-gray/50 dark:hover:bg-encora-green/20'
          } ${error ? 'border-red-500' : ''}`}
        >
          <Upload className="mx-auto mb-3 text-encora-green dark:text-encora-mint" size={32} />
          <p className="text-sm text-encora-text dark:text-white mb-1">
            Drag & drop a file here, or click to select
          </p>
          <p className="text-xs text-encora-text/60 dark:text-white/60">
            Accepted: JPG, PNG, PDF (Max 5MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            name={name}
            accept={accept}
            multiple={multiple}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-encora-green/20 dark:border-encora-mint/30 rounded-lg p-4 bg-encora-gray/50 dark:bg-encora-green/20">
          {preview ? (
            <div className="relative">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getFileIcon()}
                <div>
                  <p className="text-sm font-medium text-encora-text dark:text-white">
                    {value.name}
                  </p>
                  <p className="text-xs text-encora-text/60 dark:text-white/60">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemove}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {/* Upload Progress Bar */}
      {uploadProgress !== null && uploadProgress < 100 && (
        <div className="mt-2">
          <div className="w-full bg-encora-gray dark:bg-encora-green/30 rounded-full h-2">
            <div
              className="bg-encora-green dark:bg-encora-mint h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-xs text-encora-text/60 dark:text-white/60 mt-1 text-center">
            Uploading... {uploadProgress}%
          </p>
        </div>
      )}
    </div>
  )
}
