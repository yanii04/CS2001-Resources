import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Header from './Header.jsx'
import Sidebar from './Sidebar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Sidebar />
  </StrictMode>,
)
