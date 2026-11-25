import { Route, Routes } from 'react-router'
import Header from './components/Header.jsx'
import Home from './pages/Home.jsx'
import Calculator from './pages/Calculator.jsx'
import Results from './pages/Results.jsx'
import HowWeCalculate from './pages/HowWeCalculate.jsx'
import NotFound from './pages/NotFound.jsx'
import Preview from './pages/Preview.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        {/* Shows the one page whose path matches the address bar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/results" element={<Results />} />
          <Route path="/how-we-calculate" element={<HowWeCalculate />} />
          {/* Design system showcase, for checking the Untitled UI components */}
          <Route path="/preview" element={<Preview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}
