import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const image = post.metadata?.featured_image?.imgix_url
  const authorName = post.metadata?.author
    ? getMetafieldValue(post.metadata.author.metadata?.name) ||
      post.metadata.author.title
    : ''
  const date = post.metadata?.published_date

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-sand-200 hover:shadow-lg transition-shadow"
    >
      <div className="aspect-[4/3] bg-sand-100 overflow-hidden">
        {image ? (
          <img
            src={`${image}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={post.title}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            🌊
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-ocean-900 group-hover:text-ocean-700 transition-colors mb-2">
          {post.title}
        </h3>
        {post.metadata?.excerpt && (
          <p className="text-sand-600 text-sm mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between text-xs text-sand-500 pt-2">
          {authorName && <span className="font-medium">{authorName}</span>}
          {date && <span>{formatDate(date)}</span>}
        </div>
      </div>
    </Link>
  )
}