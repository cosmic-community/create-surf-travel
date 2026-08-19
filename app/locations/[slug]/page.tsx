// app/locations/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PostCard from '@/components/PostCard'
import {
  getLocationBySlug,
  getPostsByLocation,
  getMetafieldValue,
} from '@/lib/cosmic'

interface LocationDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: LocationDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationBySlug(slug)

  if (!location) {
    return { title: 'Destination Not Found' }
  }

  const name = getMetafieldValue(location.metadata?.name) || location.title
  const description = getMetafieldValue(location.metadata?.description)
  const imageUrl = location.metadata?.hero_image?.imgix_url
    ? `${location.metadata.hero_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title: name,
    description,
    openGraph: {
      title: `${name} | Create Surf Travel`,
      description,
      type: 'website',
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function LocationDetailPage({
  params,
}: LocationDetailPageProps) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)

  if (!location) {
    notFound()
  }

  const posts = await getPostsByLocation(location.id)
  const name = getMetafieldValue(location.metadata?.name) || location.title
  const country = getMetafieldValue(location.metadata?.country)
  const description = getMetafieldValue(location.metadata?.description)
  const difficulty = getMetafieldValue(location.metadata?.wave_difficulty)
  const heroImage = location.metadata?.hero_image?.imgix_url
  const bestMonths = location.metadata?.best_months || []

  return (
    <div>
      <div className="relative bg-ocean-900">
        {heroImage && (
          <img
            src={`${heroImage}?w=2400&h=1200&fit=crop&auto=format,compress`}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-900 via-ocean-900/60 to-transparent" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          {country && (
            <p className="text-sand-200 font-semibold uppercase tracking-widest text-sm mb-3">
              {country}
            </p>
          )}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            {name}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {description && (
          <p className="text-lg text-sand-700 leading-relaxed mb-10">
            {description}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {difficulty && (
            <div className="bg-sand-100 rounded-2xl p-6 border border-sand-200">
              <p className="text-xs uppercase tracking-wide text-ocean-600 font-semibold mb-2">
                Wave Difficulty
              </p>
              <p className="text-xl font-bold text-ocean-900">{difficulty}</p>
            </div>
          )}
          {bestMonths.length > 0 && (
            <div className="bg-sand-100 rounded-2xl p-6 border border-sand-200">
              <p className="text-xs uppercase tracking-wide text-ocean-600 font-semibold mb-2">
                Best Months
              </p>
              <p className="text-xl font-bold text-ocean-900">
                {bestMonths.join(', ')}
              </p>
            </div>
          )}
        </div>

        <h2 className="text-2xl font-bold text-ocean-900 mb-6">
          Stories from {name}
        </h2>

        {posts.length === 0 ? (
          <p className="text-sand-600">No posts yet for this destination.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-14">
          <Link
            href="/locations"
            className="text-ocean-700 font-semibold hover:text-ocean-900 transition-colors"
          >
            ← Back to Destinations
          </Link>
        </div>
      </div>
    </div>
  )
}