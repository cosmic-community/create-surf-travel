import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface AuthorBylineProps {
  author?: Author
  date?: string
}

export default function AuthorByline({ author, date }: AuthorBylineProps) {
  const photo = author?.metadata?.photo?.imgix_url
  const name = author
    ? getMetafieldValue(author.metadata?.name) || author.title
    : ''
  const homeBreak = author
    ? getMetafieldValue(author.metadata?.home_break)
    : ''

  return (
    <div className="flex items-center gap-3">
      {photo ? (
        <img
          src={`${photo}?w=96&h=96&fit=crop&auto=format,compress`}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-ocean-100 flex items-center justify-center text-ocean-700 font-bold">
          {name ? name.charAt(0) : '?'}
        </div>
      )}
      <div>
        <div className="flex items-center gap-2">
          {name && <p className="font-semibold text-sand-900">{name}</p>}
          {homeBreak && (
            <span className="text-xs text-ocean-600">· {homeBreak}</span>
          )}
        </div>
        {date && <p className="text-sm text-sand-500">{formatDate(date)}</p>}
      </div>
    </div>
  )
}