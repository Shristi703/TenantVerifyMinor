import { useState } from 'react'
import { Search, ChevronDown, ChevronUp } from 'lucide-react'
import Accordion from '../../components/Accordion'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const faqCategories = [
    {
      title: 'Getting Started',
      items: [
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up" in the header, choose your role (Tenant or Landlord), fill in your details, and verify your email address.',
        },
        {
          question: 'What documents do I need to submit?',
          answer: 'You need to submit ID proof (Aadhar/PAN/Passport), latest payslip, and optionally additional supporting documents.',
        },
        {
          question: 'How long does verification take?',
          answer: 'Verification typically takes 24-48 hours after you submit all required documents.',
        },
      ],
    },
    {
      title: 'For Tenants',
      items: [
        {
          question: 'How do I submit a verification request?',
          answer: 'Go to "New Request" and fill out the multi-step form with your personal information, employment details, documents, and references.',
        },
        {
          question: 'Can I edit my request after submission?',
          answer: 'You can only edit requests that are in "Submitted" status. Once under review, you cannot edit.',
        },
        {
          question: 'What if my request is rejected?',
          answer: 'You will receive a notification with the reason. You can submit a new request with corrected information.',
        },
      ],
    },
    {
      title: 'For Landlords',
      items: [
        {
          question: 'How do I review tenant requests?',
          answer: 'Go to your Dashboard to see all pending requests. Click on any request to view full details and documents.',
        },
        {
          question: 'What actions can I take on a request?',
          answer: 'You can Approve, Reject, or Request More Information from the tenant.',
        },
        {
          question: 'How do I communicate with tenants?',
          answer: 'Use the Messages feature to chat directly with tenants about their verification requests.',
        },
      ],
    },
    {
      title: 'Account & Settings',
      items: [
        {
          question: 'How do I change my password?',
          answer: 'Go to Settings > Password tab and enter your current password and new password.',
        },
        {
          question: 'Can I update my profile information?',
          answer: 'Yes, you can update your profile information from the Profile page at any time.',
        },
        {
          question: 'How do I delete my account?',
          answer: 'Go to Settings > Delete Account tab. Note that this action is permanent and cannot be undone.',
        },
      ],
    },
  ]

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.items.length > 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-4">Help & FAQ</h1>
        <p className="text-encora-text/70 dark:text-white/70 mb-8">
          Find answers to common questions and get help with using TenantVerify
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-encora-green/50 dark:text-encora-mint/50" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for help..."
              className="w-full pl-10 pr-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
            />
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((category, index) => (
              <div key={index} className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-6">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">{category.title}</h2>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <Accordion
                      key={itemIndex}
                      title={item.question}
                      content={item.answer}
                    />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-encora-text/60 dark:text-white/60">No results found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-encora-green/10 dark:bg-encora-mint/10 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-encora-text dark:text-white mb-4">Still need help?</h3>
          <p className="text-encora-text/70 dark:text-white/70 mb-6">
            Contact our support team for additional assistance
          </p>
          <a
            href="mailto:support@tenantverify.com"
            className="inline-block px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

