import Link from 'next/link'
import type { Location } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface LocationCardProps {
  location: Location
}

export default function LocationCard({ location }: LocationCardProps) {
  const name = getMetafieldValue(location.metadata?.name) || location.title
  const country = getMetafieldValue(location.metadata?.country)
  const description = getMetafieldValue(location.metadata?.description)
  const image = location.metadata?.hero_image?.imgix_url

  return (
    <Link
      href={`/locations/${location.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-sand-200 hover:shadow-xl transition-shadow"
    >
      <div className="aspect-[4/3] bg-sand-100 overflow-hidden">
        {image ? (
          <img
            src={`${image}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🏝️
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-ocean-900 mb-1">{name}</h3>
        {country && (
          <p className="text-ocean-600 text-sm mb-3 font-medium">{country}</p>
        )}
        {description && (
          <p className="text-sand-600 text-sm line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}