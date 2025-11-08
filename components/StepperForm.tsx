import { useState, ReactNode } from 'react'
import { Check, ChevronRight, ChevronLeft } from 'lucide-react'

interface Step {
  id: string
  label: string
  component: ReactNode
}

interface StepperFormProps {
  steps: Step[]
  onSubmit: (data: any) => void | Promise<void>
  initialValues?: any
}

export default function StepperForm({ steps, onSubmit, initialValues = {} }: StepperFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialValues)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [isSubmitting, setIsSubmitting] = useState(false)

  const updateFormData = (stepData: any) => {
    setFormData((prev: any) => ({ ...prev, ...stepData }))
    setCompletedSteps((prev) => new Set([...prev, currentStep]))
  }

  const handleNext = (stepData?: any) => {
    if (stepData) {
      updateFormData(stepData)
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepCompleted = (index: number) => completedSteps.has(index)
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Stepper Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    index < currentStep || isStepCompleted(index)
                      ? 'bg-encora-green dark:bg-encora-mint border-encora-green dark:border-encora-mint text-white'
                      : index === currentStep
                      ? 'border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/10 text-encora-green dark:text-encora-mint'
                      : 'border-encora-green/30 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 text-encora-text/40 dark:text-white/40'
                  }`}
                >
                  {index < currentStep || isStepCompleted(index) ? (
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

      {/* Current Step Content */}
      <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8">
        {steps[currentStep].component}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-lg border border-encora-green/20 dark:border-encora-mint/30 text-encora-green dark:text-encora-mint font-semibold hover:bg-encora-gray dark:hover:bg-encora-mint/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={20} />
          Previous
        </button>

        {isLastStep ? (
          <button
            onClick={handleSubmit}
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
              'Submit'
            )}
          </button>
        ) : (
          <button
            onClick={() => handleNext()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-encora-green dark:bg-white text-white dark:text-encora-green font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300"
          >
            Next
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  )
}
