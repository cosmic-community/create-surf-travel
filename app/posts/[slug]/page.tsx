// app/posts/[slug]/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AuthorByline from '@/components/AuthorByline'
import LocationCallout from '@/components/LocationCallout'
import RelatedPosts from '@/components/RelatedPosts'
import CategoryBadge from '@/components/CategoryBadge'
import { getPostBySlug, getRelatedPosts, getMetafieldValue } from '@/lib/cosmic'

interface PostDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  const description = post.metadata?.excerpt || ''
  const imageUrl = post.metadata?.featured_image?.imgix_url
    ? `${post.metadata.featured_image.imgix_url}?w=1200&h=630&fit=crop&auto=format,compress`
    : undefined

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: 'article',
      images: imageUrl ? [imageUrl] : undefined,
    },
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const location = post.metadata?.location
  const relatedPosts = location
    ? await getRelatedPosts(location.id, post.id, 3)
    : []
  const featuredImage = post.metadata?.featured_image
  const categories = post.metadata?.categories || []
  const surfSeason = post.metadata?.surf_season

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        {(categories.length > 0 || surfSeason) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {surfSeason && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-ocean-700 bg-ocean-50 border border-ocean-200 px-3 py-1 rounded-full">
                {getMetafieldValue(surfSeason)} Season
              </span>
            )}
            {categories.map((category) => (
              <CategoryBadge key={category.id} category={category} />
            ))}
          </div>
        )}
        <h1 className="text-4xl font-bold text-ocean-900 mb-4">
          {post.title}
        </h1>
        <AuthorByline
          author={post.metadata?.author}
          date={post.metadata?.published_date}
        />
      </div>

      {featuredImage && (
        <div className="rounded-2xl overflow-hidden mb-10">
          <img
            src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
            alt={post.title}
            width={1600}
            height={900}
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {location && <LocationCallout location={location} />}

      {post.metadata?.content && (
        <div
          className="prose prose-lg prose-sky max-w-none mt-10"
          dangerouslySetInnerHTML={{ __html: post.metadata.content }}
        />
      )}

      {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}

      <div className="mt-14">
        <Link
          href="/posts"
          className="text-ocean-700 font-semibold hover:text-ocean-900 transition-colors"
        >
          ← Back to Journal
        </Link>
      </div>
    </article>
  )
}