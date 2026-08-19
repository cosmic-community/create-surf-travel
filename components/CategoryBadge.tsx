import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryBadgeProps {
  category: Category
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title

  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-wide text-white bg-ocean-600 px-3 py-1 rounded-full">
      {name}
    </span>
  )
}