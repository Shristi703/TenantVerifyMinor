export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Privacy Policy</h1>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8 prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">1. Information We Collect</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed mb-4">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc list-inside text-encora-text/80 dark:text-white/80 space-y-2 ml-4">
              <li>Personal information (name, email, phone number)</li>
              <li>Employment and financial information for verification</li>
              <li>Documents you upload (ID proofs, payslips, etc.)</li>
              <li>Reference contact information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-encora-text/80 dark:text-white/80 space-y-2 ml-4">
              <li>Provide and maintain our service</li>
              <li>Process verification requests</li>
              <li>Communicate with you about your account</li>
              <li>Send you notifications and updates</li>
              <li>Improve our services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">3. Information Sharing</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              We do not sell your personal information. We may share your information only with:
            </p>
            <ul className="list-disc list-inside text-encora-text/80 dark:text-white/80 space-y-2 ml-4 mt-4">
              <li>Landlords who are reviewing your verification request</li>
              <li>Service providers who assist us in operating our platform</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">4. Data Security</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">5. Your Rights</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-encora-text/80 dark:text-white/80 space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of certain communications</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">6. Cookies</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">7. Changes to This Policy</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-encora-green/10 dark:border-white/10">
            <p className="text-sm text-encora-text/60 dark:text-white/60">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <p className="text-sm text-encora-text/60 dark:text-white/60 mt-2">
              If you have questions about this Privacy Policy, please contact us at privacy@tenantverify.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

