import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-ocean-950 text-ocean-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg flex items-center gap-2">
              <span aria-hidden="true">🌊</span> Create Surf Travel
            </p>
            <p className="text-sm text-ocean-300 mt-2">
              Surf travel stories from Hawaii, Bali, and Costa Rica.
            </p>
          </div>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/posts" className="hover:text-white transition-colors">
              Journal
            </Link>
            <Link
              href="/locations"
              className="hover:text-white transition-colors"
            >
              Destinations
            </Link>
          </nav>
        </div>
        <p className="text-xs text-ocean-400 mt-8">
          © {new Date().getFullYear()} Create Surf Travel. All rights reserved.
        </p>
      </div>
    </footer>
  )
}