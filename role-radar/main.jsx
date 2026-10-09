import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrimeReactProvider } from '@primereact/core'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import App from './components/App'
import './styles.css'
import { PRIMEUI_LICENSE } from './utils/chaves'

ReactDOM.createRoot(document.getElementById('root')).render(
  <PrimeReactProvider license={PRIMEUI_LICENSE} theme={{ preset: Aura }}>
    <App />
  </PrimeReactProvider>
)
