import React from "react"
import "./newcruisetable.css"

export default function NewCruiseTable(props) {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">{props.ChartTitle}</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTh">
          <th className="widgetLgThDay">Day</th>
          <th className="widgetLgThShip">Ship</th>
          <th className="widgetLgThArrival">Arrival</th>
          <th className="widgetLgThDeparture">Departure</th>
          <th className="widgetLgThDeparture">Itinerary</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDay">
            <div className="widgetLgDate">{props.Date}</div>
            <div className="widgetLgDayOfWeek">{props.DayOfWeek}</div>
          </td>
          <td className="widgetLgShip">
            <img
              className="widgetLgShipImage"
              src={props.CruiseLineLogo}
              alt={props.altImage}
            ></img>
            <span className="widgetLgShipName">{props.NameOfShip}</span>
          </td>
          <td className="widgetLgArrivalTime">{props.eta}</td>
          <td className="widgetLgDepartureTime">{props.etd}</td>
          <td className="widgetLgItinerary">
            <Button type="Show" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDay">
            <div className="widgetLgDate">{props.Date}</div>
            <div className="widgetLgDayOfWeek">{props.DayOfWeek}</div>
          </td>
          <td className="widgetLgShip">
            <img
              className="widgetLgShipImage"
              src={props.CruiseLineLogo}
              alt={props.altImage}
            ></img>
            <span className="widgetLgShipName">{props.NameOfShip}</span>
          </td>
          <td className="widgetLgArrivalTime">{props.eta}</td>
          <td className="widgetLgDepartureTime">{props.etd}</td>
          <td className="widgetLgItinerary">
            <Button type="Show" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDay">
            <div className="widgetLgDate">{props.Date}</div>
            <div className="widgetLgDayOfWeek">{props.DayOfWeek}</div>
          </td>
          <td className="widgetLgShip">
            <img
              className="widgetLgShipImage"
              src={props.CruiseLineLogo}
              alt={props.altImage}
            ></img>
            <span className="widgetLgShipName">{props.NameOfShip}</span>
          </td>
          <td className="widgetLgArrivalTime">{props.eta}</td>
          <td className="widgetLgDepartureTime">{props.etd}</td>
          <td className="widgetLgItinerary">
            <Button type="Show" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgDay">
            <div className="widgetLgDate">{props.Date}</div>
            <div className="widgetLgDayOfWeek">{props.DayOfWeek}</div>
          </td>
          <td className="widgetLgShip">
            <img
              className="widgetLgShipImage"
              src={props.CruiseLineLogo}
              alt={props.altImage}
            ></img>
            <span className="widgetLgShipName">{props.NameOfShip}</span>
          </td>
          <td className="widgetLgArrivalTime">{props.eta}</td>
          <td className="widgetLgDepartureTime">{props.etd}</td>
          <td className="widgetLgItinerary">
            <Button type="Hide" />
          </td>
        </tr>
      </table>
    </div>
  )
}
