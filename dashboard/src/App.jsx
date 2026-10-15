import Header from './components/Header.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 p-12">
        <h1 className="text-3xl font-bold text-emerald-700">
          Estimate your carbon footprint
        </h1>
        <p className="mt-2 text-gray-600">
          See how to offset it.
        </p>
      </main>
    </>
  )
}