import React, { memo } from "react"
import moment from "moment"
// import "./cruisestable.css"

const ThreeRingsShiftsList = (props) => {
  return (
    <div className="widgetLg">
      <table className="cruisestable">
        <thead>
          <tr className="widgetLgTh">
            <th>{moment().format("DD/MM/YYYY")}</th>
          </tr>
        </thead>
        <tbody>
          {props.shiftsData.map((shift) => (
            <tr className="widgetLgTr" key={shift.id}>
              <td className="widgetLgDay">
                <div className="widgetLgDate">
                  Shift:
                  {moment(shift.start_datetime).format("HH:mm")}
                  <a> to </a>
                  {moment(shift.start_datetime)
                    .add(shift.duration, "s")
                    .format("HH:mm")}
                </div>
                <div className="widgetLgDayOfWeek">{shift.duration}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(ThreeRingsShiftsList)
