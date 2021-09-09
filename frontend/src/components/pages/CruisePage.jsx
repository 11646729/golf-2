import React from "react"
import "./cruisepage.css"
import CruiseMap from "../cruisemap/CruiseMap"
import NewCruiseTable from "../newcruisetable/NewCruiseTable"

export default function CruisePage() {
  return (
    <div>
      <div className="container">
        <NewCruiseTable />
        <CruiseMap CruiseMapTitle={"Map"} />
      </div>
      <div>bottomtest</div>
    </div>
  )
}
