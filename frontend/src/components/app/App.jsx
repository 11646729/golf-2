import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import RawDataLoadPage from "../../pages/rawdataload/RawDataLoadPage"
import TemperaturesPage from "../../pages/temperatures/TemperaturesPage"
import GolfCoursesPage from "../../pages/golfcourses/GolfCoursesPage"
import CruisesPage from "../../pages/cruises/CruisesPage"
import TransportPage from "../../pages/transport/TransportPage"
import Album from "../album/Album"
import TopBar from "../topbar/TopBar"
import CrimesMap from "../crimesmap/CrimesMap"

export default function App() {
  return (
    <div>
      <TopBar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="loadrawdatapage" element={<RawDataLoadPageLink />} />
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

function RawDataLoadPageLink() {
  return <RawDataLoadPage />
}

function TemperaturesPageLink() {
  return <TemperaturesPage />
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
