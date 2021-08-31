import React from "react"
import "./cruisepage.css"
import NewCruiseTable from "../newcruisetable/NewCruiseTable"
import CruiseMap from "../cruisemap/CruiseMap"

export default function CruisePage() {
  return (
    <div>
      <div className="container">
        <NewCruiseTable
          ChartTitle={"Cruise Ships Arriving Soon"}
          Date={"1 August 2021"}
          DayOfWeek={"Monday"}
          CruiseLineLogo={"/static/images/20.png"}
          altImage={"Marella Cruises"}
          NameOfShip={"Marella Explorer 2"}
          eta={"08:00"}
          etd={"18:00"}
        />
        <CruiseMap CruiseMapTitle={"Map"} />
      </div>
      <div>bottomtest</div>
    </div>
  )
}
