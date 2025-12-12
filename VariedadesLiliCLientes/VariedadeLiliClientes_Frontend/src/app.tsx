import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ClienteApp } from './clientes.app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClienteApp/>
  </StrictMode>,
)
