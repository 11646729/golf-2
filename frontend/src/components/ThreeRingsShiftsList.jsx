import React, { memo } from "react"
import moment from "moment"
import styled from "styled-components"

const DateToday = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const ShiftPeriod = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RotaName = styled.div`
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const ThreeRingsShiftsList = (props) => {
  return (
    <div className="shiftsWidget">
      <table className="shiftsTable">
        <thead>
          <DateToday>
            <DateToday>{moment().format("DD/MM/YYYY")}</DateToday>
          </DateToday>
        </thead>
        <tbody>
          {props.shiftsData.map((shift) => (
            <tr className="widgetLgTr" key={shift.id}>
              <td className="widgetLgDay">
                <ShiftPeriod>
                  <a>Shift: </a>
                  {moment(shift.start_datetime).format("HH:mm")}
                  <a> to </a>
                  {moment(shift.start_datetime)
                    .add(shift.duration, "s")
                    .format("HH:mm")}
                </ShiftPeriod>
                <RotaName>{shift.rota}</RotaName>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default memo(ThreeRingsShiftsList)
