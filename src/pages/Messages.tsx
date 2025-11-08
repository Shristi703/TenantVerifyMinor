import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { Send, Paperclip, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Messages() {
  const { conversationId } = useParams<{ conversationId?: string }>()
  const [message, setMessage] = useState('')

  // Mock messages data
  const messages = [
    { id: 1, sender: 'landlord', text: 'Hello, I received your verification request. I need some additional documents.', timestamp: '10:30 AM' },
    { id: 2, sender: 'tenant', text: 'Sure, I can provide those. Which documents do you need?', timestamp: '10:35 AM' },
    { id: 3, sender: 'landlord', text: 'I need your latest payslip and a reference letter from your employer.', timestamp: '10:40 AM' },
  ]

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      // Handle send message
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Link
          to="/tenant/requests"
          className="flex items-center gap-2 text-encora-green dark:text-encora-mint mb-6 hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Requests
        </Link>

        <div className="bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-xl border border-encora-mint/20 dark:border-encora-mint/30 overflow-hidden flex flex-col h-[calc(100vh-200px)]">
          {/* Chat Header */}
          <div className="p-6 border-b border-encora-green/10 dark:border-white/10">
            <h1 className="text-2xl font-bold text-encora-text dark:text-white">Messages</h1>
            <p className="text-sm text-encora-text/60 dark:text-white/60 mt-1">
              Conversation ID: {conversationId || 'New Conversation'}
            </p>
          </div>

          {/* Chat Thread */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'tenant' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-4 ${
                    msg.sender === 'tenant'
                      ? 'bg-encora-green dark:bg-encora-mint text-white'
                      : 'bg-encora-gray dark:bg-encora-green/50 text-encora-text dark:text-white'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className={`text-xs mt-2 ${
                    msg.sender === 'tenant'
                      ? 'text-white/70'
                      : 'text-encora-text/60 dark:text-white/60'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-encora-green/10 dark:border-white/10">
            <form onSubmit={handleSend} className="flex items-center gap-4">
              <button
                type="button"
                className="p-3 text-encora-green dark:text-encora-mint hover:bg-encora-gray dark:hover:bg-encora-green/30 rounded-lg transition-colors"
              >
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint"
              />
              <button
                type="submit"
                className="p-3 bg-encora-green dark:bg-white text-white dark:text-encora-green rounded-lg hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-colors"
              >
                <Send size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

