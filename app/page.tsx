import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-2xl mx-auto px-8 py-16">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold mb-6 text-black leading-tight">
            Gradual Disempowerment
          </h1>
          <h2 className="text-2xl text-black mb-12 leading-tight">
            Misaligned Economy
          </h2>
        </div>

        {/* Table of Contents */}
        <div className="mb-12">
          <nav className="space-y-3">
            <div className="text-base font-bold text-black mb-4">Executive Summary</div>
            <div className="ml-4 space-y-2">
              <div className="text-base text-black">Misaligned Economy</div>
              <div className="ml-4 space-y-1">
                <Link href="#current-paradigm" className="block text-base text-black hover:text-neutral-600 transition-all duration-200">
                  The Current Economic Paradigm
                </Link>
                <Link href="#ai-disruptor" className="block text-base text-black hover:text-neutral-600 transition-all duration-200">
                  AI as a Unique Economic Disruptor
                </Link>
                <Link href="#human-alignment" className="block text-base text-black hover:text-neutral-600 transition-all duration-200">
                  Human Alignment of the Economy
                </Link>
                <Link href="#ai-transition" className="block text-base text-black hover:text-neutral-600 transition-all duration-200">
                  Transition to AI-dominated Economy
                </Link>
              </div>
              <div className="text-base text-black">Misaligned Culture</div>
              <div className="text-base text-black">Misaligned States</div>
              <div className="text-base text-black">Mutual Reinforcement</div>
              <div className="text-base text-black">Mitigating the Risk</div>
              <div className="text-base text-black">Related Work</div>
              <div className="text-base text-black">Conclusion</div>
            </div>
            <div className="text-base text-black mt-6">Full version on arXiv</div>
          </nav>
        </div>

        {/* Main Content */}
        <article className="space-y-8">
          <section id="current-paradigm">
            <h3 className="text-xl font-bold mb-6 text-black">
              The Current Economic Paradigm
            </h3>
            <div className="space-y-4 text-base text-black leading-relaxed">
              <p> *** This website is demo, not a real paper. ***  </>
              <p>
                The modern economy allocates goods and services mostly based on supply and demand. That 
                demand is largely driven by human desires and revealed preferences: US consumer spending is fairly 
                stable at around 70% of GDP<sup className="text-sm">[1]</sup>. Meanwhile, supply is also heavily driven by human labor (both 
                manual and cognitive): the share of US GDP directed towards paying for labor has stayed 
                remarkably stable at around 60% for over a century<sup className="text-sm">[2, 3]</sup>.<sup className="text-sm"> 1</sup> These statistics reflect the nature of the 
                modern economy: it is primarily a system of humans producing goods and services for other 
                humans, with human preferences and human capabilities driving the majority of both supply and 
                demand.
              </p>
              <p>
                To give a concrete example, individual consumers in economically developed areas can reliably 
                purchase coffee. This is possible because of the labor of countless individuals now and in the past, 
                mostly motivated by self-interest, to create and maintain a sophisticated system of production, 
                transportation, and distribution — from farmers and agricultural scientists to logistics workers and 
                baristas. As a consumer, the economy appears to helpfully provide goods and services. This apparent 
                alignment occurs because consumers have money to spend, which in turn is mainly because 
                consumers can perform useful economic work.<sup className="text-sm"> 2</sup>
              </p>
              <p>
                But AI has the potential to disrupt this dynamic in a way that no previous technology has. If AI 
                labor replaces human labor, then by default, money will cease to mainly flow to workers. I 
                elaborate on the consequences of this change in the remainder of this section.
              </p>
            </div>
          </section>
        </article>

        {/* Footer with references */}
        <footer className="mt-16 pt-8 border-t border-gray-200">
          <div className="space-y-3 text-sm text-black">
            <p>
              Marie Davidsen Buhl et al. (2024). Safety Cases for Frontier AI. <em>arXiv preprint 
              arXiv:2410.21572</em>
            </p>
            <p>
              Shevlane et al. (2023). Model Evaluation for Extreme Risks. <em>arXiv preprint 
              arXiv:2305.15324</em>
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
