import { CheckCircle } from 'lucide-react'

export default function StepsSection() {
  const steps = [
    {
      number: 1,
      title: 'Sign Up',
      description: 'Create your account as a Tenant or Landlord and get started in minutes.',
    },
    {
      number: 2,
      title: 'Submit Request',
      description: 'Tenants can submit verification requests with all required documents and information.',
    },
    {
      number: 3,
      title: 'Get Verified',
      description: 'Landlords review and approve requests. Get verified and start renting!',
    },
  ]

  return (
    <section className="bg-white dark:bg-encora-green-dark section-spacing border-t border-b border-[#E0E0E0] dark:border-encora-mint/30">
      <div className="container-encora">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 dark:text-white">How It Works</h2>
          <p className="body-text-lg max-w-2xl mx-auto dark:text-white/80">
            Simple, fast, and secure tenant verification process in just three easy steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white dark:bg-white/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0] dark:border-encora-mint/30 group hover:border-encora-mint backdrop-blur-sm relative"
            >
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-encora-green dark:bg-encora-mint rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                {step.number}
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-bold text-encora-green dark:text-white mb-3">{step.title}</h3>
                <p className="body-text leading-relaxed dark:text-white/70">{step.description}</p>
              </div>
              <div className="mt-6 flex items-center text-encora-green dark:text-encora-mint">
                <CheckCircle size={20} className="mr-2" />
                <span className="text-sm font-semibold">Step {step.number}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

