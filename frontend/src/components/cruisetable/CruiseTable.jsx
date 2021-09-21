import React, { memo } from "react"
import "./cruisetable.css"

// -------------------------------------------------------
// React component
// -------------------------------------------------------
function CruiseTable(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{"Cruise Ships Arriving Soon"}</h3>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTh">
            <th className="widgetLgThDay">Day</th>
            <th className="widgetLgThShip">Ship</th>
            <th className="widgetLgThArrival">Arrival</th>
            <th className="widgetLgThDeparture">Departure</th>
            <th className="widgetLgThDeparture">Itinerary</th>
          </tr>
        </thead>
        <tbody>
          {props.cruiseData.map((row) => (
            <tr className="widgetLgTr" key={row.portarrivalid}>
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
                <div className="widgetLgShipName">
                  {row.vesselshortcruisename}
                </div>
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

export default memo(CruiseTable)
