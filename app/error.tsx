'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <p className="text-5xl mb-4">🌊</p>
      <h2 className="text-2xl font-bold text-ocean-900 mb-2">
        Something went wrong
      </h2>
      <p className="text-sand-600 mb-6">
        We hit a rough set of waves. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-3 rounded-full bg-ocean-700 text-white font-semibold hover:bg-ocean-800 transition-colors"
      >
        Try again
      </button>
    </div>
  )
}