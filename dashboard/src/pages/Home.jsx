import { Link } from 'react-router'

export default function Home() {
  return (
    <section className="max-w-2xl">
      <h1 className="text-4xl font-bold text-emerald-700">
        What does your digital life cost the planet?
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        Streaming, video calls and AI prompts all use energy and water. Tell
        Ecobex about your habits and see an estimate of your footprint, plus
        ways to offset it.
      </p>
      <Link
        to="/calculator"
        className="mt-8 inline-block rounded-lg bg-emerald-700 px-5 py-3 font-medium text-white hover:bg-emerald-800"
      >
        Start the calculator
      </Link>
    </section>
  )
}
