const ResultsBand = () => {
  const results = [
    { metric: "Return ↑", description: "Increase product recovery value" },
    { metric: "Labor ↓", description: "Reduce processing costs" },
    { metric: "Shrink ↓", description: "Minimize inventory loss" },
    { metric: "Compliance ✓", description: "Ready for regulations" },
  ];

  return (
    <section className="bg-encora-green dark:bg-encora-green-dark text-white section-spacing">
      <div className="container-encora">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Proven Results</h2>
          <p className="text-lg font-light max-w-2xl mx-auto text-encora-mint">
            Tenant Verify customers see measurable improvements across all key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {results.map((result, index) => (
            // min-w-0 is important inside flex/grid to allow proper shrinking and avoid weird wrapping/clipping
            <div key={index} className="min-w-0">
              {/* group controls hover state; relative so overlay can be absolute */}
              <div className="group relative w-full h-full rounded-xl">
                {/* hover overlay: absolute, fills full area, behind content, pointer-events-none */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-xl bg-white/0 dark:bg-white/0 group-hover:bg-white/10 dark:group-hover:bg-white/5 transition-colors duration-300 pointer-events-none -z-10"
                />

                {/* actual content — keep it padding inside so overlay covers the padding area too */}
                <div className="text-center p-6 flex flex-col justify-center items-center gap-2">
                  <div className="text-4xl md:text-5xl font-bold text-encora-mint mb-0 whitespace-nowrap">
                    {result.metric}
                  </div>
                  <p className="text-white font-light text-base sm:text-lg text-center break-words max-w-[18rem]">
                    {result.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsBand;
