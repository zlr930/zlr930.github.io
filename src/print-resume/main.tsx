import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PrintResumeApp from './PrintResumeApp'
import './print-resume.css'

createRoot(document.getElementById('print-resume-root')!).render(
  <StrictMode>
    <PrintResumeApp />
  </StrictMode>,
)
