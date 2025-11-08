import { useState } from 'react'
import { User, Lock, Bell, Trash2, Save } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
  })

  const handleSave = () => {
    toast.success('Settings saved successfully!')
  }

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'delete', label: 'Delete Account', icon: Trash2 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-encora-green dark:text-white mb-8">Settings</h1>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-encora-green/10 dark:border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-semibold transition-colors ${
                    activeTab === tab.id
                      ? 'text-encora-green dark:text-encora-mint border-b-2 border-encora-green dark:border-encora-mint'
                      : 'text-encora-text/60 dark:text-white/60 hover:text-encora-green dark:hover:text-encora-mint'
                  }`}
                >
                  <Icon size={20} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Account Information</h2>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
                >
                  <Save size={20} />
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Change Password</h2>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
                >
                  <Save size={20} />
                  Update Password
                </button>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-encora-text dark:text-white mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  <label className="flex items-center justify-between p-4 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg">
                    <span className="text-encora-text dark:text-white">Email Notifications</span>
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, email: e.target.checked }
                      })}
                      className="h-5 w-5 text-encora-green focus:ring-encora-green rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg">
                    <span className="text-encora-text dark:text-white">SMS Notifications</span>
                    <input
                      type="checkbox"
                      checked={formData.notifications.sms}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, sms: e.target.checked }
                      })}
                      className="h-5 w-5 text-encora-green focus:ring-encora-green rounded"
                    />
                  </label>
                  <label className="flex items-center justify-between p-4 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg">
                    <span className="text-encora-text dark:text-white">Push Notifications</span>
                    <input
                      type="checkbox"
                      checked={formData.notifications.push}
                      onChange={(e) => setFormData({
                        ...formData,
                        notifications: { ...formData.notifications, push: e.target.checked }
                      })}
                      className="h-5 w-5 text-encora-green focus:ring-encora-green rounded"
                    />
                  </label>
                </div>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
                >
                  <Save size={20} />
                  Save Preferences
                </button>
              </div>
            )}

            {activeTab === 'delete' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-red-500 dark:text-red-400 mb-6">Delete Account</h2>
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <p className="text-red-800 dark:text-red-200 mb-4">
                    Warning: This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <button className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors">
                    Delete My Account
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

