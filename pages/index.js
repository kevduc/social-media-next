import Link from 'next/link'

export default function IndexPage() {
  return (
    <nav class="navbar py-2 navbar-dark bg-primary">
      <Link href="/">
        <a class="navbar-brand mx-4">Social Media</a>
      </Link>
      <ul class="navbar-nav me-auto">
        <li class="nav-item mx-2">
          <Link href="/people">
            <a class="nav-link active">People</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
