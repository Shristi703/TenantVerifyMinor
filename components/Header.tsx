import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react"
import ThemeSwitch from "./ThemeSwitch"
import { Menu, X, Phone, Mail, ArrowRight } from "lucide-react"
import Logo from "./Logo"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const pathname = location.pathname

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  // Close menu when resizing to larger screen
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isOpen])

  // Prevent hydration mismatch
  // if (!isMounted) {
  //   return (
  //     <header className="fixed top-0 z-50 w-full bg-white dark:bg-encora-green border-b border-gray-200 dark:border-encora-mint/20">
  //       <div className="container mx-auto px-4 sm:px-6">
  //         <nav className="flex items-center justify-between py-3 sm:py-4">
  //           <div className="flex items-center">
  //             <Link
  //               href="/"
  //               className={`group relative font-bold tracking-tight transition-all duration-500 text-lg sm:text-2xl ${scrolled
  //                 ? "text-encora-green dark:text-white"
  //                 : "text-white dark:text-encora-mint drop-shadow-lg"
  //                 }`}
  //             >
  //               <Logo />
  //             </Link>
  //           </div>
  //         </nav>
  //       </div>
  //     </header>
  //   )
  // }

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Listings" },
    { href: "/login", label: "Login" },
    { href: "/signup", label: "Sign Up" },
    { href: "/help", label: "Help & FAQ" },
    { href: "/settings", label: "Settings" },
    { href: "/terms", label: "Terms" },
    { href: "/privacy", label: "Privacy" },
    { href: "/contact-us", label: "Contact" }
  ]

  // Function to check if a menu item is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ease-out ${scrolled
      ? "bg-white/95 dark:bg-encora-green/95 backdrop-blur-xl shadow-2xl shadow-encora-green/10 dark:shadow-black/20 border-b border-encora-green/10 dark:border-encora-mint/20"
      : "bg-transparent backdrop-blur-none shadow-none border-none"
      }`}>

      {/* Animated Border Bottom - Only shows when scrolled */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-encora-green to-transparent dark:via-encora-mint opacity-60"></div>
      )}

      <div className="container mx-auto px-4 sm:px-6">
        <nav className="relative flex items-center justify-between py-3 sm:py-4">
          {/* Enhanced Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className={`group relative font-bold tracking-tight transition-all duration-500 text-lg sm:text-2xl ${scrolled
                ? "text-encora-green dark:text-white"
                : "text-white dark:text-encora-mint drop-shadow-lg"
                }`}
            >
              <Logo />
            </Link>
          </div>

          {/* Right side - Theme switch and menu */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Theme Switch */}
            <div className="flex items-center">
              <ThemeSwitch />
            </div>

            {/* Enhanced Menu Button */}
            <div className="relative flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`relative p-2 focus:outline-none transition-all duration-500 rounded-lg ${scrolled
                  ? "text-encora-green dark:text-white hover:bg-encora-green/10 dark:hover:bg-encora-mint/10"
                  : "text-white dark:text-encora-mint hover:bg-white/20 dark:hover:bg-encora-mint/20 backdrop-blur-sm"
                  }`}
                aria-label="Toggle menu"
              >
                <div className="relative w-5 h-5 sm:w-6 sm:h-6">
                  {isOpen ? (
                    <X
                      size={20}
                      className="sm:w-6 sm:h-6 transform rotate-0 scale-100 transition-all duration-300 text-encora-green dark:text-white"
                    />
                  ) : (
                    <Menu
                      size={20}
                      className="sm:w-6 sm:h-6 transform rotate-0 scale-100 transition-all duration-300 text-encora-green dark:text-white"
                    />
                  )}
                </div>

                {/* Menu Button Pulse Effect when not scrolled */}
                {!scrolled && !isOpen && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3">
                    <div className="absolute inset-0 bg-encora-mint rounded-full animate-ping opacity-75"></div>
                    <div className="absolute inset-0.5 bg-encora-mint rounded-full"></div>
                  </div>
                )}
              </button>

              {/* Desktop Dropdown Menu - NO SCROLLING NEEDED */}
              {isOpen && (
                <div className="hidden md:block absolute top-full mt-3 right-0 w-80 bg-white/95 dark:bg-encora-green/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-encora-mint/20 dark:border-encora-mint/30 animate-in slide-in-from-top-5 z-50">

                  {/* Menu Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-encora-mint/20 dark:border-white/20 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-encora-green dark:bg-encora-mint rounded-full animate-pulse"></div>
                      <p className="text-encora-text dark:text-white font-semibold">Navigation</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link
                        to="/signup"
                        onClick={() => setIsOpen(false)}
                        className="text-xs sm:text-sm font-semibold text-white dark:text-encora-green bg-encora-green dark:bg-encora-mint px-3 py-1.5 rounded-lg hover:bg-encora-green-dark dark:hover:bg-encora-mint-light transition-all duration-300 shadow-sm hover:shadow-md"
                      >
                        Sign In/Sign Up
                      </Link>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="p-2 cursor-pointer text-encora-green dark:text-white hover:bg-encora-green/10 dark:hover:bg-encora-mint/10 rounded-full transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Menu Links - Compact design with active states */}
                  <ul className="space-y-2 mb-4">
                    {menuItems.map((item, index) => {
                      const active = isActive(item.href)
                      return (
                        <li
                          key={item.href}
                          className="group flex items-center gap-2 transition-all duration-300 ease-out hover:translate-x-1"
                        >
                          <div className={`overflow-hidden transition-all duration-300 ease-out ${active ? 'max-w-3 opacity-100 ml-1' : 'max-w-0 opacity-0 group-hover:max-w-3 group-hover:opacity-100 group-hover:ml-1'} flex-shrink-0`}>
                            <div className={`w-3 h-3 rounded-full flex items-center justify-center ${active ? 'bg-encora-green dark:bg-encora-mint scale-110' : 'bg-encora-green dark:bg-encora-mint'}`}>
                              <ArrowRight size={8} className="text-white dark:text-encora-green" />
                            </div>
                          </div>
                          <Link
                            to={item.href}
                            className={`font-medium transition-all duration-300 py-2 flex-1 ${active
                              ? 'text-encora-green dark:text-encora-mint font-semibold'
                              : 'text-encora-text dark:text-white hover:text-encora-green dark:hover:text-encora-mint'
                              }`}
                            onClick={() => setIsOpen(false)}
                          >
                            {item.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>

                  {/* CTA Buttons - Compact */}
                  <div className="flex gap-2 mb-4">
                    <Link
                      to="/get-started"
                      className="flex-1 text-center text-encora-text dark:text-white text-sm font-semibold rounded-xl border border-encora-text/20 dark:border-white/20 py-2 px-3 hover:bg-encora-gray dark:hover:bg-encora-mint/10 transition-all duration-300 group"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                    <Link
                      to="/contact-us"
                      className="flex-1 text-center text-white dark:text-encora-green text-sm font-semibold rounded-xl bg-encora-green dark:bg-encora-mint py-2 px-3 hover:shadow-lg transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </Link>
                  </div>

                  {/* Contact Info - Compact */}
                  <div className="text-center border-t border-encora-mint/20 dark:border-white/20 pt-3">
                    <div className="flex flex-col gap-1 text-xs">
                      <a
                        className="flex items-center justify-center gap-1 text-encora-text/70 dark:text-white/70 hover:text-encora-text dark:hover:text-white transition-all duration-300"
                        href="tel:+1-212-456-7890"
                      >
                        <Phone size={12} />
                        +1-212-456-7890
                      </a>
                      <a
                        className="flex items-center justify-center gap-1 text-encora-text/70 dark:text-white/70 hover:text-encora-text dark:hover:text-white transition-all duration-300"
                        href="mailto:info@encora.com"
                      >
                        <Mail size={12} />
                        info@encora.com
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Full-screen Menu - Optimized layout */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-500"
          />

          {/* Menu Container - FIXED SCROLLING */}
          <div className="absolute inset-0 bg-white/95 dark:bg-encora-green/95 backdrop-blur-xl animate-in slide-in-from-top-5 duration-500 flex flex-col">

            {/* Menu Header */}
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-encora-mint/20 dark:border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-encora-green dark:bg-encora-mint rounded-full animate-pulse" />
                <p className="text-encora-text dark:text-white font-semibold text-lg">Navigation</p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-semibold text-white dark:text-encora-green bg-encora-green dark:bg-encora-mint px-4 py-2 rounded-lg hover:bg-encora-green-dark dark:hover:bg-encora-mint-light transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Sign In/Sign Up
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 cursor-pointer text-encora-green dark:text-white hover:bg-encora-green/10 dark:hover:bg-encora-mint/10 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Scrollable Content - FIXED */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="max-w-md mx-auto">
                {/* Menu Links with active states */}
                <ul className="flex flex-col gap-2 pb-6">
                  {menuItems.map((item, index) => {
                    const active = isActive(item.href)
                    return (
                      <li
                        key={item.href}
                        className="group flex items-center gap-3 transition-all duration-300 ease-out hover:translate-x-1"
                      >
                        <div className={`overflow-hidden transition-all duration-300 ease-out ${active ? 'max-w-4 opacity-100 ml-1' : 'max-w-0 opacity-0 group-hover:max-w-4 group-hover:opacity-100 group-hover:ml-1'} flex-shrink-0`}>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${active ? 'bg-encora-green dark:bg-encora-mint scale-110' : 'bg-encora-green dark:bg-encora-mint'}`}>
                            <ArrowRight size={10} className="text-white dark:text-encora-green" />
                          </div>
                        </div>
                        <Link
                          to={item.href}
                          className={`text-lg font-semibold transition-all duration-300 py-3 flex-1 border-b ${active
                            ? 'text-encora-green dark:text-encora-mint border-encora-green/30 dark:border-encora-mint/30'
                            : 'text-encora-text dark:text-white hover:text-encora-green dark:hover:text-encora-mint border-transparent hover:border-encora-green/20 dark:hover:border-encora-mint/20'
                            }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>

                {/* CTA Buttons */}
                <div className="flex flex-col gap-3 mb-6">
                  <Link
                    to="/get-started"
                    className="flex justify-center items-center gap-2 w-full text-encora-text dark:text-white text-base font-semibold rounded-2xl border border-encora-text/20 dark:border-white/20 py-3 px-5 hover:bg-encora-gray dark:hover:bg-encora-mint/10 hover:border-encora-green dark:hover:border-encora-mint transition-all duration-300 hover:shadow-lg group"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to="/contact-us"
                    className="flex justify-center items-center gap-2 w-full text-white dark:text-encora-green text-base font-semibold rounded-2xl bg-gradient-to-r from-encora-green to-encora-green-dark dark:from-encora-mint dark:to-encora-mint-light py-3 px-5 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact Us
                    <Mail size={16} className="transform group-hover:scale-110 transition-transform" />
                  </Link>
                </div>

                {/* Contact Info */}
                <div className="text-center border-t border-encora-mint/20 dark:border-white/20 pt-5">
                  <div className="flex flex-col gap-2">
                    <a
                      className="flex items-center justify-center gap-2 text-encora-text/70 dark:text-white/70 hover:text-encora-text dark:hover:text-white transition-all duration-300 group"
                      href="tel:+1-212-456-7890"
                    >
                      <Phone size={16} className="transform group-hover:scale-110" />
                      +1-212-456-7890
                    </a>
                    <a
                      className="flex items-center justify-center gap-2 text-encora-text/70 dark:text-white/70 hover:text-encora-text dark:hover:text-white transition-all duration-300 group"
                      href="mailto:info@encora.com"
                    >
                      <Mail size={16} className="transform group-hover:scale-110" />
                      info@encora.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="hidden md:block fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-in fade-in duration-500"
        />
      )}

    </header>
  )
}