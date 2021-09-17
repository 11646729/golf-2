import React from "react"
import "./cruisepage.css"
import CruiseMap from "../../cruisemap/CruiseMap"
import CruiseTable from "../../cruisetable/CruiseTable"

export default function CruisePage() {
  return (
    <div>
      <div className="container">
        <CruiseTable />
        <CruiseMap CruiseMapTitle={"Map"} />
      </div>
      <div>bottomtest</div>
    </div>
  )
}
