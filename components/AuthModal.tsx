import { useState, useEffect } from "react"
import { X, Mail, Lock, User, Building2, Home, Eye, EyeOff } from "lucide-react"

type UserType = "tenant" | "landlord" | null
type AuthMode = "login" | "signup"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>("login")
  
  // Login state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Signup state
  const [userType, setUserType] = useState<UserType>(null)
  const [name, setName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showSignupPassword, setShowSignupPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Reset form
      setEmail("")
      setPassword("")
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!userType) {
      alert("Please select whether you are a Tenant or Landlord")
      return
    }

    if (signupPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      onClose()
      // Reset form
      setUserType(null)
      setName("")
      setSignupEmail("")
      setSignupPassword("")
      setConfirmPassword("")
    }, 1000)
  }

  const resetForms = () => {
    setEmail("")
    setPassword("")
    setUserType(null)
    setName("")
    setSignupEmail("")
    setSignupPassword("")
    setConfirmPassword("")
    setShowPassword(false)
    setShowSignupPassword(false)
    setShowConfirmPassword(false)
  }

  const handleClose = () => {
    resetForms()
    onClose()
  }

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      
      return () => {
        // Restore scroll position
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ top: 0, left: 0, right: 0, bottom: 0 }}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
        style={{ top: 0, left: 0, right: 0, bottom: 0 }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-encora-green/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-encora-mint/20 dark:border-encora-mint/30 animate-in slide-in-from-bottom-5 duration-300 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-encora-green dark:text-white hover:bg-encora-green/10 dark:hover:bg-encora-mint/10 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          {/* Header with Toggle */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-encora-green dark:text-white mb-2">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-encora-text/70 dark:text-white/70 text-sm mb-4">
              {mode === "login" ? "Sign in to your account to continue" : "Get started with your account today"}
            </p>
            
            {/* Mode Toggle */}
            <div className="flex items-center justify-center gap-2 bg-encora-gray dark:bg-encora-green/50 rounded-xl p-1">
              <button
                onClick={() => {
                  setMode("login")
                  resetForms()
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-encora-green dark:bg-encora-mint text-white shadow-md"
                    : "text-encora-text dark:text-white/70 hover:text-encora-green dark:hover:text-encora-mint"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode("signup")
                  resetForms()
                }}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-encora-green dark:bg-encora-mint text-white shadow-md"
                    : "text-encora-text dark:text-white/70 hover:text-encora-green dark:hover:text-encora-mint"
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Login Form */}
          {mode === "login" && (
            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="login-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-encora-green/50 dark:text-encora-mint/50 hover:text-encora-green dark:hover:text-encora-mint transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-encora-green focus:ring-encora-green border-encora-green/30 rounded"
                  />
                  <span className="ml-2 text-encora-text dark:text-white">Remember me</span>
                </label>
                <button
                  type="button"
                  className="text-encora-green dark:text-encora-mint hover:text-encora-green-dark dark:hover:text-encora-mint-light transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-encora-green dark:bg-white hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-encora-green dark:focus:ring-encora-mint disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {mode === "signup" && (
            <form className="space-y-5" onSubmit={handleSignup}>
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-encora-text dark:text-white mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setUserType("tenant")}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "tenant"
                        ? "border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/20 shadow-md"
                        : "border-encora-green/20 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 hover:border-encora-green/40 dark:hover:border-encora-mint/50"
                    }`}
                  >
                    <Home className={`h-6 w-6 mb-2 ${userType === "tenant" ? "text-encora-green dark:text-encora-mint" : "text-encora-green/50 dark:text-encora-mint/50"}`} />
                    <span className={`text-sm font-semibold ${userType === "tenant" ? "text-encora-green dark:text-white" : "text-encora-text dark:text-white/70"}`}>
                      Tenant
                    </span>
                    {userType === "tenant" && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-encora-green dark:bg-encora-mint rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType("landlord")}
                    className={`relative flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-300 ${
                      userType === "landlord"
                        ? "border-encora-green dark:border-encora-mint bg-encora-green/10 dark:bg-encora-mint/20 shadow-md"
                        : "border-encora-green/20 dark:border-encora-mint/30 bg-white dark:bg-encora-green/50 hover:border-encora-green/40 dark:hover:border-encora-mint/50"
                    }`}
                  >
                    <Building2 className={`h-6 w-6 mb-2 ${userType === "landlord" ? "text-encora-green dark:text-encora-mint" : "text-encora-green/50 dark:text-encora-mint/50"}`} />
                    <span className={`text-sm font-semibold ${userType === "landlord" ? "text-encora-green dark:text-white" : "text-encora-text dark:text-white/70"}`}>
                      Landlord
                    </span>
                    {userType === "landlord" && (
                      <div className="absolute top-2 right-2 w-3 h-3 bg-encora-green dark:bg-encora-mint rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="signup-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="signup-email"
                    type="email"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="signup-password"
                    type={showSignupPassword ? "text" : "password"}
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-encora-green/50 dark:text-encora-mint/50 hover:text-encora-green dark:hover:text-encora-mint transition-colors"
                  >
                    {showSignupPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="signup-confirm-password" className="block text-sm font-medium text-encora-text dark:text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-encora-green/50 dark:text-encora-mint/50" />
                  </div>
                  <input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-3 border border-encora-green/20 dark:border-encora-mint/30 rounded-lg bg-white dark:bg-encora-green/50 text-encora-text dark:text-white placeholder-encora-text/40 dark:placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-encora-green dark:focus:ring-encora-mint focus:border-transparent transition-all"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-encora-green/50 dark:text-encora-mint/50 hover:text-encora-green dark:hover:text-encora-mint transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !userType}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-semibold text-white bg-encora-green dark:bg-white hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-encora-green dark:focus:ring-encora-mint disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}


