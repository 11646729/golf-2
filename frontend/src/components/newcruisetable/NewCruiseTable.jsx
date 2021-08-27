import React from "react"
import "./newcruisetable.css"

export default function NewCruiseTable() {
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Title of Table</h3>
      <table className="wightLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgThDay">Day</th>
          <th className="widgetLgThShip">Ship</th>
          <th className="widgetLgThArrival">Arrival</th>
          <th className="widgetLgThDeparture">Departure</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDay">
            <div className="widgetLgDate">1 August 2021</div>
            <div className="widgetLgDayOfWeek">Monday</div>
          </td>
          <td className="widgetLgShipName">Marella Explorer 2</td>
          <td className="widgetLgArrivalTime">08:00</td>
          <td className="widgetLgDepartureTime">18:00</td>
        </tr>
      </table>
    </div>
  )
}
