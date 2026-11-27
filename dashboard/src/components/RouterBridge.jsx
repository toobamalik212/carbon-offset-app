import { useHref, useNavigate } from 'react-router'
import { RouterProvider } from 'react-aria-components'

// Lets Untitled UI links (built on React Aria) change pages through React Router,
// instead of reloading the whole site
export default function RouterBridge({ children }) {
  const navigate = useNavigate()
  return (
    <RouterProvider navigate={navigate} useHref={useHref}>
      {children}
    </RouterProvider>
  )
}
