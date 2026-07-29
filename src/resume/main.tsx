import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ResumeApp from './ResumeApp'
import './resume.css'

createRoot(document.getElementById('resume-root')!).render(
  <StrictMode>
    <ResumeApp />
  </StrictMode>,
)
