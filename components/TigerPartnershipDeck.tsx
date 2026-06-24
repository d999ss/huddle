'use client'

import { useState, useEffect, useRef } from 'react'

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
        className="relative shrink-0 overflow-hidden bg-[#0a0a0a] shadow-2xl"
        style={
          printMode
            ? { width: 1280, height: 720 }
            : { width: 1280, height: 720, transform: `scale(${scale})`, transformOrigin: 'center center' }
        }
      >

        {/* 0: Cover */}
        <Slide index={0} current={current}>
          <div className="relative flex h-full flex-col justify-end bg-[#0a0a0a]">
            <div className="absolute inset-0">
              <video autoPlay muted loop playsInline className="h-full w-full scale-[1.03] object-cover">
                <source src="/assets/work/uploads/2024/08/tiger-hero.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] from-15% via-[#0a0a0a]/55 to-transparent" />
            </div>
            <div className="relative flex items-end justify-between px-20 pb-16">
              <div className="flex flex-col gap-5">
                <Label>Tiger BioSciences &middot; Digital Platform Review</Label>
                <h1 className="max-w-3xl text-7xl font-bold leading-none tracking-tight text-white">
                  More than a website.
                </h1>
                <p className="max-w-2xl text-xl leading-relaxed text-neutral-300">
                  Six months of decisions, infrastructure, and institutional knowledge.
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 text-right">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#D2A62C]" />
                  <span className="font-mono text-xs tracking-widest text-[#D2A62C] uppercase">Bttr.</span>
                </div>
                <p className="text-xs text-neutral-400">Prepared for Matt Winter, CIO &amp; Carmen Traub</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 1: Agenda — the four questions */}
        <Slide index={1} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>What you asked for</Label>
            <h2 className="text-5xl font-bold text-white">Your four questions, answered first.</h2>
            <div className="grid grid-cols-2 gap-5">
              {[
                ['01', 'Services delivered', 'Everything purchased, built, and live today'],
                ['02', 'The CMS platform', 'What it runs, and what it was designed to support'],
                ['03', 'Hosting & infrastructure', 'How it is hosted, secured, and scaled'],
                ['04', 'Technical designs', 'The design system, repositories, and foundation'],
              ].map(([num, title, desc]) => (
                <div key={num} className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-sm text-[#D2A62C]">{num}</span>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="text-xs text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-sm text-neutral-400">
              We will answer all four, then show where the platform goes from here.
            </p>
          </div>
        </Slide>

        {/* 2: Q1 — Services delivered */}
        <Slide index={2} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>01</Badge>
              <div className="flex flex-col">
                <Label>Services delivered</Label>
                <h2 className="text-4xl font-bold text-white">Everything purchased is built and live today.</h2>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {[
                ['Corporate platform', 'Tiger BioSciences ecosystem site, launched December 2025'],
                ['Divisional content', 'Wound Care, Aesthetics, Tissue Processing, International'],
                ['Product library', 'Structured, compliant product experiences across the portfolio'],
                ['Company & leadership', 'Leadership, company, news, careers, all maintained'],
                ['Brand & imagery', 'Unified visual system and ongoing art direction'],
                ['Ongoing support', 'Daily development and creative support'],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col gap-1.5 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <h3 className="text-sm font-semibold text-white">{t}</h3>
                  <p className="text-xs leading-relaxed text-neutral-500">{d}</p>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              A complete platform in production today, not a project in progress.
            </p>
          </div>
        </Slide>

        {/* 3: Q2 — The CMS platform */}
        <Slide index={3} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>02</Badge>
              <div className="flex flex-col">
                <Label>The CMS platform</Label>
                <h2 className="text-4xl font-bold text-white">A custom enterprise CMS, built to carry every brand.</h2>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="flex flex-col gap-2.5">
                {[
                  'Bespoke, secure headless CMS on Sanity',
                  'Multi-brand, multi-division content model',
                  'FDA, regulatory, and clinical fields structured and required',
                  'Role-based editing with clear ownership',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <Check className="text-[#D2A62C]" />
                    <span className="text-sm text-neutral-300">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3 rounded-xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D2A62C]">The commitment</span>
                <p className="text-sm leading-relaxed text-neutral-200">
                  Architected from day one for multiple brands, business units, and acquisitions. Standing up a
                  new brand is configuration, not reconstruction.
                </p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 4: Q3 — Hosting & infrastructure */}
        <Slide index={4} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>03</Badge>
              <div className="flex flex-col">
                <Label>Hosting &amp; infrastructure</Label>
                <h2 className="text-4xl font-bold text-white">Enterprise hosting, secured and built to scale.</h2>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                ['99.99%', 'Uptime SLA on redundant infrastructure'],
                ['SOC 2 + HIPAA', 'Readiness alignment for regulated data'],
                ['24 / 7', 'Monitoring with sub-2-hour incident response'],
                ['AWS + Vercel', 'Multi-region delivery with failover'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-[#D2A62C]">{stat}</span>
                  <span className="text-xs leading-relaxed text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1">
              {['Twice-daily backups with full redundancy', 'Cloudflare DNS, DDoS protection, IP blocking', 'CI/CD with automated deploys and preview environments'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="text-[#D2A62C]" />
                  <span className="text-sm text-neutral-300">{t}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              The reliability and security of an in-house platform team, carried entirely by Bttr.
            </p>
          </div>
        </Slide>

        {/* 5: Q4 — Technical designs */}
        <Slide index={5} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <div className="flex items-center gap-4">
              <Badge>04</Badge>
              <div className="flex flex-col">
                <Label>Technical designs</Label>
                <h2 className="text-4xl font-bold text-white">A documented design system and technical foundation.</h2>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6">
              {[
                ['6', 'GitHub repositories under active management'],
                ['1', 'Unified visual brand system'],
                ['Full', 'Product and divisional component library'],
                ['25+', 'Site sections built across the ecosystem'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-1">
                  <span className="text-2xl font-semibold text-[#D2A62C]">{stat}</span>
                  <span className="text-xs leading-relaxed text-neutral-500">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-2 pt-1">
              {['Governance and ownership model', 'Production workflows across teams', 'Documented and ready to extend'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="text-[#D2A62C]" />
                  <span className="text-sm text-neutral-300">{t}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-400">
              New work arrives on-brand and on-architecture by default, not by cleanup.
            </p>
          </div>
        </Slide>

        {/* 6: The reframe */}
        <Slide index={6} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>The real question</Label>
            <h2 className="max-w-5xl text-5xl font-bold leading-tight text-white">
              The question isn&rsquo;t whether to rebuild.
            </h2>
            <p className="max-w-4xl text-2xl leading-relaxed text-neutral-300">
              It&rsquo;s whether it&rsquo;s worth paying to build it all again.
            </p>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-500">
              The platform is already built, already paid for, and running in production today. Starting over
              doesn&rsquo;t save money. It spends the same investment a second time, for the same result a year from now.
            </p>
          </div>
        </Slide>

        {/* 7: The shift */}
        <Slide index={7} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>Where this goes next</Label>
            <h2 className="max-w-5xl text-5xl font-bold leading-tight text-white">
              What changes when the Tiger Digital Ecosystem meets a single, accountable team.
            </h2>
            <div className="flex flex-col gap-4">
              {[
                ['One decision line', 'One owner, one direction. Choices stop stalling in committee.'],
                ['Governed brand system', 'A consistent voice and one standard across every brand.'],
                ['Incremental roadmap', 'New brands and products ship on top of what exists, not from scratch.'],
                ['Clear ownership', 'One team accountable for the whole platform, top to bottom.'],
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

        {/* 8: A normal month */}
        <Slide index={8} current={current}>
          <div className="flex h-full flex-col justify-center gap-9 bg-[#0a0a0a] px-20">
            <div className="flex flex-col gap-1">
              <Label>The partnership today</Label>
              <h2 className="text-4xl font-bold text-white">This is a normal month.</h2>
            </div>
            <div className="grid grid-cols-3 gap-10">
              {[
                ['~40', 'emails a month', 'most answered the same day'],
                ['8+', 'requests delivered a month', 'on a flat retainer'],
                ['$0', 'in rush fees or change orders', 'every launch deadline met'],
              ].map(([stat, label, sub]) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="text-8xl font-bold leading-none tracking-tight text-[#D2A62C]">{stat}</span>
                  <span className="text-lg font-semibold text-white">{label}</span>
                  <span className="text-sm text-neutral-500">{sub}</span>
                </div>
              ))}
            </div>
            <p className="max-w-5xl text-base leading-relaxed text-neutral-400">
              Over six months: <span className="text-white">230+ emails</span>,{' '}
              <span className="text-white">50+ requests delivered</span>, across{' '}
              <span className="text-white">every division</span> and 15+ stakeholders, coordinated by one team,
              plus a portfolio-wide brand system delivered at no charge.
            </p>
          </div>
        </Slide>

        {/* 9: No clean handoff */}
        <Slide index={9} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <Label>What replacement actually costs</Label>
            <h2 className="text-5xl font-bold text-white">There is no clean handoff.</h2>
            <div className="grid grid-cols-2 gap-x-10 gap-y-3 pt-1">
              {[
                'Hundreds of strategic decisions',
                'Thousands of stakeholder interactions',
                'Product positioning discussions',
                'Regulatory content decisions',
                'Brand governance decisions',
                'Platform architecture decisions',
              ].map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Check className="text-[#D2A62C]" />
                  <span className="text-base text-neutral-200">{t}</span>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-base leading-relaxed text-neutral-400">
              The code is entangled with thousands of decisions that live inside this team. A successor inherits
              files, then spends months rediscovering what made them work, if it can be recovered at all.
            </p>
          </div>
        </Slide>

        {/* 10: Investment summary */}
        <Slide index={10} current={current}>
          <div className="flex h-full flex-col justify-center gap-7 bg-[#0a0a0a] px-20">
            <Label>Tiger investment summary</Label>
            <h2 className="max-w-5xl text-5xl font-bold leading-tight text-white">
              The asset is deployed. One administrative item remains.
            </h2>
            <div className="grid grid-cols-[1.2fr_1fr] gap-12">
              <div className="flex flex-col gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">Platform assets delivered</span>
                {[
                  'Enterprise website ecosystem',
                  'Multi-division CMS',
                  'Product architecture',
                  'Infrastructure & hosting',
                  'Brand system',
                  'Content governance',
                  'Ongoing support',
                ].map((t) => (
                  <div key={t} className="flex items-center gap-2.5">
                    <Check className="text-[#D2A62C]" />
                    <span className="text-sm text-neutral-300">{t}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500">The one outstanding item</span>
                {[
                  ['Creative direction & imagery', '$3,500'],
                  ['Realization phase (final invoice)', '$6,875'],
                  ['Monthly hosting, April through June', '$9,000'],
                ].map(([item, amt]) => (
                  <div key={item} className="flex items-center justify-between border-b border-neutral-900 pb-2">
                    <span className="text-sm text-neutral-300">{item}</span>
                    <span className="font-mono text-sm text-neutral-300">{amt}</span>
                  </div>
                ))}
                <div className="mt-1 flex items-center justify-between rounded-lg bg-[#D2A62C]/10 px-4 py-3">
                  <span className="text-sm font-semibold text-white">Outstanding</span>
                  <span className="font-mono text-2xl font-bold text-[#D2A62C]">$19,375</span>
                </div>
              </div>
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-500">
              The platform is operational. Bringing the account current closes the final administrative items and
              lets focus return to growth.
            </p>
          </div>
        </Slide>

        {/* 11: Next six months */}
        <Slide index={11} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>The next six months</Label>
            <h2 className="text-5xl font-bold text-white">What the next six months deliver, without spending again</h2>
            <div className="grid grid-cols-2 gap-x-10 gap-y-5">
              {[
                ['Acquisitions onboarded in weeks', 'Not quarters. New companies plug into the existing platform.'],
                ['New brands from existing infrastructure', 'Launch a brand without building a new stack each time.'],
                ['One source of truth for products', 'Every division pulling from the same structured library.'],
                ['Consistent governance', 'One brand, one standard, enforced across the ecosystem.'],
                ['Reduced operational overhead', 'Fewer vendors, fewer handoffs, fewer surprises.'],
                ['Built to keep compounding', 'Each addition is cheaper and faster than the last.'],
              ].map(([t, d]) => (
                <div key={t} className="flex gap-3">
                  <Check className="mt-0.5 text-[#D2A62C]" />
                  <div>
                    <p className="font-semibold text-white">{t}</p>
                    <p className="text-sm text-neutral-500">{d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Slide>

        {/* 12: Roadmap */}
        <Slide index={12} current={current}>
          <div className="flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <Label>Where we go together</Label>
            <h2 className="text-5xl font-bold text-white">The Tiger roadmap, 2026 &ndash; 2027</h2>
            <div className="grid grid-cols-4 gap-5">
              {[
                ['Q3 2026', ['Biocare', 'Tiger Dermatology', 'Brand governance']],
                ['Q4 2026', ['Product ecosystem expansion', 'Division enhancements']],
                ['Q1 2027', ['Acquisition onboarding framework']],
                ['Q2 2027', ['AI-enabled content operations']],
              ].map(([q, items]) => (
                <div key={q as string} className="flex flex-col gap-3 rounded-xl border border-neutral-800 bg-neutral-900 p-5">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D2A62C]">{q as string}</span>
                  <div className="flex flex-col gap-2">
                    {(items as string[]).map((it) => (
                      <span key={it} className="text-sm leading-snug text-neutral-300">{it}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="max-w-4xl text-sm leading-relaxed text-neutral-500">
              Every milestone builds on the platform that already exists. None of it requires starting over.
            </p>
          </div>
        </Slide>

        {/* 13: Close */}
        <Slide index={13} current={current}>
          <div className="relative flex h-full flex-col justify-center gap-8 bg-[#0a0a0a] px-20">
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'radial-gradient(circle, #D2A62C 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />
            <div className="relative flex flex-col gap-6">
              <h2 className="max-w-4xl text-5xl font-bold leading-tight text-white">
                The platform is built. The governance is defined. The foundation is proven.
              </h2>
              <p className="text-2xl text-neutral-300">
                The next phase isn&rsquo;t reconstruction. It&rsquo;s growth.
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

          <div className="absolute bottom-3 right-4 font-mono text-xs text-neutral-600">
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

function Check({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={`inline-block h-4 w-4 shrink-0 ${className}`} aria-hidden>
      <path d="M13 4.5L6.5 11 3 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
