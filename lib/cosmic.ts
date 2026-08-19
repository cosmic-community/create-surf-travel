import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Location } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

const POSTS_PER_PAGE = 9

function sortByPublishedDateDesc(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => {
    const dateA = new Date(a.metadata?.published_date || '').getTime()
    const dateB = new Date(b.metadata?.published_date || '').getTime()
    return dateB - dateA
  })
}

export async function getPaginatedPosts(
  page: number
): Promise<{ posts: Post[]; total: number; totalPages: number }> {
  const skip = (page - 1) * POSTS_PER_PAGE
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
      .limit(POSTS_PER_PAGE)
      .skip(skip)

    const posts = sortByPublishedDateDesc(response.objects as Post[])
    const total = response.total || 0

    return {
      posts,
      total,
      totalPages: Math.max(1, Math.ceil(total / POSTS_PER_PAGE)),
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { posts: [], total: 0, totalPages: 1 }
    }
    throw new Error('Failed to fetch posts')
  }
}

export async function getRecentPosts(limit: number): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
      .limit(limit)

    return sortByPublishedDateDesc(response.objects as Post[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch recent posts')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return (response.object as Post) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch post')
  }
}

export async function getRelatedPosts(
  locationId: string,
  excludeId: string,
  limit: number
): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.location': locationId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)
      .limit(limit + 1)

    const posts = sortByPublishedDateDesc(response.objects as Post[]).filter(
      (p) => p.id !== excludeId
    )
    return posts.slice(0, limit)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch related posts')
  }
}

export async function getAllLocations(): Promise<Location[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return response.objects as Location[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch locations')
  }
}

export async function getLocationBySlug(slug: string): Promise<Location | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'locations', slug })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return (response.object as Location) || null
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch location')
  }
}

export async function getPostsByLocation(locationId: string): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts', 'metadata.location': locationId })
      .props(['id', 'slug', 'title', 'metadata'])
      .depth(1)

    return sortByPublishedDateDesc(response.objects as Post[])
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch posts by location')
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const response = await cosmic.objects.find({ type: 'posts' }).props(['slug'])
    return (response.objects as Post[]).map((p) => p.slug)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    return []
  }
}

export async function getAllLocationSlugs(): Promise<string[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'locations' })
      .props(['slug'])
    return (response.objects as Location[]).map((l) => l.slug)
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    return []
  }
}