import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import TopBar from "./components/topbar/TopBar"
import Album from "./components/Album"
import RawDataLoad from "./components/rawdataload/RawDataLoad"
import TemperaturesChart from "./components/temperatureschart/TemperaturesChart"
import GolfCoursesPage from "../src/pages/golfcourses/GolfCoursesPage"
import CrimesMap from "./components/crimesmap/CrimesMap"
import CruisesPage from "./pages/cruises/CruisesPage"
import TransportPage from "../src/pages/transport/TransportPage"

export default function App() {
  return (
    <div>
      <TopBar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="loadrawdata" element={<RawDataLoadLink />} />
          <Route path="temperaturespage" element={<TemperaturesPageLink />} />
          <Route path="golfcoursespage" element={<GolfCoursesPageLink />} />
          <Route path="crimespage" element={<CrimesPageLink />} />
          <Route path="cruisespage" element={<CruisesPageLink />} />
          <Route path="transportpage" element={<TransportPageLink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

function Home() {
  return <Album />
}

function RawDataLoadLink() {
  return <RawDataLoad />
}

function TemperaturesPageLink() {
  return <TemperaturesChart />
}

function GolfCoursesPageLink() {
  return <GolfCoursesPage />
}

function CruisesPageLink() {
  return <CruisesPage />
}

function CrimesPageLink() {
  return <CrimesMap />
}

function TransportPageLink() {
  return <TransportPage />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
