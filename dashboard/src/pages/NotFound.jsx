import { Link } from 'react-router'

// Shown when the address doesn't match any page
export default function NotFound() {
  return (
    <section>
      <h1 className="text-3xl font-bold text-emerald-700">Page not found</h1>
      <p className="mt-2 text-gray-600">
        That page doesn't exist.{' '}
        <Link to="/" className="font-medium text-emerald-700 underline">
          Go to the home page
        </Link>
      </p>
    </section>
  )
}
