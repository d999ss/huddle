'use client'

import { useState, useEffect } from 'react'

const TOTAL_SLIDES = 22

export const TigerPartnershipDeck = () => {
  const [current, setCurrent] = useState(0)
  const [printMode, setPrintMode] = useState(false)
  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const next = () => setCurrent((c) => Math.min(c + 1, TOTAL_SLIDES - 1))

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const s = parseInt(params.get('slide') || '', 10)
    if (!Number.isNaN(s)) setCurrent(Math.max(0, Math.min(s, TOTAL_SLIDES - 1)))
    if (params.get('print') !== null) setPrintMode(true)
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setCurrent((c) => Math.min(c + 1, TOTAL_SLIDES - 1))
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        setCurrent((c) => Math.max(c - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black">
      {printMode && (
        <style dangerouslySetInnerHTML={{ __html: '[aria-labelledby="cookie-wall-title"]{display:none!important}' }} />
      )}
      <div className="relative aspect-video w-full max-w-[1280px] overflow-hidden rounded-sm shadow-2xl">

        {/* 0: Cover */}
        <Slide index={0} current={current}>
          <div className="relative flex h-full flex-col justify-end bg-[#0a0a0a]">
            <div className="absolute inset-0">
              <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                <source src="/assets/work/uploads/2024/08/tiger-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
            </div>
            <div className="relative flex items-end justify-between px-20 pb-16">
              <div className="flex flex-col gap-4">
                <Label>Tiger BioSciences &times; Bttr</Label>
                <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-white">
                  The hard part is behind us. The growth is ahead.
                </h1>
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D2A62C]" />
                  <span className="font-mono text-xs tracking-widest text-[#D2A62C] uppercase">Bttr.</span>
                </div>
                <p className="text-xs text-neutral-400">Prepared for Matt Winter, CIO</p>
                <p className="text-xs text-neutral-500">Ben Holland &amp; Donny Smith</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 1: Agenda */}
        <Slide index={1} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>What we will cover</Label>
            <h2 className="text-4xl font-bold text-white">Four areas, one throughline</h2>
            <div className="grid grid-cols-2 gap-5">
              {[
                ['01', 'Services delivered', 'What has been built and what is live today'],
                ['02', 'The enterprise CMS', 'The platform and what it is architected to support'],
                ['03', 'Hosting & infrastructure', 'How the platform performs and scales'],
                ['04', 'Design system & foundation', 'The repositories and brand system behind it'],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-sm text-[#D2A62C]">{num}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-white">{title}</h3>
                    <p className="text-xs text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              One idea sits under all four: the expensive groundwork is finished, so everything from here is addition, not reconstruction.
            </p>
          </div>
        </Slide>

        {/* 2: The reframe */}
        <Slide index={2} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <Label>The real question</Label>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white">
              Judge the asset, not the aesthetics.
            </h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Behind you</span>
                <p className="text-sm leading-relaxed text-neutral-300">
                  A secure, enterprise-grade platform engineered for a multi-brand business and ready
                  for new divisions, acquisitions, and expansion. That investment is already made.
                </p>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D2A62C]">Ahead of you</span>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Bringing new brands, products, and experiences online. A fraction of the lift,
                  because the difficult engineering is already finished.
                </p>
              </div>
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              The choice isn't whether the site could be sharper. It could. It's whether starting over
              beats extending a platform that already runs in production, already scales, and already
              fits the way the business grows.
            </p>
          </div>
        </Slide>

        {/* 3: (1) Services delivered */}
        <Slide index={3} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>01</Badge>
              <div className="flex flex-col">
                <Label>Services delivered</Label>
                <h2 className="text-3xl font-bold text-white">A complete digital platform, live today</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                ['Corporate platform', 'Tiger BioSciences ecosystem site, launched and operating'],
                ['Divisional content', 'Wound Care, Aesthetics, Tissue Processing, International'],
                ['Leadership & company', 'Leadership platform, company, news, careers, donation'],
                ['Product experiences', 'ACAPatch, alloClae, Viality and the full product library'],
                ['Brand & photography', 'Unified visual system and imagery direction'],
                ['Ongoing dedicated team', 'Daily development, design, and creative support'],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              {['Digital Strategy', 'UX Design', 'UI Design', 'Web Development', 'Content Strategy', 'Accessibility'].map((d) => (
                <div key={d} className="flex items-center gap-2">
                  <Check className="text-[#D2A62C]" />
                  <span className="text-sm text-neutral-300">{d}</span>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 4: Visual proof gallery */}
        <Slide index={4} current={current}>
          <div className="flex h-full flex-col bg-[#0a0a0a]">
            <div className="grid h-full grid-cols-4 grid-rows-2 gap-1">
              {[
                '/assets/work/uploads/2024/08/tiger-biosciences-hero.webp',
                '/assets/work/uploads/2024/08/tiger-biosciences-platform.webp',
                '/assets/work/uploads/2024/08/tiger-wound-care.webp',
                '/assets/work/uploads/2024/08/tiger-aesthetics.webp',
                '/assets/work/uploads/2024/08/tiger-viality.webp',
                '/assets/work/uploads/2024/08/tiger-alloclae.jpg',
                '/assets/work/uploads/2024/08/tiger-acapatch.jpg',
                '/assets/work/uploads/2024/08/tiger-products.jpg',
              ].map((src, i) => (
                <div key={i} className="relative overflow-hidden bg-neutral-900">
                  <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute bottom-8 left-20">
              <Label>Live today</Label>
              <p className="mt-1 text-lg font-semibold text-white">One platform. Every division, product, and brand.</p>
            </div>
          </div>
        </Slide>

        {/* 5: (2) Enterprise CMS */}
        <Slide index={5} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>02</Badge>
              <div className="flex flex-col">
                <Label>The enterprise CMS</Label>
                <h2 className="text-3xl font-bold text-white">Built to carry the whole ecosystem</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-relaxed text-neutral-300">
                  A bespoke, secure headless CMS on Sanity. Content is modeled once and reused across
                  every brand and division, with structured governance instead of one-off pages.
                </p>
                <div className="flex flex-col gap-2.5">
                  {[
                    'Multi-brand, multi-division content model',
                    'Structured, reusable content across the ecosystem',
                    'Role-based editing and clear ownership',
                    'Architected for acquisitions and new business units',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <Check className="text-[#D2A62C]" />
                      <span className="text-sm text-neutral-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D2A62C]">The commitment</span>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Carrying many brands and divisions was the design goal from the start. The content
                  model is already in place, so standing up a new brand is a setup task, not another build.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 6: CMS deep-dive — content architecture */}
        <Slide index={6} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Custom CMS &middot; Content architecture</Label>
              <h2 className="text-3xl font-bold text-white">A structured model, not a page builder</h2>
            </div>
            <div className="grid grid-cols-[1fr_auto_1.5fr] items-center gap-6">
              <div className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D2A62C]">Company</span>
                <div className="flex flex-wrap gap-1.5">
                  {['name', 'logo', 'website', 'description'].map((f) => (
                    <span key={f} className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-300">{f}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500">referenced by</span>
                <svg width="44" height="12" viewBox="0 0 44 12" fill="none"><path d="M0 6h38m0 0l-5-5m5 5l-5 5" stroke="#D2A62C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#D2A62C]">Product</span>
                <div className="flex flex-wrap gap-1.5">
                  {['title', 'company →', 'category', 'fdaStatus', 'regions[]', 'heroImage', 'clinicalEvidence', 'resources[]'].map((f) => (
                    <span key={f} className="rounded bg-neutral-800 px-2 py-0.5 font-mono text-[11px] text-neutral-300">{f}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                ['Every entry is structured data', 'Typed fields, not freeform HTML the layout cannot trust'],
                ['Products belong to a company', 'A reference ties each product to its brand and keeps it in sync'],
                ['One model, every brand', 'The same schema powers all divisions and product lines'],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold text-white">{t}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 7: CMS deep-dive — regulated content model */}
        <Slide index={7} current={current}>
          <div className="flex h-full flex-col justify-center gap-6 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Custom CMS &middot; Regulated content model</Label>
              <h2 className="text-3xl font-bold text-white">Engineered for medical and regulatory rigor</h2>
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              The product model carries purpose-built fields for regulated medical content, so every product page
              presents the same compliant, structured information. Required fields are enforced before anything publishes.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                ['Regulatory', ['FDA status', 'Regulatory status', 'Intended use']],
                ['Clinical', ['Mechanism of action', 'Clinical validation', 'Clinical evidence', 'Clinical applications', 'Treatment protocol']],
                ['Technology & manufacturing', ['Technology platform', 'Manufacturing excellence', 'Compatible treatments']],
              ].map(([group, fields]) => (
                <div key={group as string} className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D2A62C]">{group as string}</span>
                  <div className="flex flex-col gap-2">
                    {(fields as string[]).map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <Check className="text-[#D2A62C]" />
                        <span className="text-sm text-neutral-300">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 8: CMS deep-dive — editorial & governance */}
        <Slide index={8} current={current}>
          <div className="flex h-full flex-col justify-center gap-6 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Custom CMS &middot; How the team works in it</Label>
              <h2 className="text-3xl font-bold text-white">Built so the team moves fast without breaking things</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-4">
              {[
                ['Validation on every record', 'Required fields block incomplete or non-compliant entries before publish'],
                ['Automatic URLs', 'Slugs generate from titles for clean, consistent routing'],
                ['Art-directed imagery', 'Image hotspots keep hero art framed correctly at every size'],
                ['References stay in sync', 'Update a company once and every linked product reflects it'],
                ['Instant structured queries', 'GROQ and the Vision tool pull exactly the content a view needs'],
                ['Headless by design', 'One content API feeds the website today and any channel next'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <Check className="mt-0.5 text-[#D2A62C]" />
                  <div className="flex flex-col gap-0.5">
                    <h3 className="text-sm font-semibold text-white">{t}</h3>
                    <p className="text-xs leading-relaxed text-neutral-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 9: (3) Hosting */}
        <Slide index={9} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>03</Badge>
              <div className="flex flex-col">
                <Label>Hosting &amp; infrastructure</Label>
                <h2 className="text-3xl font-bold text-white">Fast, reliable, and built to scale</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                ['AWS + Vercel', 'Enterprise hosting with multi-region delivery, auto-scaling, and failover'],
                ['Secure by default', 'Patched the Next.js advisory the same day it was published'],
                ['Scales with growth', 'Headroom for an ecosystem several times the current footprint'],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-8 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#D2A62C]">50+</span>
                <span className="text-xs text-neutral-500">commits the final weekend before launch</span>
              </div>
              <div className="h-12 w-px bg-neutral-800" />
              <p className="text-sm leading-relaxed text-neutral-300">
                A team fluent in this stack down to the last service. Handing it to anyone else means
                relearning all of it from scratch.
              </p>
            </div>
          </div>
        </Slide>

        {/* 10: (4) Design system & foundation */}
        <Slide index={10} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>04</Badge>
              <div className="flex flex-col">
                <Label>Design system &amp; foundation</Label>
                <h2 className="text-3xl font-bold text-white">A governed system, not a pile of pages</h2>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                ['6', 'GitHub repositories under active management'],
                ['1', 'Unified visual brand system with admin tooling'],
                ['Full', 'Product and divisional component library'],
                ['25+', 'Site sections built across the ecosystem'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-[#D2A62C]">{stat}</span>
                  <span className="text-xs leading-relaxed text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              One brand language, a single photographic standard, a coherent narrative, purpose-built
              product pages, and unambiguous ownership. All documented, all ready to build on.
            </p>
          </div>
        </Slide>

        {/* 11: Scale Tier governance scope */}
        <Slide index={11} current={current}>
          <div className="flex h-full flex-col justify-center gap-5 bg-[#0a0a0a] px-20 py-10">
            <div className="flex flex-col gap-1">
              <Label>Scale Tier &middot; Per signed SOW 10/10/2025</Label>
              <h2 className="text-3xl font-bold text-white">Enterprise Architecture &amp; Infrastructure Governance</h2>
            </div>
            <div className="flex gap-10 border-y border-neutral-800 py-3">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#D2A62C]">99.99%</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Uptime SLA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#D2A62C]">24 / 7</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Monitoring &amp; support</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-[#D2A62C]">&lt; 2 hr</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Incident response</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-x-8 gap-y-4">
              {[
                ['Infrastructure & hosting', ['AWS + Vercel enterprise hosting, multi-region, auto-scaling, failover', 'Isolated production & staging environments', 'Global CDN with custom edge logic', 'Twice-daily backups with full redundancy']],
                ['Security & compliance', ['SSL across all endpoints', 'Cloudflare DNS, DDoS protection, IP blocking', 'SOC 2 and HIPAA readiness alignment', 'Biannual compliance reviews']],
                ['Deployment & operations', ['Full CI/CD with automated deploys & previews', 'Ongoing CMS & platform updates with QA', 'CRM, ERP, and API integrations maintained', 'Performance tuning across all layers']],
                ['Monitoring & reliability', ['24/7 monitoring, sub-2-hour incident response', '99.99% uptime SLA on redundant infrastructure', 'Dedicated Slack incident channel']],
                ['Reporting & optimization', ['AI-driven SEO auditing and optimization', 'Monthly executive reporting tied to ROI']],
                ['Account & support', ['Dedicated Technical Account Manager', 'Unlimited support across hosting & ops', 'End-to-end ownership of the environment']],
              ].map(([title, items]) => (
                <div key={title as string} className="flex flex-col gap-2">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#D2A62C]">{title as string}</h3>
                  <ul className="flex flex-col gap-1">
                    {(items as string[]).map((it) => (
                      <li key={it} className="flex gap-1.5 text-[11px] leading-snug text-neutral-400">
                        <span className="text-[#D2A62C]">&middot;</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 12: The economics */}
        <Slide index={12} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <Label>The economics</Label>
            <h2 className="text-4xl font-bold text-white">What $36K a year actually buys</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                ['Dedicated development team', 'Daily engineering across the platform'],
                ['Dedicated creative team', 'Design, brand, and content direction'],
                ['Bespoke enterprise CMS', 'Custom platform supporting the ecosystem'],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                  <h3 className="text-sm font-semibold text-white">{title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{desc}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 rounded-xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-6">
              <span className="text-4xl font-bold text-[#D2A62C]">$3K<span className="text-lg text-neutral-400">/mo</span></span>
              <p className="text-sm leading-relaxed text-neutral-200">
                Recreating this somewhere else means more money, more time, and learning everything over
                from a blank page. Building on what's here is the faster, lower-risk path.
              </p>
            </div>
          </div>
        </Slide>

        {/* 13: Engagements */}
        <Slide index={13} current={current}>
          <div className="flex h-full flex-col justify-center gap-6 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>The engagement &middot; MSA September 24, 2025</Label>
              <h2 className="text-4xl font-bold text-white">Four signed engagements, senior-led and fixed-fee</h2>
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              Every engagement is scoped, priced, and signed as a fixed-fee statement of work before any work
              begins. No hourly billing, no open-ended retainers, senior practitioners throughout.
            </p>
            <div className="overflow-hidden rounded-xl border border-neutral-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-neutral-800 bg-neutral-900">
                    <th className="px-6 py-3 text-left font-medium text-neutral-400">Statement of work</th>
                    <th className="px-6 py-3 text-right font-medium text-neutral-400">Value</th>
                    <th className="px-6 py-3 text-right font-medium text-neutral-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {[
                    ['SOW 1 — Corporate Site & CMS Platform', '$250,000', 'Paid in full'],
                    ['SOW 2 — Managed Hosting, Scale Tier', '$3,000 / mo', 'Active'],
                    ['SOW 3 — Art Direction & Dermatology', '$3,500', 'Paid in full'],
                    ['SOW 4 — Site Refinement + Brand Readiness', '$13,750', 'Phase 1 paid'],
                  ].map(([sow, val, status]) => (
                    <tr key={sow}>
                      <td className="px-6 py-3 text-neutral-200">{sow}</td>
                      <td className="px-6 py-3 text-right font-mono text-neutral-300">{val}</td>
                      <td className="px-6 py-3 text-right text-[#D2A62C]">{status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-neutral-400">
              More than <span className="font-semibold text-white">$270,000</span> contracted across the relationship, nearly all paid in full.
            </p>
          </div>
        </Slide>

        {/* 14: Beyond scope */}
        <Slide index={14} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Beyond the contract</Label>
              <h2 className="text-4xl font-bold text-white">And a great deal more, in good faith</h2>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                ['A full brand design system', 'Spanning the Tiger brand portfolio, delivered pro bono to address the fragmenting brand sites'],
                ['Extra homepage directions', 'Multiple variations beyond the single approved direction'],
                ['Months of extended iteration', 'Continued design refinement well after the sprint had closed'],
                ['A consolidation blueprint', 'A plan to bring every Tiger brand site under one umbrella system and hosting'],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <h3 className="text-sm font-semibold text-white">{t}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{d}</p>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              None of this was billed. It was delivered to protect the brand while Tiger navigated a period of
              significant internal change.
            </p>
          </div>
        </Slide>

        {/* 15: Request volume */}
        <Slide index={15} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Six months of inbound</Label>
              <h2 className="text-4xl font-bold text-white">The volume behind the relationship</h2>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                ['230+', 'Individual emails, Dec 2025 to Jun 2026'],
                ['~9 / wk', 'Sustained, every week, for six months'],
                ['50+', 'Discrete work requests delivered'],
                ['$3K / mo', 'Flat retainer, no change orders'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-6">
                  <span className="text-3xl font-bold text-[#D2A62C]">{stat}</span>
                  <span className="text-xs leading-relaxed text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              A constant stream of requests, almost all turned around the same day or the next, absorbed inside a
              flat retainer while the Phase 2 statement of work went unsigned and invoices went unpaid.
            </p>
          </div>
        </Slide>

        {/* 16: What the requests were */}
        <Slide index={16} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>What they asked for</Label>
              <h2 className="text-4xl font-bold text-white">Every category of the build, on demand</h2>
            </div>
            <div className="grid grid-cols-[1.1fr_1fr] gap-14">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Requests by month</span>
                <div className="flex items-end gap-3">
                  {([['Dec', 4], ['Jan', 8], ['Feb', 7], ['Mar', 8], ['Apr', 10], ['May', 8], ['Jun', 5]] as [string, number][]).map(([m, v]) => (
                    <div key={m} className="flex flex-1 flex-col items-center gap-2">
                      <div className="flex h-40 w-full items-end">
                        <div className="w-full rounded-t bg-[#D2A62C]/70" style={{ height: `${v * 10}%` }} />
                      </div>
                      <span className="font-mono text-[10px] text-neutral-400">{v}</span>
                      <span className="font-mono text-[10px] text-neutral-600">{m}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">By type</span>
                <div className="flex flex-wrap gap-2">
                  {([['Imagery', 9], ['Homepage', 8], ['Meetings', 7], ['Press releases', 5], ['Admin', 5], ['Product pages', 4], ['Brand system', 4], ['Bug fixes', 3], ['Copy', 2], ['New business', 2], ['New build', 1]] as [string, number][]).map(([t, c]) => (
                    <div key={t} className="flex items-center gap-2 rounded-full bg-neutral-900 px-3 py-1.5">
                      <span className="text-xs text-neutral-300">{t}</span>
                      <span className="font-mono text-[11px] text-[#D2A62C]">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="font-mono text-[11px] text-neutral-600">Full itemized log at makebttr.com/briefs/tiger-activity-log</p>
          </div>
        </Slide>

        {/* 17: Responsiveness */}
        <Slide index={17} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Responsiveness</Label>
              <h2 className="text-4xl font-bold text-white">When it was urgent, it shipped that day</h2>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                ['Dec 29', 'Leadership bio corrected and live the same night'],
                ['Jan 7', 'Color-change request kicked off and delivered the next day'],
                ['Mar 31', 'carePAC launch — Sanity fixes resolved and live by the deadline'],
                ['Apr 1', 'carePAC press release and composite image, same day'],
                ['May 28', 'TIGERCAMP survey press release posted same day'],
                ['Jun 16', 'Two press releases posted on request, same day'],
              ].map(([d, t]) => (
                <div key={t} className="flex flex-col gap-2 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-xs text-[#D2A62C]">{d}</span>
                  <span className="text-sm leading-snug text-neutral-300">{t}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              This is the Scale Tier SLA in practice: a dedicated Slack channel, sub-2-hour response, and
              launch-day deadlines met without a change order or a rush fee.
            </p>
          </div>
        </Slide>

        {/* 18: Breadth */}
        <Slide index={18} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>Breadth</Label>
              <h2 className="text-4xl font-bold text-white">One team served the entire organization</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {[
                ['Tiger BioSciences', ['Hunter Zudans', 'Melissa DeMarinis', 'Steve Kulp', 'Shreya Medepalli', 'Brandon Davis', 'Rhonda Leopold', 'Chasity Strause']],
                ['Tiger Aesthetics', ['Annelise Norton', 'Eddie Carden']],
                ['Tiger International', ['Carmen Traub', 'Oliver Burckhardt', 'Astrid Burckhardt', 'Larry Wood', 'Jürgen Bresser']],
              ].map(([entity, people]) => (
                <div key={entity as string} className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#D2A62C]">{entity as string}</span>
                  <div className="flex flex-col gap-1.5">
                    {(people as string[]).map((p) => (
                      <span key={p} className="text-sm text-neutral-300">{p}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              Three entities, multiple divisions, and 15+ stakeholders coordinated through one accountable team,
              with the project management, scheduling, and follow-through handled on our side, not theirs.
            </p>
          </div>
        </Slide>

        {/* 19: Account standing */}
        <Slide index={19} current={current}>
          <div className="flex h-full flex-col justify-center gap-12 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-3">
              <Label>Account standing</Label>
              <h2 className="text-4xl font-bold text-white">Getting current is part of moving forward</h2>
            </div>
            <div className="grid grid-cols-[0.85fr_1.15fr] items-center gap-20">
              {/* Hero number */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#D2A62C]">Outstanding and due now</span>
                  <span className="text-7xl font-bold leading-none tracking-tight text-[#D2A62C]">$19,375</span>
                </div>
                <p className="max-w-xs text-sm leading-relaxed text-neutral-400">
                  Three open items. Settling brings the account fully current as we move into the next phase together.
                </p>
                <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-600">
                  Net 30 &middot; Per signed SOW 10/10/2025
                </span>
              </div>
              {/* Statement */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Outstanding item</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Amount</span>
                </div>
                {[
                  ['Creative direction & imagery', '$3,500'],
                  ['Realization phase (final invoice)', '$6,875'],
                  ['Monthly hosting, April through June', '$9,000'],
                ].map(([item, amt]) => (
                  <div key={item} className="flex items-center justify-between border-b border-neutral-900 py-4">
                    <span className="text-base text-neutral-200">{item}</span>
                    <span className="font-mono text-base text-neutral-300">{amt}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center justify-between rounded-lg bg-[#D2A62C]/10 px-4 py-4">
                  <span className="text-base font-semibold text-white">Total due now</span>
                  <span className="font-mono text-xl font-bold text-[#D2A62C]">$19,375</span>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 20: What forward looks like */}
        <Slide index={20} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <Label>What forward looks like</Label>
            <h2 className="max-w-4xl text-4xl font-bold leading-tight text-white">
              What changes when the platform meets a single, accountable owner
            </h2>
            <div className="flex flex-col gap-4">
              {[
                ['Single decision line', 'One owner, one direction, so choices stop stalling in committee.'],
                ['Governed brand system', 'A consistent voice and one photographic standard across every brand.'],
                ['Incremental roadmap', 'New brands and products ship on top of what exists, not from scratch.'],
                ['Clear ownership & higher standards', 'One team answerable for the whole platform, top to bottom.'],
              ].map(([title, desc], i) => (
                <div key={title} className="flex items-center gap-5">
                  <Badge>{String(i + 1)}</Badge>
                  <div>
                    <p className="font-semibold text-white">{title}</p>
                    <p className="text-sm text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 21: Close */}
        <Slide index={21} current={current}>
          <div className="relative flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, #D2A62C 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative flex flex-col gap-6">
              <Label>The ask</Label>
              <h2 className="max-w-3xl text-4xl font-bold leading-tight text-white">
                See what it looks like when it all connects.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-neutral-400">
                The platform already runs. Add a clear mandate and the authority to act on it, and it
                becomes the system the business actually needs.
              </p>
              <div className="mt-2 flex items-center gap-8">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#D2A62C]" />
                  <span className="font-mono text-sm tracking-widest text-[#D2A62C] uppercase">Bttr.</span>
                </div>
                <div className="text-sm text-neutral-400">
                  <span className="text-white">Ben Holland &amp; Donny Smith</span> &middot; makebttr.com
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* Nav dots */}
        <div className={`absolute bottom-4 left-0 right-0 flex items-center justify-center gap-1.5 ${printMode ? 'hidden' : ''}`}>
          {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === current ? 'w-6 bg-[#D2A62C]' : 'w-1.5 bg-neutral-700 hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

        {/* Counter */}
        <div className={`absolute bottom-4 right-6 font-mono text-xs text-neutral-600 ${printMode ? 'hidden' : ''}`}>
          {current + 1} / {TOTAL_SLIDES}
        </div>
      </div>
      <div className={`flex w-full max-w-[1280px] items-center justify-between px-1 ${printMode ? 'hidden' : ''}`}>
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all hover:border-neutral-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Previous slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button
          onClick={next}
          disabled={current === TOTAL_SLIDES - 1}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all hover:border-neutral-600 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed"
          aria-label="Next slide"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  )
}

function Slide({ index, current, children }: { index: number; current: number; children: React.ReactNode }) {
  if (index !== current) return null
  return <div className="absolute inset-0">{children}</div>
}

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`inline-block h-4 w-4 `} aria-hidden><path d="M13 4.5L6.5 11 3 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-xs tracking-widest text-[#D2A62C] uppercase">{children}</span>
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#D2A62C]/10">
      <span className="text-sm font-semibold text-[#D2A62C]">{children}</span>
    </div>
  )
}
