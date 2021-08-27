import React from "react"
import "./cruisepage.css"
import NewCruiseTable from "../newcruisetable/NewCruiseTable"
import OtherPages from "../otherpages/OtherPages"

export default function CruisePage() {
  return (
    <div className="container">
      <NewCruiseTable />
      <OtherPages />
    </div>
  )
}
