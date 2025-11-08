export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Terms and Conditions</h1>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 p-8 prose dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              By accessing and using TenantVerify, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">2. Use License</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed mb-4">
              Permission is granted to temporarily use TenantVerify for personal, non-commercial transitory viewing only.
            </p>
            <ul className="list-disc list-inside text-encora-text/80 dark:text-white/80 space-y-2 ml-4">
              <li>You may not modify or copy the materials</li>
              <li>You may not use the materials for any commercial purpose</li>
              <li>You may not attempt to decompile or reverse engineer any software</li>
              <li>You may not remove any copyright or other proprietary notations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">3. User Accounts</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">4. Verification Process</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              TenantVerify provides a platform for tenant verification. We do not guarantee the accuracy of information provided by users. Landlords are responsible for their own verification decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">5. Privacy and Data</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              Your use of TenantVerify is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              In no event shall TenantVerify or its suppliers be liable for any damages arising out of the use or inability to use the materials on TenantVerify.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-4">7. Revisions</h2>
            <p className="text-encora-text/80 dark:text-white/80 leading-relaxed">
              TenantVerify may revise these terms of service at any time without notice. By using this service you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <div className="mt-8 pt-8 border-t border-encora-green/10 dark:border-white/10">
            <p className="text-sm text-encora-text/60 dark:text-white/60">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

