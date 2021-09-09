import React, { useState, useEffect, memo } from "react"
import getData from "../Utilities"
import "./newcruisetable.css"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function NewCruiseTable() {
  const [portArrivals, setData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getData("http://localhost:5000/api/cruise/portArrivals")
      .then((returnedData) => (isSubscribed ? setData(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  // if (portArrivals.cruiseData.length > 0) {
  return (
    <NewCruiseTableView cruiseData={portArrivals} loadingError={loadingError} />
  )
  // }
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function NewCruiseTableView(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  console.log(props.cruiseData)

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{"Cruise Ships Arriving Soon"}</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTh">
            <th className="widgetLgThID">ID</th>
            <th className="widgetLgThDay">Day</th>
            <th className="widgetLgThShip">Ship</th>
            <th className="widgetLgThArrival">Arrival</th>
            <th className="widgetLgThDeparture">Departure</th>
            <th className="widgetLgThDeparture">Itinerary</th>
          </tr>
        </thead>
        <tbody>
          {props.cruiseData.map((row) => (
            <tr className="widgetLgTr">
              <td className="widgetLgID">{row.portarrivalid}</td>
              <td className="widgetLgDay">
                <div className="widgetLgDate">{row.arrivalDate}</div>
                <div className="widgetLgDayOfWeek">{row.weekday}</div>
              </td>
              <td className="widgetLgShip">
                <img
                  className="widgetLgShipImage"
                  src={row.cruiselinelogo}
                  alt={"Cruise Line Logo"}
                ></img>
                <span className="widgetLgShipName">
                  {row.vesselshortcruisename}
                </span>
              </td>
              <td className="widgetLgArrivalTime">{row.vesseletatime}</td>
              <td className="widgetLgDepartureTime">{row.vesseletdtime}</td>
              <td className="widgetLgItinerary">
                <Button type="Show" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(NewCruiseTable)
