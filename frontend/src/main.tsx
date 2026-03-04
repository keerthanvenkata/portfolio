import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import posthog from 'posthog-js'
import { PostHogProvider } from '@posthog/react'
import App from './App'
import './styles.css'

const posthogKey = import.meta.env.VITE_PUBLIC_POSTHOG_TOKEN
const posthogHost = import.meta.env.VITE_PUBLIC_POSTHOG_HOST

if (posthogKey && typeof posthogKey === 'string' && posthogKey.length > 0) {
  posthog.init(posthogKey, {
    api_host: posthogHost || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false, // we capture pageviews on route change in App
  })
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PostHogProvider client={posthog}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostHogProvider>
  </React.StrictMode>
)


