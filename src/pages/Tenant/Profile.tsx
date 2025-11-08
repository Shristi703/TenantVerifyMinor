import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useFormik } from 'formik'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { profileAPI } from '../../utils/api'
import { profileUpdateSchema } from '../../utils/validationSchemas'
import FileUploader from '../../../components/FileUploader'
import toast from 'react-hot-toast'
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react'

export default function Profile() {
  const queryClient = useQueryClient()
  
  const { data: profile, isLoading } = useQuery('profile', () => profileAPI.get())
  
  const updateMutation = useMutation(
    (data: any) => profileAPI.update(data),
    {
      onSuccess: () => {
        toast.success('Profile updated successfully')
        queryClient.invalidateQueries('profile')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to update profile')
      },
    }
  )

  const photoMutation = useMutation(
    (photo: File) => profileAPI.uploadPhoto(photo),
    {
      onSuccess: () => {
        toast.success('Photo uploaded successfully')
        queryClient.invalidateQueries('profile')
      },
      onError: (error: any) => {
        toast.error(error.message || 'Failed to upload photo')
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Profile</h1>
        
        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8">
          <Formik
            initialValues={{
              name: profile?.name || '',
              email: profile?.email || '',
              phone: profile?.phone || '',
              address: profile?.address || '',
              bio: profile?.bio || '',
            }}
            validationSchema={profileUpdateSchema}
            onSubmit={(values) => {
              updateMutation.mutate(values)
            }}
          >
            {({ setFieldValue }) => (
              <Form className="space-y-6">
                {/* Photo Upload */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    {profile?.photo ? (
                      <img
                        src={profile.photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-encora-green dark:border-encora-mint"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-encora-gray dark:bg-encora-green/50 flex items-center justify-center border-4 border-encora-green dark:border-encora-mint">
                        <User size={48} className="text-encora-green dark:text-encora-mint" />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 p-2 bg-encora-green dark:bg-encora-mint text-white rounded-full cursor-pointer hover:bg-encora-green-dark dark:hover:bg-encora-mint-light transition-colors">
                      <Camera size={16} />
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            photoMutation.mutate(file)
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                      <Field
                        name="name"
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                      <Field
                        name="email"
                        type="email"
                        className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                      <Field
                        name="phone"
                        type="tel"
                        className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      />
                    </div>
                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                      Address
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                      <Field
                        name="address"
                        as="textarea"
                        rows={2}
                        className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      />
                    </div>
                    <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Bio
                  </label>
                  <Field
                    name="bio"
                    as="textarea"
                    rows={4}
                    className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                  <ErrorMessage name="bio" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={updateMutation.isLoading}
                  className="w-full py-3 px-4 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {updateMutation.isLoading ? 'Updating...' : 'Update Profile'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

