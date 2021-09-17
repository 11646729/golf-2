import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import TopBar from "./components/topbar/TopBar"
import Album from "./components/Album"
import RawDataLoad from "./components/rawdataload/RawDataLoad"
import TemperaturesChart from "./components/temperatureschart/TemperaturesChart"
import GolfCoursesMap from "./components/golfcourses/GolfCoursesMap"
import CrimesMap from "./components/crimesmap/CrimesMap"
import CruisePage from "./components/pages/cruise/CruisePage"
import TransportPage from "./components/pages/transport/TransportPage"

export default function App() {
  return (
    <div>
      <TopBar />

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="loadrawdata" element={<RawDataLoadLink />} />
          <Route path="temperatureschart" element={<TemperaturesChartLink />} />
          <Route path="golfcoursesmap" element={<GolfCoursesMapLink />} />
          <Route path="crimesmap" element={<CrimesMapLink />} />
          <Route path="cruisetable" element={<CruiseTableLink />} />
          <Route path="transportmap" element={<TransportMapLink />} />
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

function TemperaturesChartLink() {
  return <TemperaturesChart />
}

function GolfCoursesMapLink() {
  return <GolfCoursesMap />
}

function CruiseTableLink() {
  return <CruisePage />
}

function CrimesMapLink() {
  return <CrimesMap />
}

function TransportMapLink() {
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
