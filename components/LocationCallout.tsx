import Link from 'next/link'
import type { Location } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface LocationCalloutProps {
  location: Location
}

export default function LocationCallout({ location }: LocationCalloutProps) {
  const name = getMetafieldValue(location.metadata?.name) || location.title
  const country = getMetafieldValue(location.metadata?.country)
  const image = location.metadata?.hero_image?.imgix_url

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="flex items-center gap-4 bg-sand-100 hover:bg-sand-200 transition-colors rounded-2xl p-4 my-10 border border-sand-200"
    >
      {image && (
        <img
          src={`${image}?w=200&h=200&fit=crop&auto=format,compress`}
          alt={name}
          width={100}
          height={100}
          className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
        />
      )}
      <div>
        <p className="text-xs uppercase tracking-wide text-ocean-600 font-semibold">
          Featured Destination
        </p>
        <p className="text-lg font-bold text-ocean-900">
          {name}
          {country ? `, ${country}` : ''}
        </p>
        <p className="text-sm text-ocean-700 font-medium mt-1">
          Explore this destination →
        </p>
      </div>
    </Link>
  )
}