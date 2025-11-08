const ProductModules = () => {
  const modules = [
    {
      title: "Bins",
      description: "Intelligent bin management and tracking for efficient returns processing.",
      icon: "📦",
    },
    {
      title: "Tags",
      description: "Smart labeling and identification system for product categorization.",
      icon: "🏷️",
    },
    {
      title: "Verify",
      description: "Automated verification and compliance checking for all returns.",
      icon: "✓",
    },
    {
      title: "Connect",
      description: "Seamless integration with your existing retail and logistics systems.",
      icon: "🔗",
    },
  ]

  return (
    <section className="bg-encora-gray dark:bg-encora-green-dark section-spacing">
      <div className="container-encora">
        <div className="text-center mb-16">
          <h2 className="heading-lg mb-4 dark:text-white">Core Platform Modules</h2>
          <p className="body-text-lg max-w-2xl mx-auto dark:text-white/80">
            Encora's modular architecture gives you the flexibility to build the returns solution that fits your
            business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <div
              key={index}
              className="bg-white dark:bg-white/10 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-[#E0E0E0] dark:border-encora-mint/30 group hover:scale-105 backdrop-blur-sm"
            >
              <div className="icon-container mb-4 group-hover:bg-encora-mint dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-encora-green transition-all dark:bg-white/10">
                <span className="text-3xl">{module.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-encora-green dark:text-white mb-3">{module.title}</h3>
              <p className="body-text dark:text-white/70">{module.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductModules