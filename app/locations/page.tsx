import type { Metadata } from 'next'
import LocationCard from '@/components/LocationCard'
import { getAllLocations } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Surf Destinations',
  description:
    'Explore surf destinations in Hawaii, Bali, and Costa Rica with Create Surf Travel.',
  openGraph: {
    title: 'Surf Destinations | Create Surf Travel',
    description: 'Explore surf destinations in Hawaii, Bali, and Costa Rica.',
    type: 'website',
  },
}

export default async function LocationsIndexPage() {
  const locations = await getAllLocations()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-ocean-900">
          Surf Destinations
        </h1>
        <p className="text-sand-600 mt-3 max-w-2xl mx-auto">
          From reef breaks to river mouths, find your next surf trip.
        </p>
      </div>

      {locations.length === 0 ? (
        <p className="text-center text-sand-600">No destinations found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
        </div>
      )}
    </div>
  )
}