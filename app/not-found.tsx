import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-5xl mb-4">🏄</p>
      <h2 className="text-2xl font-bold text-ocean-900 mb-2">
        Page Not Found
      </h2>
      <p className="text-sand-600 mb-6">
        Looks like this wave already broke. Let&apos;s paddle back.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-ocean-700 text-white font-semibold hover:bg-ocean-800 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}