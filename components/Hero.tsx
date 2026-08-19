import Link from 'next/link'

interface HeroProps {
  title: string
  subtitle: string
  imageUrl?: string
}

export default function Hero({ title, subtitle, imageUrl }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-ocean-800 via-ocean-700 to-ocean-500">
      {imageUrl && (
        <img
          src={`${imageUrl}?w=2400&h=1400&fit=crop&auto=format,compress`}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-900/80 via-ocean-800/40 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center">
        <p className="inline-block text-sand-200 font-semibold uppercase tracking-widest text-sm mb-4">
          Surf Travel Journal
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight mb-6">
          {title}
        </h1>
        <p className="text-lg sm:text-xl text-ocean-100 max-w-2xl mx-auto mb-10">
          {subtitle}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/posts"
            className="px-6 py-3 rounded-full bg-sand-100 text-ocean-900 font-semibold hover:bg-white transition-colors"
          >
            Read the Journal
          </Link>
          <Link
            href="/locations"
            className="px-6 py-3 rounded-full border-2 border-white/70 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Explore Destinations
          </Link>
        </div>
      </div>
    </section>
  )
}