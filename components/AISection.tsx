const AISection = () => {
    const features = [
        {
            title: "Intelligent Routing",
            description: "AI-powered decision engine routes returns to the optimal destination based on condition, value, and market demand.",
            icon: "🧠",
            stat: "40% faster",
        },
        {
            title: "Compliance Ready",
            description: "Built-in support for extended producer responsibility (EPR) regulations and circular economy mandates.",
            icon: "📋",
            stat: "100% compliant",
        },
        {
            title: "Predictive Analytics",
            description: "Machine learning models predict return patterns and optimize inventory placement for maximum recovery value.",
            icon: "📊",
            stat: "25% ↑ recovery",
        },
    ]

    return (
        <section className="bg-white dark:bg-encora-green-dark section-spacing border-t border-b border-[#E0E0E0] dark:border-encora-mint/30">
            <div className="container-encora">
                <div className="text-center mb-16">
                    <h2 className="heading-lg mb-4 dark:text-white">AI Where It Matters</h2>
                    <p className="body-text-lg max-w-2xl mx-auto dark:text-white/80">
                        Advanced intelligence meets operational simplicity. Tenant Verify's AI works behind the scenes to optimize every return decision.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-white/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0] dark:border-encora-mint/30 group hover:border-encora-mint backdrop-blur-sm"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="icon-container group-hover:bg-encora-mint dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-encora-green transition-all dark:bg-white/10">
                                    <span className="text-3xl">{feature.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <div className="inline-block px-3 py-1 bg-encora-mint dark:bg-white text-encora-green dark:text-encora-green text-xs font-bold rounded-full mb-2">
                                        {feature.stat}
                                    </div>
                                    <h3 className="text-xl font-bold text-encora-green dark:text-white mb-2">{feature.title}</h3>
                                </div>
                            </div>
                            <p className="body-text leading-relaxed dark:text-white/70">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// export default AISectionconst AISection = () => {
//   const features = [
//     {
//       title: "Intelligent Routing",
//       description: "AI-powered decision engine routes returns to the optimal destination based on condition, value, and market demand.",
//       icon: "🧠",
//       stat: "40% faster",
//     },
//     {
//       title: "Compliance Ready",
//       description: "Built-in support for extended producer responsibility (EPR) regulations and circular economy mandates.",
//       icon: "📋",
//       stat: "100% compliant",
//     },
//     {
//       title: "Predictive Analytics",
//       description: "Machine learning models predict return patterns and optimize inventory placement for maximum recovery value.",
//       icon: "📊",
//       stat: "25% ↑ recovery",
//     },
//   ]

//   return (
//     <section className="bg-white section-spacing border-t border-b border-[#E0E0E0]">
//       <div className="container-encora">
//         <div className="text-center mb-16">
//           <h2 className="heading-lg mb-4">AI Where It Matters</h2>
//           <p className="body-text-lg max-w-2xl mx-auto">
//             Advanced intelligence meets operational simplicity. Tenant Verify's AI works behind the scenes to optimize every return decision.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="card-module group hover:border-encora-mint"
//             >
//               <div className="flex items-start gap-4 mb-4">
//                 <div className="icon-container group-hover:bg-encora-mint group-hover:text-white transition-all">
//                   <span className="text-3xl">{feature.icon}</span>
//                 </div>
//                 <div className="flex-1">
//                   <div className="inline-block px-3 py-1 bg-encora-mint text-encora-green text-xs font-bold rounded-full mb-2">
//                     {feature.stat}
//                   </div>
//                   <h3 className="text-xl font-bold text-encora-green mb-2">{feature.title}</h3>
//                 </div>
//               </div>
//               <p className="body-text leading-relaxed">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

export default AISection