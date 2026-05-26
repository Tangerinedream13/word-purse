import { BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import AddWordPage from "./pages/AddWordPage"
import WordDetailPage from "./pages/WordDetailPage"

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/"          element={<HomePage />} />
        <Route path="/add"       element={<AddWordPage />} />
        <Route path="/words/:id" element={<WordDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}
