import { Routes, Route } from 'react-router'
import { HomePage } from './pages/HomePage'
import { FormPage } from './pages/FormPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  )
}
export default App