'use client'

import { useState, useEffect, useRef, Fragment } from 'react'

const TOTAL_SLIDES = 13

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
          <div className="relative flex h-full items-center justify-center bg-[#0a0a0a]">
            <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full scale-[1.03] object-cover opacity-25">
              <source src="/assets/work/uploads/2024/08/tiger-hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#0a0a0a]/50" />
            <div className="relative flex flex-col items-center gap-6 text-center">
              <h1 className="text-5xl font-semibold tracking-tight">
                <span className="text-white">Tiger BioSciences </span>
                <span className="text-neutral-500">Digital Platform Review</span>
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-neutral-400">
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
                ['Corporate site', ['Ecosystem homepage', 'Company & companies', 'Leadership & people', 'News & press room', 'Careers, contact, donation']],
                ['Divisions', ['Wound Care', 'Aesthetics', 'Tissue Processing', 'International', 'Expertise pages']],
                ['Products & science', ['Full product library', 'Product detail pages', 'Pipeline & publications', 'Clinical evidence', 'Research & gallery']],
                ['Platform', ['Custom Sanity CMS', 'Multi-brand model', 'AWS + Vercel hosting', 'CI/CD & staging', 'Security & backups']],
                ['Brand & operations', ['Visual brand system', 'Brand book & style guide', 'Press publishing system', 'Survey integration', 'Daily dev + creative']],
              ] as [string, string[]][]).map(([cat, items]) => (
                <div key={cat} className="flex flex-col gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">{cat}</span>
                  <div className="flex flex-col gap-2.5 border-t border-neutral-800 pt-3">
                    {items.map((it) => (
                      <span key={it} className="text-sm leading-snug text-neutral-300">{it}</span>
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
            <SectionHead eyebrow="The CMS platform" title="A custom enterprise CMS, built to carry every brand." />
            <div className="grid grid-cols-2 gap-16">
              <ul className="flex flex-col gap-4 border-t border-neutral-800 pt-5">
                {[
                  'Bespoke, secure headless CMS on Sanity',
                  'Multi-brand, multi-division content model',
                  'FDA, regulatory, and clinical fields structured and required',
                  'Role-based editing with clear ownership',
                ].map((t) => (
                  <li key={t} className="text-lg text-neutral-200">{t}</li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 border-t border-neutral-800 pt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">The commitment</span>
                <p className="text-lg leading-relaxed text-neutral-300">
                  Architected from day one for multiple brands, business units, and acquisitions. Standing up a
                  new brand is configuration, not reconstruction.
                </p>
              </div>
            </div>
          </Frame>
        </Slide>

        {/* 4: Q3 — Hosting & infrastructure */}
        <Slide index={4} current={current}>
          <Frame page="05">
            <SectionHead eyebrow="Hosting & infrastructure" title="Enterprise hosting, secured and built to scale." />
            <div className="grid grid-cols-4 gap-10 border-t border-neutral-800 pt-6">
              {[
                ['99.99%', 'Uptime SLA on redundant infrastructure'],
                ['SOC 2 + HIPAA', 'Readiness alignment for regulated data'],
                ['24 / 7', 'Monitoring, sub-2-hour incident response'],
                ['AWS + Vercel', 'Multi-region delivery with failover'],
              ].map(([stat, label]) => (
                <div key={label} className="flex flex-col gap-2">
                  <span className="text-3xl font-semibold tracking-tight text-white">{stat}</span>
                  <span className="text-sm leading-relaxed text-neutral-400">{label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-10 text-sm text-neutral-400">
              <span>Twice-daily backups with full redundancy</span>
              <span>Cloudflare DNS, DDoS protection, IP blocking</span>
              <span>CI/CD with automated deploys and preview environments</span>
            </div>
            <Note>The reliability and security of an in-house platform team, carried entirely by Bttr.</Note>
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
            <div className="flex gap-10 text-sm text-neutral-400">
              <span>Governance and ownership model</span>
              <span>Production workflows across teams</span>
              <span>Documented and ready to extend</span>
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
                ['One decision line', 'One owner, one direction. Choices stop stalling in committee.'],
                ['Governed brand system', 'A consistent voice and one standard across every brand.'],
                ['Incremental roadmap', 'New brands and products ship on top of what exists, not from scratch.'],
                ['Clear ownership', 'One team accountable for the whole platform, top to bottom.'],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-1.5">
                  <p className="text-xl font-medium text-white">{title}</p>
                  <p className="text-base text-neutral-400">{desc}</p>
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
                ['~40', 'emails a month', 'most answered the same day'],
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
            <Note>
              Over six months: 230+ emails, 50+ requests delivered, across every division and 15+ stakeholders,
              coordinated by one team, plus a portfolio-wide brand system delivered at no charge.
            </Note>
          </Frame>
        </Slide>

        {/* 8: The totality */}
        <Slide index={8} current={current}>
          <Frame page="09">
            <SectionHead eyebrow="The work, in full" title="Six months, broken down to the last request." />
            <div className="grid grid-cols-[1.3fr_1fr] gap-16">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-neutral-800/70 text-left text-neutral-300">
                    <th className="px-3 py-2 font-normal">Request type</th>
                    <th className="px-3 py-2 text-right font-normal">Count</th>
                  </tr>
                </thead>
                <tbody>
                  {([['Imagery', 9], ['Homepage', 8], ['Meetings', 7], ['Press releases', 5], ['Admin', 5], ['Product pages', 4], ['Brand system', 4], ['Bug fixes', 3], ['Copy', 2], ['New business', 2], ['New build', 1]] as [string, number][]).map(([t, c]) => (
                    <tr key={t} className="border-b border-neutral-900">
                      <td className="px-3 py-[7px] text-neutral-300">{t}</td>
                      <td className="px-3 py-[7px] text-right font-mono text-neutral-300">{c}</td>
                    </tr>
                  ))}
                  <tr className="bg-white/[0.03]">
                    <td className="px-3 py-2 font-medium text-white">Total requests</td>
                    <td className="px-3 py-2 text-right font-mono font-medium text-white">50</td>
                  </tr>
                </tbody>
              </table>
              <div className="flex flex-col justify-between gap-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                  {[['230+', 'Individual emails'], ['50+', 'Requests delivered'], ['15+', 'Stakeholders served'], ['Every', 'Division and brand']].map(([s, l]) => (
                    <div key={l} className="flex flex-col">
                      <span className="text-3xl font-semibold tracking-tight text-white">{s}</span>
                      <span className="text-xs text-neutral-500">{l}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">Requests by month</span>
                  <div className="flex items-end gap-3 border-t border-neutral-800 pt-3">
                    {([['Dec', 4], ['Jan', 8], ['Feb', 7], ['Mar', 8], ['Apr', 10], ['May', 8], ['Jun', 5]] as [string, number][]).map(([m, v]) => (
                      <div key={m} className="flex flex-1 flex-col items-center gap-1.5">
                        <div className="flex h-20 w-full items-end">
                          <div className="w-full bg-neutral-600" style={{ height: `${v * 10}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-neutral-500">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Note>Every item itemized at makebttr.com/activity-log</Note>
          </Frame>
        </Slide>

        {/* 9: Investment summary */}
        <Slide index={9} current={current}>
          <Frame page="10">
            <SectionHead eyebrow="Investment summary" title="The asset is deployed. One administrative item remains." />
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
                <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500">The one outstanding item</span>
                <table className="w-full text-sm">
                  <tbody>
                    {[
                      ['Creative direction & imagery', '$3,500'],
                      ['Realization phase (final invoice)', '$6,875'],
                      ['Monthly hosting, April through June', '$9,000'],
                    ].map(([item, amt]) => (
                      <tr key={item} className="border-b border-neutral-900">
                        <td className="py-2.5 text-neutral-300">{item}</td>
                        <td className="py-2.5 text-right font-mono text-neutral-300">{amt}</td>
                      </tr>
                    ))}
                    <tr className="bg-white/[0.03]">
                      <td className="py-3 font-medium text-white">Outstanding</td>
                      <td className="py-3 text-right font-mono text-lg font-semibold text-white">$19,375</td>
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

        {/* 10: Next six months */}
        <Slide index={10} current={current}>
          <Frame page="11">
            <SectionHead eyebrow="The next six months" title="What the next six months deliver, without spending again." />
            <div className="grid grid-cols-2 gap-x-16 gap-y-6 border-t border-neutral-800 pt-6">
              {[
                ['Acquisitions onboarded in weeks', 'Not quarters. New companies plug into the existing platform.'],
                ['New brands from existing infrastructure', 'Launch a brand without building a new stack each time.'],
                ['One source of truth for products', 'Every division pulling from the same structured library.'],
                ['Consistent governance', 'One brand, one standard, enforced across the ecosystem.'],
                ['Reduced operational overhead', 'Fewer vendors, fewer handoffs, fewer surprises.'],
                ['Built to keep compounding', 'Each addition is cheaper and faster than the last.'],
              ].map(([t, d]) => (
                <div key={t} className="flex flex-col gap-1.5">
                  <p className="text-lg font-medium text-white">{t}</p>
                  <p className="text-sm text-neutral-400">{d}</p>
                </div>
              ))}
            </div>
          </Frame>
        </Slide>

        {/* 11: Roadmap */}
        <Slide index={11} current={current}>
          <Frame page="12">
            <SectionHead eyebrow="Where we go together" title="The Tiger roadmap, 2026 to 2027." />
            <table className="w-full text-base">
              <thead>
                <tr className="bg-neutral-800/70 text-left text-neutral-300">
                  <th className="w-40 px-4 py-2.5 font-normal">Quarter</th>
                  <th className="px-4 py-2.5 font-normal">Initiatives</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Q3 2026', 'Biocare · Tiger Dermatology · Brand governance'],
                  ['Q4 2026', 'Product ecosystem expansion · Division enhancements'],
                  ['Q1 2027', 'Acquisition onboarding framework'],
                  ['Q2 2027', 'AI-enabled content operations'],
                ].map(([q, items]) => (
                  <tr key={q} className="border-b border-neutral-900">
                    <td className="px-4 py-4 font-mono text-sm tracking-wide text-neutral-400">{q}</td>
                    <td className="px-4 py-4 text-neutral-200">{items}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Note>Every milestone builds on the platform that already exists. None of it requires starting over.</Note>
          </Frame>
        </Slide>

        {/* 12: Close */}
        <Slide index={12} current={current}>
          <div className="relative flex h-full flex-col items-center justify-center gap-6 bg-[#0a0a0a] px-24 text-center">
            <h2 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white">
              The platform is built. The governance is defined. The foundation is proven.
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
      <span className="absolute bottom-8 left-24 font-mono text-[11px] tracking-widest text-neutral-700">{page}</span>
      <Wordmark />
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
