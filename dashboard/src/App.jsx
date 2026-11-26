import { Outlet, Route, Routes } from 'react-router'
import Header from './components/Header.jsx'
import Calculator from './pages/Calculator.jsx'
import Results from './pages/Results.jsx'
import HowWeCalculate from './pages/HowWeCalculate.jsx'
import NotFound from './pages/NotFound.jsx'
import Preview from './pages/Preview.jsx'
import OnboardingModule from './modules/onboarding/OnboardingModule.jsx'
import SignInPage from './modules/onboarding/SignInPage.jsx'
import StartRedirect from './modules/onboarding/StartRedirect.jsx'
import MetricsPage from './modules/metrics/MetricsPage.jsx'

// The older pages keep the top header until their modules replace them
function LegacyLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default function App() {
  return (
    // Shows the one page whose path matches the address bar
    <Routes>
      {/* "/" sends people to onboarding, sign-in or the dashboard */}
      <Route path="/" element={<StartRedirect />} />

      {/* Module 01: Getting started (flow F1) */}
      <Route path="/onboarding/:stepId" element={<OnboardingModule />} />
      <Route path="/onboarding" element={<StartRedirect />} />
      <Route path="/sign-in" element={<SignInPage />} />

      {/* Module 02: Metrics (flow F2), a placeholder for now */}
      <Route path="/metrics" element={<MetricsPage />} />

      <Route element={<LegacyLayout />}>
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/results" element={<Results />} />
        <Route path="/how-we-calculate" element={<HowWeCalculate />} />
        {/* Design system showcase, for checking the Untitled UI components */}
        <Route path="/preview" element={<Preview />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
