import React from "react"
import Album from "./components/Album"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import GoogleMapCard from "./components/GoogleMapCard"

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="googlemap" element={<GoogleMap />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return <Album />
}

function GoogleMap() {
  return <GoogleMapCard />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
