import React, { memo } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import RawDataPage from "../pages/RawDataPage"
import TemperaturesPage from "../pages/TemperaturesPage"
import GolfCoursesPage from "../pages/GolfCoursesPage"
import CruisesPage from "../pages/CruisesPage"
import BusPage from "../pages/BusPage"
import Album from "./Album"
import TopBar from "./TopBar"
import CrimesMap from "./crimesmap/CrimesMap"

function App() {
  return (
    <div>
      <TopBar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="rawdatapage" element={<RawDataPageLink />} />
          <Route path="temperaturespage" element={<TemperaturesPageLink />} />
          <Route path="golfcoursespage" element={<GolfCoursesPageLink />} />
          <Route path="crimespage" element={<CrimesPageLink />} />
          <Route path="cruisespage" element={<CruisesPageLink />} />
          <Route path="buspage" element={<BusPageLink />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  )
}

function Home() {
  return <Album />
}

function RawDataPageLink() {
  return <RawDataPage />
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

function BusPageLink() {
  return <BusPage />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}

export default memo(App)
