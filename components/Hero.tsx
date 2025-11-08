import { Link } from "react-router-dom"
import { useEffect, useRef } from "react"

export default function Hero() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "50px"
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in")
        }
      })
    }, observerOptions)

    // Observe all animate-on-scroll elements
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-br from-white via-encora-gray to-white dark:from-encora-green dark:via-encora-green-dark dark:to-encora-green min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Enhanced Background decorative elements with animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-encora-mint/10 dark:bg-encora-mint/20 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 -left-40 w-96 h-96 bg-encora-green/5 dark:bg-white/5 rounded-full blur-3xl animate-float-medium"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-encora-mint/5 dark:bg-encora-mint/10 rounded-full blur-3xl animate-pulse-slow"></div>

        {/* New animated elements */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-encora-mint/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-encora-green/40 rounded-full animate-bounce-medium delay-1000"></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-encora-mint/50 rounded-full animate-bounce-fast delay-500"></div>
      </div>

      <div className="container-encora relative z-10 px-4 sm:px-8 text-center">
        {/* Announcement badge with enhanced animation */}
        <div className="invisible md:visible md:inline-flex  items-center gap-2 px-4 py-2 mb-8 bg-white dark:bg-white/10 border border-encora-mint/30 dark:border-encora-mint/50 rounded-full shadow-sm backdrop-blur-sm animate-on-scroll hover:scale-105 transition-transform duration-300 cursor-pointer group ">
          <span className="flex items-center justify-center w-2 h-2 bg-encora-mint rounded-full animate-ping-slow"></span>
          <span className="text-sm font-medium text-encora-green dark:text-white group-hover:text-encora-green-dark dark:group-hover:text-encora-mint transition-colors">
          Building a Greener Future, One Scan at a Time
          </span>
        </div>

        {/* Main headline with enhanced gradient animation */}
        <div className="animate-on-scroll">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
            <span className="block text-encora-green dark:text-white leading-tight animate-text-focus">
            Scan It For 
            </span>
            <span className="block bg-gradient-to-r from-encora-green via-encora-mint to-encora-green dark:from-encora-mint dark:via-white dark:to-encora-mint bg-clip-text text-transparent leading-tight animate-gradient-flow bg-[length:200%_auto]">
            The Planet
            </span>
          </h1>
        </div>

        {/* Subheading with staggered animation */}
        <div className="animate-on-scroll">
          <p className="text-xl sm:text-2xl text-encora-text/80 dark:text-white/80 mb-4 max-w-3xl mx-auto font-light leading-relaxed">
          Encora's patent pending enterprise smart collection system for reusable food and beverage containers are safe, healthy and the most sustainable way to enjoy takeout food.          </p>
        </div>

        {/* Key value props with staggered animation */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm sm:text-base text-encora-green/70 dark:text-encora-mint">
          {[
            { text: "Safe & Hygienic Containers" },
            { text: "Smart Reuse for Takeout" },
            { text: "Sustainable & Eco-Friendly" }
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 animate-on-scroll hover:scale-110 transition-transform duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <svg className="w-5 h-5 text-encora-mint dark:text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons with enhanced animations */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-12">
          <Link
            to="/pilot"
            className="group bg-encora-green dark:bg-white text-white dark:text-encora-green px-8 py-3 rounded-lg text-base font-semibold hover:bg-encora-green-dark dark:hover:bg-encora-mint transition-all duration-500 shadow-sm hover:shadow-xl inline-flex items-center justify-center gap-2 animate-on-scroll hover:scale-105 transform hover:-translate-y-1"
            style={{ animationDelay: '300ms' }}
          >
            <span className="relative overflow-hidden">
              <span className="block group-hover:animate-pulse">Get Started</span>
            </span>
            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          {/* <Link
            href="/docs"
            className="group border-2 border-encora-mint dark:border-white text-encora-green dark:text-white px-8 py-3 rounded-lg text-base font-semibold hover:bg-encora-gray dark:hover:bg-white/10 transition-all duration-500 inline-flex items-center justify-center gap-2 animate-on-scroll hover:scale-105 transform hover:-translate-y-1"
            style={{ animationDelay: '400ms' }}
          >
            <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            <span className="relative overflow-hidden">
              <span className="block group-hover:animate-pulse">Developer Docs</span>
            </span>
          </Link> */}
        </div>

        {/* Social proof / Stats with counting animation */}
        {/* <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-8 border-t border-encora-green/10 dark:border-white/20">
          {[
            { number: "500K+", label: "Returns Processed" },
            { number: "50+", label: "Enterprise Clients" },
            { number: "99.9%", label: "Uptime SLA" }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-on-scroll hover:scale-110 transition-transform duration-300 cursor-pointer"
              style={{ animationDelay: `${500 + (index * 100)}ms` }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-encora-green dark:text-white mb-1">
                {stat.number}
              </div>
              <div className="text-sm text-encora-text/60 dark:text-white/60">{stat.label}</div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  )
}