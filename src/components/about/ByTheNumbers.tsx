const stats = [
  { value: '3', label: 'Destinations' },
  { value: '47', label: 'Travelers so far' },
  { value: '100%', label: 'Would travel with us again' },
  { value: '1', label: 'Group chat per trip (still active)' },
]

export function ByTheNumbers() {
  return (
    <section className="bg-sand py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <span className="font-display text-6xl md:text-7xl text-charcoal leading-none">
                {value}
              </span>
              <span className="font-body text-sm text-charcoal/60 leading-snug max-w-[140px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
