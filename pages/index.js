import Link from 'next/link'

export default function IndexPage() {
  return (
    <div>
      Social Media{' '}
      <Link href="/people">
        <a>People</a>
      </Link>
    </div>
  )
}
