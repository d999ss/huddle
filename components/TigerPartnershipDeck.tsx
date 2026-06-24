'use client'

import { useState, useEffect, useRef, Fragment } from 'react'

const TOTAL_SLIDES = 14

export const TigerPartnershipDeck = () => {
  const [current, setCurrent] = useState(0)
  const [printMode, setPrintMode] = useState(false)
  const [scale, setScale] = useState(1)
  const touchX = useRef<number | null>(null)
  const prev = () => setCurrent((c) => Math.max(c - 1, 0))
  const next = () => setCurrent((c) => Math.min(c + 1, TOTAL_SLIDES - 1))

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current
    if (dx < -45) next()
    else if (dx > 45) prev()
    touchX.current = null
  }

  useEffect(() => {
    const fit = () => setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720))
    fit()
    window.addEventListener('resize', fit)
    window.addEventListener('orientationchange', fit)
    return () => {
      window.removeEventListener('resize', fit)
      window.removeEventListener('orientationchange', fit)
    }
  }, [])

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
    <div
      className="relative flex h-[100dvh] w-screen items-center justify-center overflow-hidden bg-black"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div
        className="relative shrink-0 overflow-hidden bg-[#0a0a0a]"
        style={
          printMode
            ? { width: 1280, height: 720 }
            : { width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: 'center center' }
        }
      >

        {/* 0: Cover */}
        <Slide index={0} current={current}>
          <div className="relative flex h-full flex-col justify-end bg-[#0a0a0a]">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-30">
              <source src="/assets/work/uploads/2024/08/tiger-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent" />
            <div className="relative flex flex-col gap-5 px-24 pb-28">
              <h1 className="max-w-4xl text-6xl font-semibold leading-[1.05] tracking-tight">
                <span className="text-white">Tiger BioSciences</span>
                <br />
                <span className="text-neutral-500">Platform Review</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-balance text-neutral-400">
                More than a website. Six months of decisions, infrastructure, and institutional knowledge.
              </p>
            </div>
            <span className="absolute bottom-8 left-24 font-mono text-[11px] tracking-[0.2em] text-neutral-600">
              PREPARED FOR MATT WINTER, CIO &amp; CARMEN TRAUB
            </span>
            <Wordmark />
          </div>
        </Slide>

        {/* 1: Contents */}
        <Slide index={1} current={current}>
          <Frame page="02">
            <Eyebrow>Contents</Eyebrow>
            <div className="mt-2 flex flex-col">
              {[
                ['Services delivered', '01'],
                ['The CMS platform', '02'],
                ['Hosting & infrastructure', '03'],
                ['Technical designs', '04'],
                ['The partnership, and what comes next', '05'],
              ].map(([item, n]) => (
                <div key={item} className="flex items-baseline justify-between border-b border-neutral-800 py-5">
                  <span className="text-2xl font-medium text-neutral-200">{item}</span>
                  <span className="font-mono text-sm tracking-widest text-neutral-500">{n}</span>
                </div>
              ))}
            </div>
          </Frame>
        </Slide>

        {/* 2: Q1 — Services delivered */}
        <Slide index={2} current={current}>
          <Frame page="03">
            <SectionHead eyebrow="Services delivered" title="Everything is built and live today." />
            <div className="grid grid-cols-5 gap-8">
              {([
                ['Platform', ['Custom Sanity CMS', 'Multi-brand model', 'AWS + Google Cloud hosting', 'CI/CD & staging', 'Security & backups', 'Cloudflare DNS + DDoS', 'Image pipeline & CDN', 'Role-based editing']],
                ['Corporate site', ['Ecosystem homepage', 'Company & companies', 'Leadership & people', 'News & press room', 'Careers & contact', 'Donation', 'Vision & values', 'Global navigation & IA']],
                ['Divisions', ['Wound Care', 'Aesthetics', 'Tissue Processing', 'International', 'Expertise pages', 'Dermatology landing', 'Division taxonomy', 'Cross-division routing']],
                ['Products & science', ['Full product library', 'Product detail pages', 'Pipeline & publications', 'Clinical evidence', 'Research & gallery', 'Mechanism of action', 'Regulatory status', 'Treatment protocols']],
                ['Brand & operations', ['Brand design system', 'Brand guidelines', 'Logo suite', 'Division logos', 'Photography & art direction', 'Press release publishing', 'Survey tools', 'Ongoing dev & design']],
              ] as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cat}</span>
                  <div className="flex flex-col gap-3.5 border-t border-neutral-800 pt-4">
                    {items.map((it) => (
                      <span key={it} className="text-base leading-snug text-neutral-300">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Note>And this is roughly a fifth of it. A complete ecosystem in production today, not a project in progress.</Note>
          </Frame>
        </Slide>

        {/* 3: Q2 — The CMS platform */}
        <Slide index={3} current={current}>
          <Frame page="04">
            <SectionHead eyebrow="The CMS platform" title="A Tiger Enterprise CMS, built to carry every brand." />
            <div className="grid grid-cols-3 gap-12">
              {([
                ['Content model', ['Product & Company document types', 'Structured, typed fields', 'References keep brands in sync', 'Modeled once, reused everywhere', 'Slug-based clean routing']],
                ['Regulated by design', ['FDA status', 'Regulatory status', 'Mechanism of action', 'Clinical validation & evidence', 'Intended use', 'Treatment protocols']],
                ['Editorial & governance', ['Required-field validation', 'Role-based editing & ownership', 'Multi-user team collaboration', 'Secure login and publishing', 'Art-directed image pipeline', 'GROQ + Vision querying', 'Headless API to any channel', 'Draft and publish workflow']],
              ] as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cat}</span>
                  <div className="flex flex-col gap-3.5 border-t border-neutral-800 pt-4">
                    {items.map((it) => (
                      <span key={it} className="text-base leading-snug text-neutral-300">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Note>
              Architected from day one for multiple brands, business units, and acquisitions. Standing up a new
              brand is configuration, not reconstruction.
            </Note>
          </Frame>
        </Slide>

        {/* 4: Q3 — Hosting & infrastructure */}
        <Slide index={4} current={current}>
          <Frame page="05">
            <SectionHead eyebrow="Hosting & infrastructure · Scale Tier" title="Enterprise hosting, secured and built to scale." />
            <div className="flex gap-14 border-t border-neutral-800 pt-4">
              {[
                ['99.99%', 'Uptime SLA'],
                ['< 2 hr', 'Incident response'],
                ['24 / 7', 'Monitoring'],
                ['Twice daily', 'Backups'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-semibold tracking-tight text-white">{stat}</span>
                  <span className="text-xs text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-12">
              {([
                ['Infrastructure', ['AWS + Google Cloud premium hosting', 'Multi-region delivery', 'Auto-scaling + failover', 'Custom CDN logic', 'Dedicated environment isolation']],
                ['Security & compliance', ['SOC 2 / HIPAA readiness', 'SSL across all endpoints', 'Cloudflare DNS + DDoS', 'IP blocking', 'Biannual compliance review']],
                ['Operations & support', ['Full CI/CD with previews', 'CRM / ERP / API integrations', 'AI-driven SEO audits', 'Dedicated Technical Account Manager', 'Dedicated Slack incident channel']],
              ] as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cat}</span>
                  <div className="flex flex-col gap-3 border-t border-neutral-800 pt-4">
                    {items.map((it) => (
                      <span key={it} className="text-base leading-snug text-neutral-300">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Note>
              The Scale Tier is the top of three service tiers, selected by Tiger and renewed quarterly. Unlimited
              support, monthly executive reporting, and a dedicated account manager included.
            </Note>
          </Frame>
        </Slide>

        {/* 5: Q4 — Technical designs */}
        <Slide index={5} current={current}>
          <Frame page="06">
            <SectionHead eyebrow="Technical designs" title="A documented design system and technical foundation." />
            <div className="grid grid-cols-4 gap-10 border-t border-neutral-800 pt-6">
              {[
                ['6', 'GitHub repositories under management'],
                ['1', 'Unified visual brand system'],
                ['Full', 'Product & divisional component library'],
                ['25+', 'Site sections across the ecosystem'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-white">{stat}</span>
                  <span className="text-sm leading-relaxed text-neutral-400">{label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-12">
              {([
                ['Design system', ['Unified visual language', 'Typography & color tokens', 'Component library', 'Layout & spacing system', 'Brand book & guidelines']],
                ['Engineering', ['Next.js + TypeScript', 'Reusable component architecture', 'Versioned in 6 repositories', 'CI/CD & preview environments', 'Documented & maintained']],
                ['Governance & operations', ['Ownership model', 'Production workflows', 'QA & review process', 'Asset & content pipeline', 'Ready to extend']],
              ] as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="flex flex-col gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cat}</span>
                  <div className="flex flex-col gap-3 border-t border-neutral-800 pt-4">
                    {items.map((it) => (
                      <span key={it} className="text-base leading-snug text-neutral-300">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Note>New work arrives on-brand and on-architecture by default, not by cleanup.</Note>
          </Frame>
        </Slide>

        {/* 6: The shift */}
        <Slide index={6} current={current}>
          <Frame page="07">
            <SectionHead eyebrow="Where this goes next" title="What changes when the Tiger Digital Ecosystem meets a single, accountable team." />
            <div className="grid grid-cols-2 gap-x-16 gap-y-7 border-t border-neutral-800 pt-6">
              {[
                ['One decision line', 'One owner and one direction, so creative and technical calls get made quickly instead of stalling across a committee. Decisions land, work ships, and momentum compounds week over week.'],
                ['Governed brand system', 'A single voice, one visual standard, and shared components enforced across every brand and division. The ecosystem stays coherent as it grows, without constant cleanup or drift.'],
                ['Incremental roadmap', 'New brands, products, and experiences ship on top of the platform that already exists. Each addition is configuration on a proven foundation, not another rebuild from scratch.'],
                ['Clear ownership', 'One accountable team owns uptime, security, performance, and the roadmap end to end, instead of fragmented vendors pointing at each other when something breaks.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-2">
                  <p className="text-xl font-medium text-white">{title}</p>
                  <p className="max-w-xl text-base leading-relaxed text-neutral-400">{desc}</p>
                </div>
              ))}
            </div>
          </Frame>
        </Slide>

        {/* 7: A normal month */}
        <Slide index={7} current={current}>
          <Frame page="08">
            <SectionHead eyebrow="The partnership today" title="This is a normal month." />
            <div className="grid grid-cols-3 gap-12 border-t border-neutral-800 pt-8">
              {[
                ['~40', 'emails a month', 'answered the same day'],
                ['8+', 'requests delivered a month', 'on a flat retainer'],
                ['$0', 'in rush fees or change orders', 'every launch deadline met'],
              ].map(([stat, label, sub]) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="text-7xl font-semibold leading-none tracking-tight text-white">{stat}</span>
                  <span className="mt-1 text-lg font-medium text-neutral-200">{label}</span>
                  <span className="text-sm text-neutral-500">{sub}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-4 pt-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">What that covers</span>
              <div className="grid grid-cols-3 gap-x-12 gap-y-3 border-t border-neutral-800 pt-4">
                {['Press releases posted', 'Homepage iterations', 'Product page updates', 'Imagery & asset sourcing', 'Bug fixes & QA', 'Brand & creative support'].map((it) => (
                  <span key={it} className="text-base text-neutral-300">{it}</span>
                ))}
              </div>
            </div>
            <Note>
              Over six months: 230+ emails, 50+ requests delivered, across every division and 15+ stakeholders,
              coordinated by one team, plus a portfolio-wide brand system delivered at no charge.
            </Note>
          </Frame>
        </Slide>

        {/* 8: Signed engagements */}
        <Slide index={8} current={current}>
          <Frame page="09">
            <SectionHead eyebrow="The commercial record" title="Three engagements, each scoped and signed." />
            <div className="flex flex-col">
              <div className="grid grid-cols-12 gap-6 border-b border-neutral-800 pb-3">
                {([
                  ['Engagement', 'col-span-4'],
                  ['Value', 'col-span-1'],
                  ['Sponsor', 'col-span-3'],
                  ['Timeframe', 'col-span-2'],
                  ['Status', 'col-span-2 text-right'],
                ] as [string, string][]).map(([label, span]) => (
                  <span key={label} className={`${span} font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500`}>{label}</span>
                ))}
              </div>
              {([
                {
                  n: '02',
                  title: 'Hosting & Maintenance · Scale Tier',
                  href: '/docs/SOW-02-Hosting-and-Maintenance-Scale-Tier.pdf',
                  value: '$3,000/mo',
                  sponsor: 'Steve Kulp',
                  timeframe: 'Dec 2025 – present',
                  status: 'Active',
                  outstanding: false,
                },
                {
                  n: '03',
                  title: 'Art Direction & Dermatology',
                  href: '/docs/SOW-03-Art-Direction-and-Dermatology.pdf',
                  value: '$3,500',
                  sponsor: 'Hunter Zudans',
                  timeframe: 'Jan – Feb 2026',
                  status: 'Paid in full',
                  outstanding: false,
                },
                {
                  n: '04',
                  title: 'Site Refinement + Brand Readiness',
                  href: '/docs/SOW-04-Site-Refinement-and-Brand-Readiness.pdf',
                  value: '$13,750',
                  sponsor: 'Carmen Traub · design / Hunter Zudans',
                  timeframe: 'Jan 2026 – present',
                  status: 'Phase 1 paid · Phase 2 outstanding',
                  outstanding: true,
                },
              ] as { n: string; title: string; href: string; value: string; sponsor: string; timeframe: string; status: string; outstanding: boolean }[]).map((sow) => (
                <div key={sow.n} className="grid grid-cols-12 items-center gap-6 border-b border-neutral-900 py-4">
                  <div className="col-span-4 flex flex-col gap-1">
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#D2A62C]">SOW {sow.n}</span>
                      <span className="text-base font-medium leading-snug text-white">{sow.title}</span>
                    </div>
                    <a
                      href={sow.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-fit font-mono text-[11px] tracking-wide text-neutral-500 underline-offset-4 transition-colors hover:text-[#D2A62C] hover:underline"
                    >
                      View signed copy ↗
                    </a>
                  </div>
                  <span className="col-span-1 font-mono text-sm text-neutral-300">{sow.value}</span>
                  <span className="col-span-3 text-sm leading-snug text-neutral-400">{sow.sponsor}</span>
                  <span className="col-span-2 text-sm text-neutral-400">{sow.timeframe}</span>
                  <span className={`col-span-2 text-right text-sm font-medium ${sow.outstanding ? 'text-[#D2A62C]' : 'text-neutral-300'}`}>
                    {sow.status}
                  </span>
                </div>
              ))}
            </div>
            <Note>
              All signed under the Master Services Agreement dated September 24, 2025 — fixed-fee, senior-led, no
              hourly billing. Everything is paid and delivered except the second half of SOW 4, currently in review
              with Carmen.
            </Note>
          </Frame>
        </Slide>

        {/* 9: The totality */}
        <Slide index={9} current={current}>
          <Frame page="10">
            <SectionHead eyebrow="The work, in full" title="What it actually took." />
            <div className="flex gap-20 border-t border-neutral-800 pt-6">
              {[
                ['1,362 hrs', 'Platform build, 2026'],
                ['Thousands', 'Requests & changes'],
                ['230+', 'Email threads'],
                ['Every', 'Division & brand'],
              ].map(([s, l]) => (
                <div key={l} className="flex flex-col gap-1.5">
                  <span className="text-4xl font-semibold tracking-tight text-white">{s}</span>
                  <span className="text-sm text-neutral-500">{l}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-16 pt-2">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">The build · 2026</span>
                <table className="w-full text-sm">
                  <tbody>
                    {([['Phase 1 · Foundation', '270 hrs'], ['Phase 2 · Realization', '770 hrs'], ['Phase 3 · Optimization', '322 hrs']] as [string, string][]).map(([p, h]) => (
                      <tr key={p} className="border-b border-neutral-900">
                        <td className="py-2.5 text-neutral-300">{p}</td>
                        <td className="py-2.5 text-right font-mono text-neutral-300">{h}</td>
                      </tr>
                    ))}
                    <tr className="bg-white/[0.03]">
                      <td className="py-2.5 font-medium text-white">Total build</td>
                      <td className="py-2.5 text-right font-mono font-semibold text-white">1,362 hrs</td>
                    </tr>
                  </tbody>
                </table>
                <span className="text-xs leading-relaxed text-neutral-500">A full enterprise platform, delivered in 2026.</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Then run every week since</span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 border-t border-neutral-800 pt-4">
                  {['Press releases', 'Homepage iterations', 'Product pages', 'Imagery & assets', 'Bug fixes & QA', 'Copy & content', 'Brand system', 'New initiatives'].map((it) => (
                    <span key={it} className="text-sm text-neutral-300">{it}</span>
                  ))}
                </div>
                <span className="text-xs leading-relaxed text-neutral-500">Thousands of individual requests, edits, and changes, turned around same-day.</span>
              </div>
            </div>
            <Note>
              A complete platform built this year, then run and extended every week since. Every item itemized at
              makebttr.com/activity-log.
            </Note>
          </Frame>
        </Slide>

        {/* 10: Investment summary */}
        <Slide index={10} current={current}>
          <Frame page="11">
            <SectionHead eyebrow="Investment summary" title="Open balance." />
            <div className="grid grid-cols-2 gap-16">
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Platform assets delivered</span>
                <div className="flex flex-col gap-2.5 border-t border-neutral-800 pt-4">
                  {['Enterprise website ecosystem', 'Multi-division CMS', 'Product architecture', 'Infrastructure & hosting', 'Brand system', 'Content governance', 'Ongoing support'].map((t) => (
                    <span key={t} className="text-sm text-neutral-300">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">The outstanding balance</span>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Realization phase (final invoice)', '$6,875'],
                      ['Monthly hosting, May & June', '$6,000'],
                    ].map(([item, amt]) => (
                      <tr key={item} className="border-b border-neutral-900">
                        <td className="py-2.5 text-neutral-300">{item}</td>
                        <td className="py-2.5 text-right font-mono text-neutral-300">{amt}</td>
                      </tr>
                    ))}
                    <tr className="bg-white/[0.03]">
                      <td className="py-3 font-medium text-white">Outstanding</td>
                      <td className="py-3 text-right font-mono text-lg font-semibold text-white">$12,875</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <Note>
              The platform is operational. Bringing the account current closes the final administrative items and
              lets focus return to growth.
            </Note>
          </Frame>
        </Slide>

        {/* 11: Next six months */}
        <Slide index={11} current={current}>
          <Frame page="12">
            <SectionHead eyebrow="The next six months" title="What the next six months deliver, without spending again." />
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 border-t border-neutral-800 pt-6">
              {[
                ['Acquisitions onboarded in weeks', 'New companies plug into the platform that already exists instead of starting a build from zero. What used to take quarters becomes a matter of weeks, on infrastructure Tiger already owns.'],
                ['New brands from existing infrastructure', 'Stand up a new brand on the shared stack without commissioning a new website, CMS, or hosting each time. The hard engineering is done, so launches are configuration, not construction.'],
                ['One source of truth for products', 'Every division pulls from the same structured product library, so a change made once is correct everywhere. No duplicated content and no drift between sites.'],
                ['Consistent governance', 'One brand voice and one visual standard enforced across the ecosystem, with compliance built into the content model. Growth never comes at the cost of consistency or control.'],
                ['Reduced operational overhead', 'Fewer vendors, fewer handoffs, and fewer surprises, with one accountable team carrying all of it. Less coordination cost for Tiger and a lower total cost of ownership.'],
                ['Built to keep compounding', 'Because each addition builds on the last, the platform gets faster and cheaper to extend over time. The early investment keeps paying off rather than resetting.'],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col gap-2">
                  <p className="text-lg font-medium text-white">{t}</p>
                  <p className="max-w-xl text-sm leading-relaxed text-neutral-400">{d}</p>
                </div>
              ))}
            </div>
          </Frame>
        </Slide>

        {/* 12: Roadmap */}
        <Slide index={12} current={current}>
          <Frame page="13">
            <SectionHead eyebrow="Where we go together" title="A potential roadmap, 2026 to 2027." />
            <div className="pt-4">
              <div className="grid grid-cols-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#D2A62C]" />
                    {i < 3 && <div className="h-px flex-1 bg-neutral-700" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-4 gap-10">
                {([
                  ['Q3 2026', ['Biocare', 'Tiger Dermatology', 'Brand governance']],
                  ['Q4 2026', ['Product ecosystem expansion', 'Division enhancements']],
                  ['Q1 2027', ['Acquisition onboarding framework']],
                  ['Q2 2027', ['AI-enabled content operations']],
                ] as [string, string[]][]).map(([q, items]) => (
                  <div key={q} className="flex flex-col gap-4">
                    <span className="font-mono text-sm tracking-wide text-white">{q}</span>
                    <div className="flex flex-col gap-3 border-t border-neutral-800 pt-4">
                      {items.map((it) => (
                        <span key={it} className="text-base leading-snug text-neutral-300">{it}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Note>An illustrative path, not a commitment. Every initiative builds on the platform that already exists, and none requires starting over.</Note>
          </Frame>
        </Slide>

        {/* 13: Close */}
        <Slide index={13} current={current}>
          <div className="relative flex h-full flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-24 text-center">
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white">
              The platform is built. The governance is defined.<br />The foundation is proven.
            </h2>
            <p className="text-xl text-neutral-400">The next phase isn&rsquo;t reconstruction. It&rsquo;s growth.</p>
            <span className="absolute bottom-8 left-24 font-mono text-[11px] tracking-[0.2em] text-neutral-600">
              BEN HOLLAND &amp; DONNY SMITH &middot; MAKEBTTR.COM
            </span>
            <Wordmark />
          </div>
        </Slide>

        {printMode && (
          <style dangerouslySetInnerHTML={{ __html: '[aria-labelledby="cookie-wall-title"]{display:none!important}' }} />
        )}
      </div>

      {!printMode && (
        <>
          <button
            onClick={prev}
            disabled={current === 0}
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 backdrop-blur transition-all hover:text-white disabled:opacity-20"
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button
            onClick={next}
            disabled={current === TOTAL_SLIDES - 1}
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900/80 text-neutral-300 backdrop-blur transition-all hover:text-white disabled:opacity-20"
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="absolute bottom-3 right-4 font-mono text-xs text-neutral-700">
            {current + 1} / {TOTAL_SLIDES}
          </div>
        </>
      )}
    </div>
  )
}

function Slide({ index, current, children }: { index: number; current: number; children: React.ReactNode }) {
  if (index !== current) return null
  return <div className="absolute inset-0">{children}</div>
}

function Frame({ page, children }: { page: string; children: React.ReactNode }) {
  return (
    <div className="relative h-full bg-[#0a0a0a]">
      <div className="flex h-full flex-col gap-10 px-24 pt-20 pb-20">{children}</div>
      <div className="absolute bottom-8 right-24 flex items-center gap-6">
        <span className="font-mono text-[11px] tracking-[0.4em] text-[#D2A62C]">BTTR</span>
        <span className="font-mono text-[11px] tracking-widest text-neutral-700">{page}</span>
      </div>
    </div>
  )
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-w-5xl text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-white">{title}</h2>
    </div>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500">{children}</span>
}

function Note({ children }: { children: React.ReactNode }) {
  return <p className="mt-auto max-w-5xl text-sm leading-relaxed text-neutral-500">{children}</p>
}

function Wordmark() {
  return (
    <span className="absolute bottom-8 right-24 font-mono text-[11px] tracking-[0.4em] text-[#D2A62C]">BTTR</span>
  )
}
