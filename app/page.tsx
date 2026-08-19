import Link from 'next/link'
import Hero from '@/components/Hero'
import PostCard from '@/components/PostCard'
import LocationCard from '@/components/LocationCard'
import { getRecentPosts, getAllLocations } from '@/lib/cosmic'

export default async function HomePage() {
  const [posts, locations] = await Promise.all([
    getRecentPosts(6),
    getAllLocations(),
  ])

  const heroImage = locations[0]?.metadata?.hero_image?.imgix_url

  return (
    <div>
      <Hero
        title="Chase the Perfect Wave"
        subtitle="Surf travel stories, destination guides, and trip inspiration from Hawaii, Bali, and Costa Rica."
        imageUrl={heroImage}
      />

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-ocean-900">
              From the Journal
            </h2>
            <p className="text-sand-600 mt-2">
              Fresh stories from the road and the lineup.
            </p>
          </div>
          <Link
            href="/posts"
            className="hidden sm:inline-block text-ocean-700 font-semibold hover:text-ocean-900 transition-colors"
          >
            View all posts →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="text-sand-600">No posts yet. Check back soon!</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}

        <div className="mt-8 sm:hidden">
          <Link
            href="/posts"
            className="text-ocean-700 font-semibold hover:text-ocean-900 transition-colors"
          >
            View all posts →
          </Link>
        </div>
      </section>

      <section className="bg-ocean-900 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Surf Destinations
              </h2>
              <p className="text-ocean-200 mt-2">Where to go next.</p>
            </div>
            <Link
              href="/locations"
              className="hidden sm:inline-block text-sand-200 font-semibold hover:text-white transition-colors"
            >
              View all destinations →
            </Link>
          </div>

          {locations.length === 0 ? (
            <p className="text-ocean-200">No destinations yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {locations.slice(0, 3).map((location) => (
                <LocationCard key={location.id} location={location} />
              ))}
            </div>
          )}

          <div className="mt-8 sm:hidden">
            <Link
              href="/locations"
              className="text-sand-200 font-semibold hover:text-white transition-colors"
            >
              View all destinations →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}