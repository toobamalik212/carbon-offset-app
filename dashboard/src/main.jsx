import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import RouterBridge from './components/RouterBridge.jsx'

// BrowserRouter lets the app have pages with their own addresses (/dashboard, /onboarding/welcome)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RouterBridge>
        <App />
      </RouterBridge>
    </BrowserRouter>
  </StrictMode>,
)
