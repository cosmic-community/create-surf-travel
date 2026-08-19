export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicFile {
  url: string
  imgix_url: string
}

export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name?: string
    bio?: string
    photo?: CosmicFile
    home_break?: string
  }
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
  }
}

export interface Location extends CosmicObject {
  type: 'locations'
  metadata: {
    name?: string
    country?: string
    description?: string
    hero_image?: CosmicFile
    best_months?: string[]
    wave_difficulty?: string
  }
}

export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    excerpt?: string
    content?: string
    featured_image?: CosmicFile
    published_date?: string
    surf_season?: string
    author?: Author
    location?: Location
    categories?: Category[]
  }
}

export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}