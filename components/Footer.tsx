import { useState, useEffect } from 'react';
import {
  AiOutlineFacebook,
  AiOutlineX,
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineRocket,
  AiOutlineMail,
  AiOutlineArrowRight,
  AiOutlineHeart
} from "react-icons/ai";
import { FiArrowUpRight, FiPackage, FiRefreshCw } from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const socialLinks = [
    { Icon: AiOutlineFacebook, label: "Facebook", color: "hover:text-blue-400" },
    { Icon: AiOutlineLinkedin, label: "LinkedIn", color: "hover:text-blue-500" },
    { Icon: AiOutlineInstagram, label: "Instagram", color: "hover:text-pink-500" },
    { Icon: AiOutlineX, label: "X", color: "hover:text-gray-800" },
    { Icon: AiOutlineGithub, label: "GitHub", color: "hover:text-gray-400" }
  ];

  // Only 7 links as requested
  const footerLinks = [
    { name: "Features", icon: FiPackage },
    { name: "Pricing", icon: FiRefreshCw },
    { name: "About", icon: AiOutlineHeart },
    { name: "Blog", icon: AiOutlineMail },
    { name: "Careers", icon: AiOutlineRocket },
    { name: "Privacy", icon: FiArrowUpRight },
    { name: "Contact", icon: AiOutlineArrowRight }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-encora-dark-green to-encora-green text-white overflow-hidden">
      {/* Background Elements - Responsive */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-4 w-48 h-48 sm:top-1/4 sm:left-10 sm:w-72 sm:h-72 bg-encora-blue/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-4 w-56 h-56 sm:bottom-1/4 sm:right-10 sm:w-96 sm:h-96 bg-encora-mint/20 rounded-full blur-2xl sm:blur-3xl animate-pulse-slower"></div>
      </div>

      {/* Mobile-optimized particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-encora-mint/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className={`py-12 sm:py-16 lg:py-20 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Brand Section - Mobile First */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex justify-center items-center mb-6 sm:mb-8">
              {/* Responsive Logo Container */}
              <div className="relative group">
                <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-encora-mint to-encora-blue rounded-2xl sm:rounded-3xl blur-md sm:blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500"></div>

                <div className="relative bg-gradient-to-br from-encora-mint via-encora-blue to-encora-purple p-0.5 sm:p-1 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-2xl">
                  <div className="bg-gray-900 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="relative">
                        <AiOutlineRocket className="w-6 h-6 sm:w-8 sm:h-8 text-encora-mint animate-bounce-slow" />
                      </div>
                      <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-encora-mint to-white bg-clip-text text-transparent">
                        ENCORA
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Tagline */}
            <div className="mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white via-encora-mint to-encora-blue bg-clip-text text-transparent leading-tight">
                Smart Return
                <br />
                <span className="bg-gradient-to-r from-encora-mint to-encora-blue bg-clip-text text-transparent">
                  Infrastructure
                </span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-encora-mint/80 max-w-2xl mx-auto leading-relaxed px-4">
                Revolutionizing returns with AI-powered efficiency.
                <span className="block text-encora-mint/60 text-sm sm:text-base md:text-lg mt-1 sm:mt-2">
                  Transform your reverse logistics with intelligent automation.
                </span>
              </p>
            </div>

            {/* Responsive Stats Bar */}
            <div className="flex justify-center items-center space-x-6 sm:space-x-8 lg:space-x-12 mb-8 sm:mb-12 px-4">
              {[
                { number: "99.9%", label: "Uptime" },
                { number: "2.5M+", label: "Returns" },
                { number: "40%", label: "Cost Save" }
              ].map((stat, index) => (
                <div key={stat.label} className="text-center group">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-encora-mint group-hover:scale-110 transform transition-all duration-300">
                    {stat.number}
                  </div>
                  <div className="text-encora-mint/60 text-xs sm:text-sm mt-1 group-hover:text-encora-mint transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Section - Responsive */}
          <div className="bg-gradient-to-r from-encora-green/30 to-encora-blue/30 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 mb-12 sm:mb-16 border border-white/20 shadow-xl sm:shadow-2xl max-w-4xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-encora-mint bg-clip-text text-transparent">
                Transform Your Returns
              </h3>
              <p className="text-encora-mint/80 text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
                Join 2,000+ companies using Encora to streamline their return processes.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-2xl mx-auto">
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="w-full bg-white/15 backdrop-blur-md border border-white/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-5 text-white placeholder-encora-mint/60 focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-encora-mint/50 focus:border-transparent transition-all duration-300 text-sm sm:text-base lg:text-lg"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group bg-gradient-to-r from-encora-mint to-encora-blue text-encora-green font-bold rounded-xl sm:rounded-2xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-5 hover:shadow-xl sm:hover:shadow-2xl hover:scale-105 transform transition-all duration-300 flex items-center justify-center space-x-2 sm:space-x-3 min-w-[140px] sm:min-w-[160px] lg:min-w-[200px] text-sm sm:text-base lg:text-lg"
                >
                  <span>Get Started</span>
                  <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>

          {/* 7 Links Grid - Fully Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {footerLinks.map((link, index) => (
              <div key={link.name} className="text-center group">
                <a
                  href="#"
                  className="inline-flex flex-col items-center space-y-2 sm:space-y-3 p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-encora-mint/50 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-lg sm:hover:shadow-2xl"
                >
                  <div className="relative">
                    <link.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-encora-mint group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-2 sm:-inset-3 bg-encora-mint/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <span className="text-white font-medium text-xs sm:text-sm lg:text-base group-hover:text-encora-mint transition-colors duration-300 whitespace-nowrap">
                    {link.name}
                  </span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Responsive */}
        <div className={`border-t border-white/20 pt-8 sm:pt-12 pb-6 sm:pb-8 flex flex-col lg:flex-row justify-between items-center space-y-4 sm:space-y-6 lg:space-y-0 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center lg:text-left order-2 lg:order-1">
            <p className="text-encora-mint/80 font-light text-sm sm:text-base flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2">
              <span>&copy; {currentYear} Encora Technologies.</span>
              <span className="text-encora-mint/60">All rights reserved.</span>
            </p>
            <p className="text-encora-mint/60 text-xs sm:text-sm mt-1">
              Building the future of intelligent returns
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 order-1 lg:order-2">
            {/* Social Links - Responsive */}
            <div className="flex space-x-2 sm:space-x-3">
              {socialLinks.map(({ Icon, label, color }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 transition-all duration-300 hover:scale-110 hover:shadow-lg sm:hover:shadow-xl hover:border-encora-mint/50 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-encora-mint/20 to-encora-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-encora-mint ${color} relative z-10 transition-colors duration-300`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer




// import { AiOutlineFacebook, AiOutlineX, AiOutlineGithub, AiOutlineLinkedin, AiOutlineInstagram } from "react-icons/ai"

// const Footer = () => {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className="bg-gradient-to-br from-encora-green via-encora-green/95 to-encora-dark-green text-white relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
//       <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-encora-mint/10 rounded-full blur-3xl"></div>
//       <div className="absolute -top-32 -left-32 w-64 h-64 bg-encora-blue/10 rounded-full blur-3xl"></div>

//       <div className="container mx-auto px-4 relative z-10">
//         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16">
//           {/* Company Info */}
//           <div className="md:col-span-2 lg:col-span-2">
//             <div className="flex items-center mb-6">
//               <div className="w-10 h-10 bg-gradient-to-r from-encora-mint to-encora-blue rounded-lg flex items-center justify-center mr-3 shadow-lg">
//                 <span className="font-bold text-encora-green text-lg">E</span>
//               </div>
//               <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-encora-mint bg-clip-text text-transparent">
//                 Encora
//               </h3>
//             </div>
//             <p className="text-encora-mint/90 font-light text-lg leading-relaxed max-w-md mb-6">
//               Smart Return Infrastructure Platform revolutionizing the way businesses handle returns and exchanges.
//             </p>
//             <div className="flex space-x-3">
//               <a
//                 href="#"
//                 className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-lg px-6 py-3 text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-encora-mint/50"
//               >
//                 Get Started
//               </a>
//               <a
//                 href="#"
//                 className="bg-transparent hover:bg-white/10 backdrop-blur-sm border border-encora-mint/50 rounded-lg px-6 py-3 text-sm font-medium text-encora-mint transition-all duration-300 hover:scale-105 hover:shadow-lg"
//               >
//                 Contact Sales
//               </a>
//             </div>
//           </div>

//           {/* Product Links */}
//           <div>
//             <h4 className="font-bold text-lg mb-6 relative inline-block">
//               Product
//               <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-encora-mint rounded-full"></span>
//             </h4>
//             <ul className="space-y-4">
//               {['Features', 'Pricing', 'Security', 'API Docs', 'Integrations'].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-encora-mint/80 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group font-light"
//                   >
//                     <span className="w-1 h-1 bg-encora-mint rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Company Links */}
//           <div>
//             <h4 className="font-bold text-lg mb-6 relative inline-block">
//               Company
//               <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-encora-mint rounded-full"></span>
//             </h4>
//             <ul className="space-y-4">
//               {['About', 'Blog', 'Careers', 'Press', 'Partners'].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-encora-mint/80 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group font-light"
//                   >
//                     <span className="w-1 h-1 bg-encora-mint rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Legal Links */}
//           <div>
//             <h4 className="font-bold text-lg mb-6 relative inline-block">
//               Legal
//               <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-encora-mint rounded-full"></span>
//             </h4>
//             <ul className="space-y-4">
//               {['Privacy', 'Terms', 'Security', 'Compliance', 'Contact'].map((item) => (
//                 <li key={item}>
//                   <a
//                     href="#"
//                     className="text-encora-mint/80 hover:text-white transition-all duration-300 hover:translate-x-2 flex items-center group font-light"
//                   >
//                     <span className="w-1 h-1 bg-encora-mint rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                     {item}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="border-t border-white/20 pt-8 pb-12 flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
//           <div className="text-center lg:text-left">
//             <p className="text-encora-mint/80 font-light">
//               &copy; {currentYear} Encora Technologies. All rights reserved.
//             </p>
//             <p className="text-encora-mint/60 text-sm mt-2">
//               Building the future of return management
//             </p>
//           </div>

//           <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
//             {/* Newsletter Signup */}
//             <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
//               <input
//                 type="email"
//                 placeholder="Subscribe to newsletter"
//                 className="bg-transparent border-none outline-none text-encora-mint placeholder-encora-mint/60 text-sm w-48"
//               />
//               <button className="bg-encora-mint text-encora-green hover:bg-encora-mint/90 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:scale-105">
//                 →
//               </button>
//             </div>

//             {/* Social Links */}
//             <div className="flex space-x-4">
//               {[
//                 { Icon: AiOutlineFacebook, label: "Facebook" },
//                 { Icon: AiOutlineLinkedin, label: "LinkedIn" },
//                 { Icon: AiOutlineInstagram, label: "Instagram" },
//                 { Icon: AiOutlineX, label: "X (formerly Twitter)" },
//                 { Icon: AiOutlineGithub, label: "GitHub" }
//               ].map(({ Icon, label }) => (
//                 <a
//                   key={label}
//                   href="#"
//                   aria-label={label}
//                   className="bg-white/10 hover:bg-encora-mint backdrop-blur-sm border border-white/20 rounded-lg p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-encora-mint/50 group"
//                 >
//                   <Icon className="w-5 h-5 text-encora-mint group-hover:text-encora-green transition-colors duration-300" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer