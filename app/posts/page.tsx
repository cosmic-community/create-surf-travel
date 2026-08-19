import type { Metadata } from 'next'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import { getPaginatedPosts } from '@/lib/cosmic'

export const metadata: Metadata = {
  title: 'Surf Journal',
  description:
    'All surf travel stories, destination guides, and trip inspiration from Create Surf Travel.',
  openGraph: {
    title: 'Surf Journal | Create Surf Travel',
    description:
      'All surf travel stories, destination guides, and trip inspiration.',
    type: 'website',
  },
}

interface PostsIndexPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function PostsIndexPage({
  searchParams,
}: PostsIndexPageProps) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam || '1', 10) || 1)
  const { posts, totalPages } = await getPaginatedPosts(page)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-ocean-900">Surf Journal</h1>
        <p className="text-sand-600 mt-3 max-w-2xl mx-auto">
          Stories from the road, the lineup, and everywhere in between.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-sand-600">No posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} basePath="/posts" />
    </div>
  )
}