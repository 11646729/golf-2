import React, { Component } from "react"
import Album from "./components/Album"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/launch">Launch</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="launch" element={<Launch />}>
          {/* <Route path="/" element={<LaunchIndex />} />
          <Route path=":slug" element={<LaunchShoe />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Launch() {
  return (
    <div>
      <h1>Launch</h1>
    </div>
  )
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}

function Home() {
  return (
    <React.Fragment>
      <Album />
    </React.Fragment>
  )
}
