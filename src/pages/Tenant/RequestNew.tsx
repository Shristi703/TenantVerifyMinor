import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { User, Mail, Phone, MapPin, Calendar, Briefcase, DollarSign, ChevronRight, ChevronLeft, Check } from 'lucide-react'
import { tenantAPI } from '../../utils/api'
import { tenantRequestSchema } from '../../utils/validationSchemas'
import FileUploader from '../../../components/FileUploader'
import toast from 'react-hot-toast'

export default function RequestNew() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    { id: 'basic', label: 'Basic Info' },
    { id: 'employment', label: 'Employment' },
    { id: 'documents', label: 'Documents' },
    { id: 'references', label: 'References' },
  ]

  const initialValues = {
    // Basic Info
    name: '',
    email: '',
    phone: '',
    address: '',
    moveInDate: '',
    // Employment
    employerName: '',
    jobTitle: '',
    monthlyIncome: '',
    employmentType: '',
    // Documents
    idProof: null as File | null,
    payslip: null as File | null,
    additionalDocuments: [] as File[],
    // References
    reference1Name: '',
    reference1Phone: '',
    reference1Email: '',
    reference2Name: '',
    reference2Phone: '',
    reference2Email: '',
    consent: false,
  }

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const formData = new FormData()
      
      // Append all form fields
      Object.keys(values).forEach((key) => {
        if (key === 'idProof' || key === 'payslip') {
          if (values[key as keyof typeof values]) {
            formData.append(key, values[key as keyof typeof values] as File)
          }
        } else if (key === 'additionalDocuments') {
          (values.additionalDocuments as File[]).forEach((file, index) => {
            formData.append(`additionalDocuments[${index}]`, file)
          })
        } else if (key !== 'consent') {
          formData.append(key, String(values[key as keyof typeof values]))
        }
      })
      
      formData.append('consent', String(values.consent))

      await tenantAPI.createRequest(formData)
      toast.success('Request submitted successfully!')
      navigate('/tenant/requests')
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit request')
    }
  }

  const isStepCompleted = (stepIndex: number, values: typeof initialValues) => {
    switch (stepIndex) {
      case 0:
        return !!(values.name && values.email && values.phone && values.address && values.moveInDate)
      case 1:
        return !!(values.employerName && values.jobTitle && values.monthlyIncome && values.employmentType)
      case 2:
        return !!(values.idProof && values.payslip)
      case 3:
        return !!(values.reference1Name && values.reference1Phone && values.reference1Email && values.consent)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-2">
            New Verification Request
          </h1>
          <p className="text-encora-text/70 dark:text-white/70">
            Complete the form to submit your verification request
          </p>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={tenantRequestSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors, touched, isSubmitting }) => (
            <Form>
              {/* Stepper Progress */}
              <div className="mb-8">
                <div className="flex items-center justify-between">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                            index < currentStep || isStepCompleted(index, values)
                              ? 'bg-encora-green dark:bg-encora-mint border-encora-green dark:border-encora-mint text-white'
                              : index === currentStep
                              ? 'border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/10 text-encora-green dark:text-encora-mint'
                              : 'border-encora-green/30 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 text-encora-text/40 dark:text-white/40'
                          }`}
                        >
                          {index < currentStep || isStepCompleted(index, values) ? (
                            <Check size={20} />
                          ) : (
                            <span className="font-semibold">{index + 1}</span>
                          )}
                        </div>
                        <p
                          className={`mt-2 text-xs font-medium text-center ${
                            index === currentStep
                              ? 'text-encora-green dark:text-encora-mint'
                              : 'text-encora-text/60 dark:text-white/60'
                          }`}
                        >
                          {step.label}
                        </p>
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${
                            index < currentStep
                              ? 'bg-encora-green dark:bg-encora-mint'
                              : 'bg-encora-green/20 dark:bg-encora-mint/20'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Step Content */}
              <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8 mb-6">
                {/* Step 1: Basic Info */}
                {currentStep === 0 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Basic Information</h3>
                    
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
                          placeholder="John Doe"
                        />
                      </div>
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="email"
                          type="email"
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                          placeholder="you@example.com"
                        />
                      </div>
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="phone"
                          type="tel"
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                          placeholder="+91 9876543210"
                        />
                      </div>
                      <ErrorMessage name="phone" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Address <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="address"
                          as="textarea"
                          rows={3}
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                          placeholder="Full address"
                        />
                      </div>
                      <ErrorMessage name="address" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Move-in Date <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="moveInDate"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                        />
                      </div>
                      <ErrorMessage name="moveInDate" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                )}

                {/* Step 2: Employment Details */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Employment Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Employer Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="employerName"
                          type="text"
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                          placeholder="Company Name"
                        />
                      </div>
                      <ErrorMessage name="employerName" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Job Title <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="jobTitle"
                        type="text"
                        className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                        placeholder="Software Engineer"
                      />
                      <ErrorMessage name="jobTitle" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Monthly Income (₹) <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
                        <Field
                          name="monthlyIncome"
                          type="number"
                          min="0"
                          className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                          placeholder="50000"
                        />
                      </div>
                      <ErrorMessage name="monthlyIncome" component="div" className="text-red-500 text-sm mt-1" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Employment Type <span className="text-red-500">*</span>
                      </label>
                      <Field
                        name="employmentType"
                        as="select"
                        className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      >
                        <option value="">Select employment type</option>
                        <option value="full-time">Full-time</option>
                        <option value="part-time">Part-time</option>
                        <option value="contract">Contract</option>
                        <option value="self-employed">Self-employed</option>
                      </Field>
                      <ErrorMessage name="employmentType" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                )}

                {/* Step 3: Documents */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Upload Documents</h3>
                    
                    <div>
                      <FileUploader
                        name="idProof"
                        label="ID Proof (Aadhar/PAN/Passport) *"
                        value={values.idProof}
                        onChange={(file) => setFieldValue('idProof', file)}
                        error={touched.idProof && errors.idProof ? String(errors.idProof) : undefined}
                        required
                      />
                    </div>

                    <div>
                      <FileUploader
                        name="payslip"
                        label="Latest Payslip *"
                        value={values.payslip}
                        onChange={(file) => setFieldValue('payslip', file)}
                        error={touched.payslip && errors.payslip ? String(errors.payslip) : undefined}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                        Additional Documents (Optional)
                      </label>
                      <p className="text-xs text-encora-text/60 dark:text-white/60 mb-4">
                        You can upload additional supporting documents if needed
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => {
                          const files = Array.from(e.target.files || [])
                          setFieldValue('additionalDocuments', files)
                        }}
                        className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: References */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-encora-text dark:text-white mb-6">References</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-encora-text dark:text-white mb-4">Reference 1 *</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                              Name <span className="text-red-500">*</span>
                            </label>
                            <Field
                              name="reference1Name"
                              type="text"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="Reference Name"
                            />
                            <ErrorMessage name="reference1Name" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                              Phone <span className="text-red-500">*</span>
                            </label>
                            <Field
                              name="reference1Phone"
                              type="tel"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="+91 9876543210"
                            />
                            <ErrorMessage name="reference1Phone" component="div" className="text-red-500 text-sm mt-1" />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                              Email <span className="text-red-500">*</span>
                            </label>
                            <Field
                              name="reference1Email"
                              type="email"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="reference@example.com"
                            />
                            <ErrorMessage name="reference1Email" component="div" className="text-red-500 text-sm mt-1" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-encora-text dark:text-white mb-4">Reference 2 (Optional)</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">Name</label>
                            <Field
                              name="reference2Name"
                              type="text"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="Reference Name"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">Phone</label>
                            <Field
                              name="reference2Phone"
                              type="tel"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="+91 9876543210"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">Email</label>
                            <Field
                              name="reference2Email"
                              type="email"
                              className="block w-full px-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                              placeholder="reference@example.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start pt-4 border-t border-encora-green/10 dark:border-white/10">
                        <Field
                          name="consent"
                          type="checkbox"
                          className="mt-1 h-4 w-4 text-encora-green focus:ring-encora-green border-encora-green/30 rounded"
                        />
                        <label htmlFor="consent" className="ml-2 block text-sm text-encora-text dark:text-white">
                          I consent to the verification process and provide the above information voluntarily. <span className="text-red-500">*</span>
                        </label>
                      </div>
                      <ErrorMessage name="consent" component="div" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg border border-encora-green/20 dark:border-encora-mint/30 text-encora-green dark:text-encora-mint font-semibold hover:bg-encora-gray dark:hover:bg-encora-mint/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} />
                  Previous
                </button>

                {currentStep < steps.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      // Validate current step before moving forward
                      const stepFields: { [key: number]: string[] } = {
                        0: ['name', 'email', 'phone', 'address', 'moveInDate'],
                        1: ['employerName', 'jobTitle', 'monthlyIncome', 'employmentType'],
                        2: ['idProof', 'payslip'],
                        3: ['reference1Name', 'reference1Phone', 'reference1Email', 'consent'],
                      }
                      
                      const fieldsToValidate = stepFields[currentStep]
                      const hasErrors = fieldsToValidate.some(field => errors[field as keyof typeof errors] && touched[field as keyof typeof touched])
                      
                      if (!hasErrors && isStepCompleted(currentStep, values)) {
                        setCurrentStep(currentStep + 1)
                      } else {
                        // Mark fields as touched to show errors
                        fieldsToValidate.forEach(field => {
                          setFieldValue(field, values[field as keyof typeof values], true)
                        })
                      }
                    }}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-encora-green dark:bg-white text-white dark:text-encora-green font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-3 rounded-lg bg-encora-green dark:bg-white text-white dark:text-encora-green font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </button>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
