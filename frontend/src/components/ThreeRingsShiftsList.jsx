import React, { memo } from "react"
import moment from "moment"
import styled from "styled-components"

const ShiftsTableContainer = styled.table`
  width: 100%;
  justify-content: center;
`

const ShiftsHeaderContainer = styled.thead`
  background-color: #f5fcee;
  width: 100%;
  justify-content: center;
`

const ShiftsDateContainer = styled.div`
  // border: 2px solid grey;
  // border-style: solid;
`
const ShiftsBodyContainer = styled.tbody`
  flex: 1;
  background-color: lightgrey;
  width: 100%;
  justify-content: center;
`

const ShiftsPeriodContainer = styled.tr``

const DateToday = styled.div`
  margin: 30px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-align: center;
`

const ShiftPeriod = styled.td`
  // border: 2px solid grey;
  // border-style: solid;
`

const ShiftTimes = styled.div`
  margin: 10px;
  font-weight: bold;
`

const ShiftPosition = styled.div`
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 20px;
  width: "100%";
`

const ShiftName = styled.div`
  margin: 10px;
  color: darkblue;
`

const ThreeRingsShiftsList = (props) => {
  return (
    <ShiftsTableContainer>
      <ShiftsHeaderContainer>
        <ShiftsDateContainer>
          {/* <tr> */}
          <DateToday>{moment().format("dddd[] Do MMMM YYYY")}</DateToday>
          {/* </tr> */}
        </ShiftsDateContainer>
      </ShiftsHeaderContainer>
      <ShiftsBodyContainer>
        {props.shiftsData.map((shift) => (
          <ShiftsPeriodContainer key={shift.id}>
            <ShiftPeriod>
              <ShiftTimes>
                Shift:
                {moment(shift.start_datetime).format(" HH:mm ")}
                to
                {moment(shift.start_datetime)
                  .add(shift.duration, "s")
                  .format(" HH:mm")}
              </ShiftTimes>
              <ShiftPosition>{shift.rota}:</ShiftPosition>
              {shift.volunteers.map((volunteer) => (
                <ShiftName>{volunteer.name}</ShiftName>
              ))}
            </ShiftPeriod>
          </ShiftsPeriodContainer>
        ))}
      </ShiftsBodyContainer>
    </ShiftsTableContainer>
  )
}

export default memo(ThreeRingsShiftsList)
