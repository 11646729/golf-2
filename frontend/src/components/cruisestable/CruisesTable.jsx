import React, { memo } from "react"
import "./cruisestable.css"

const CruisesTable = (props) => {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="widgetLg">
      <table className="cruisestable">
        <thead>
          <tr className="widgetLgTh">
            <th>Day</th>
            <th>Ship</th>
            <th>Arrival</th>
            <th>Departure</th>
            <th>Itinerary</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
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

export default memo(CruisesTable)
