'use client'

type Entry = { date: string; who: string; request: string; type: string }
type Month = { month: string; entries: Entry[] }

const LOG: Month[] = [
  {
    month: 'December 2025',
    entries: [
      { date: 'Dec 29', who: 'Annelise Norton', request: "Corrected Caro's leadership bio, live the same night", type: 'Copy' },
      { date: 'Dec 29', who: 'Hunter Zudans', request: 'Swapped caregraFT image, removed Tissue Technologies white box, press-release cleanup', type: 'Imagery' },
      { date: 'Dec 29', who: 'Hunter Zudans', request: 'Removed 7 products sitewide (ACAPatch, alloPLY, barrera, carePATCH, Coll-e-Derm, resolve, Restorigin)', type: 'Product pages' },
      { date: 'Dec 30', who: 'Hunter Zudans', request: 'Added new PR Newswire press release to site and CMS', type: 'Press release' },
    ],
  },
  {
    month: 'January 2026',
    entries: [
      { date: 'Jan 5', who: 'Hunter Zudans', request: 'Homepage changes per Oliver; hero carousel copy update', type: 'Homepage' },
      { date: 'Jan 7', who: 'Hunter Zudans', request: 'Color-change SOW kicked off and delivered next day', type: 'Homepage' },
      { date: 'Jan 9', who: 'Tiger team', request: 'Design + Derm review', type: 'Meeting' },
      { date: 'Jan 15', who: 'Carmen Traub', request: 'Corporate website redesign requested after Oliver criticism', type: 'Homepage' },
      { date: 'Jan 28', who: 'Hunter Zudans', request: 'Fixed "explore completeFT" error, removed acute/surgical copy', type: 'Bug fix' },
      { date: 'Jan 28', who: 'Rhonda Leopold', request: 'Investigated Windows-only site search bug across browsers', type: 'Bug fix' },
      { date: 'Jan 30', who: 'Carmen / Ben', request: 'One-week realization sprint; full pre-photoshoot image replacement sitewide', type: 'Imagery' },
      { date: 'Jan', who: 'Hunter Zudans', request: 'Recorded a press-release how-to video so the team could self-publish', type: 'Press release' },
    ],
  },
  {
    month: 'February 2026',
    entries: [
      { date: 'Feb 3', who: 'Carmen Traub', request: 'Two design directions prepared for Oliver', type: 'Brand system' },
      { date: 'Feb 5', who: 'Carmen Traub', request: 'Realization SOW issued via PandaDoc', type: 'Admin' },
      { date: 'Feb 17 & 19', who: 'Tiger team', request: 'Design reviews', type: 'Meeting' },
      { date: 'Feb 24', who: 'Tiger team', request: 'Standing Tue/Thu design reviews begin', type: 'Meeting' },
      { date: 'Feb 26', who: 'Hunter / Melissa', request: 'Dermatology landing page build kicked off', type: 'Product pages' },
      { date: 'Feb', who: 'Hunter Zudans', request: 'Survey embedded in the news section', type: 'New build' },
      { date: 'Feb', who: 'Tiger IT', request: 'PM transition handled (Kaleigh → Kat)', type: 'Admin' },
    ],
  },
  {
    month: 'March 2026',
    entries: [
      { date: 'Mar 1–2', who: 'Tiger team', request: 'Design syncs', type: 'Meeting' },
      { date: 'Mar 5', who: 'Steve Kulp', request: 'New project scoped: BioCare Donor Network Platform', type: 'New business' },
      { date: 'Mar 6', who: 'Tiger team', request: 'Derm design review', type: 'Meeting' },
      { date: 'Mar 11', who: 'Tiger team', request: 'Style guide review', type: 'Brand system' },
      { date: 'Mar 17–19', who: 'Tiger team', request: 'Brand book preview', type: 'Brand system' },
      { date: 'Mar 25', who: 'Bttr', request: 'Stood up shared Tiger + Bttr Slack channel', type: 'Admin' },
      { date: 'Mar 31', who: 'Hunter Zudans', request: 'carePAC launch — urgent same-day, plus Sanity field-mapping fixes', type: 'Product pages' },
      { date: 'Mar', who: 'Steve Kulp', request: 'bioCARE DTN statement of work delivered', type: 'New business' },
    ],
  },
  {
    month: 'April 2026',
    entries: [
      { date: 'Apr 1', who: 'Hunter Zudans', request: 'carePAC press release published + composite image built', type: 'Press release' },
      { date: 'Apr 2', who: 'Tiger team', request: 'Imagery & content alignment', type: 'Meeting' },
      { date: 'Apr 9', who: 'Bttr', request: 'Sitewide visual "glow up" shipped to staging', type: 'Homepage' },
      { date: 'Apr 14', who: 'Carmen Traub', request: 'Full UX / design / content review; major product-imagery lift', type: 'Imagery' },
      { date: 'Apr 15', who: 'Hunter / Shreya', request: 'carePAC / healpack imagery; built tiger-images.vercel.app tracker', type: 'Imagery' },
      { date: 'Apr 15', who: 'Jürgen Bresser', request: 'Resized product images carrying logos', type: 'Imagery' },
      { date: 'Apr 20–22', who: 'Hunter / Melissa', request: 'Website reconvene meetings', type: 'Meeting' },
      { date: 'Apr 23', who: 'Melissa / Carmen', request: 'Homepage carousel and dynamic elements', type: 'Homepage' },
      { date: 'Apr 27–28', who: 'Melissa DeMarinis', request: 'Tradeshow loop video assets reviewed', type: 'Imagery' },
      { date: 'Apr 30', who: 'Becca', request: 'Sourced assets from Avéli/Pace, Viality and Sientra agencies', type: 'Imagery' },
    ],
  },
  {
    month: 'May 2026',
    entries: [
      { date: 'May 4–6', who: 'Becca', request: 'Compiled product assets from Habitat and Pace agencies', type: 'Imagery' },
      { date: 'May', who: 'Carmen Traub', request: 'Homepage redesign rounds; division-name corrections', type: 'Homepage' },
      { date: 'May', who: 'Carmen Traub', request: 'Reinserted header imagery across the Company section', type: 'Homepage' },
      { date: 'May 21', who: 'Carmen Traub', request: 'Revisit the broader visual system', type: 'Brand system' },
      { date: 'May 28', who: 'Melissa DeMarinis', request: 'TIGERCAMP survey press release posted same-day', type: 'Press release' },
      { date: 'May', who: 'Carmen Traub', request: 'Mobile spacing pass', type: 'Bug fix' },
      { date: 'May', who: 'Jay Webster', request: 'Vision page and core-values audit', type: 'Copy' },
      { date: 'May', who: 'Carmen Traub', request: 'LinkedIn launch screenshots produced', type: 'Imagery' },
    ],
  },
  {
    month: 'June 2026',
    entries: [
      { date: 'Jun 12', who: 'Eddie Carden', request: 'Removed Tiger View and Tiger Guard', type: 'Product pages' },
      { date: 'Jun 16', who: 'Melissa DeMarinis', request: 'Two press releases (wound-care survey + aesthetics) posted', type: 'Press release' },
      { date: 'Jun 18', who: 'Carmen Traub', request: 'Astrid feedback round; new direction discussed', type: 'Homepage' },
      { date: 'Jun 22', who: 'Carmen Traub', request: 'Project conclusion and handover request', type: 'Admin' },
      { date: 'Jun', who: 'Ava / Rebecca', request: 'Outstanding-invoice follow-ups', type: 'Admin' },
    ],
  },
]

const TOTAL_REQUESTS = LOG.reduce((n, m) => n + m.entries.length, 0)

const TYPE_COLORS: Record<string, string> = {
  'Press release': 'bg-[#D2A62C]/15 text-[#D2A62C]',
  Imagery: 'bg-blue-500/15 text-blue-300',
  Homepage: 'bg-purple-500/15 text-purple-300',
  'Product pages': 'bg-emerald-500/15 text-emerald-300',
  'Bug fix': 'bg-red-500/15 text-red-300',
  'Brand system': 'bg-pink-500/15 text-pink-300',
  Meeting: 'bg-neutral-700/40 text-neutral-300',
  'New business': 'bg-amber-500/15 text-amber-300',
  'New build': 'bg-teal-500/15 text-teal-300',
  Copy: 'bg-cyan-500/15 text-cyan-300',
  Admin: 'bg-neutral-700/40 text-neutral-400',
}

function tally() {
  const counts: Record<string, number> = {}
  for (const m of LOG) for (const e of m.entries) counts[e.type] = (counts[e.type] || 0) + 1
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

export const TigerActivityLog = () => {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white">
      <style
        dangerouslySetInnerHTML={{
          __html: `@media print {
            html, body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background:#0a0a0a !important; }
            [aria-labelledby="cookie-wall-title"] { display:none !important; }
            .month-block, .log-row { break-inside: avoid; }
          }`,
        }}
      />
      <div className="mx-auto max-w-5xl px-8 py-20">
        {/* Hero */}
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-14">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#D2A62C]">Tiger BioSciences &times; Bttr &middot; Activity record</span>
          <h1 className="text-5xl font-bold leading-tight tracking-tight">Six months. 230+ emails. One flat retainer.</h1>
          <p className="max-w-3xl text-lg leading-relaxed text-neutral-400">
            From December 2025 through June 2026, more than 230 individual emails moved between Tiger and Bttr. That
            is close to nine emails every week, every week, for six straight months. Almost every one carried a
            request, and almost every request was turned around the same day or the next, absorbed inside the
            $3,000/month Scale retainer while the Phase 2 statement of work went unsigned and invoices went unpaid.
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 gap-8 border-b border-neutral-800 py-12 md:grid-cols-4">
          {[
            ['230+', 'Individual emails in six months'],
            ['~9 / wk', 'Sustained, every week, for six months'],
            [`${TOTAL_REQUESTS}+`, 'Discrete work requests delivered'],
            ['$3,000', 'Monthly retainer, no change orders'],
          ].map(([stat, label]) => (
            <div key={label} className="flex flex-col gap-2">
              <span className="text-4xl font-bold text-[#D2A62C]">{stat}</span>
              <span className="text-sm leading-snug text-neutral-500">{label}</span>
            </div>
          ))}
        </div>

        {/* Category tally */}
        <div className="border-b border-neutral-800 py-12">
          <h2 className="mb-6 text-2xl font-bold">What the requests were</h2>
          <div className="flex flex-wrap gap-3">
            {tally().map(([type, count]) => (
              <div key={type} className={`flex items-center gap-2 rounded-full px-4 py-1.5 ${TYPE_COLORS[type] || 'bg-neutral-800 text-neutral-300'}`}>
                <span className="text-sm font-medium">{type}</span>
                <span className="font-mono text-xs opacity-70">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Month-by-month log */}
        <div className="flex flex-col gap-12 py-12">
          {LOG.map((m) => (
            <div key={m.month} className="flex flex-col gap-4">
              <div className="flex items-baseline gap-4">
                <h3 className="text-xl font-bold">{m.month}</h3>
                <span className="font-mono text-xs text-neutral-600">{m.entries.length} requests</span>
              </div>
              <div className="flex flex-col divide-y divide-neutral-900">
                {m.entries.map((e, i) => (
                  <div key={i} className="grid grid-cols-[68px_150px_1fr_auto] items-start gap-4 py-3">
                    <span className="font-mono text-xs text-[#D2A62C]">{e.date}</span>
                    <span className="text-sm text-neutral-400">{e.who}</span>
                    <span className="text-sm leading-snug text-neutral-200">{e.request}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium ${TYPE_COLORS[e.type] || 'bg-neutral-800 text-neutral-300'}`}>{e.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contrast */}
        <div className="rounded-2xl border border-[#D2A62C]/30 bg-[#D2A62C]/10 p-10">
          <h2 className="text-2xl font-bold">The math behind the relationship</h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-300">
            A dedicated development and creative team carried this volume for six straight months on a flat
            $3,000 monthly retainer. The work scaled well beyond what that retainer was designed to cover, the
            Phase 2 statement of work ($136,750) was never signed, and $19,375 remains outstanding. The level of
            effort delivered here was, in practice, far beyond what was billed.
          </p>
        </div>

        <p className="mt-10 font-mono text-xs text-neutral-600">
          Compiled from Gmail, December 2025 – June 2026. Dates reflect when each request was made or delivered.
        </p>
      </div>
    </div>
  )
}
