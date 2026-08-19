import PostCard from '@/components/PostCard'
import type { Post } from '@/types'

interface RelatedPostsProps {
  posts: Post[]
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  return (
    <section className="mt-16 pt-10 border-t border-sand-200">
      <h2 className="text-2xl font-bold text-ocean-900 mb-6">
        Related Stories
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}