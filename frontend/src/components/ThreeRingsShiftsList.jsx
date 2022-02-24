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

const ShiftsDateContainer = styled.tr``

const ShiftsBodyContainer = styled.tbody`
  flex: 1;
  background-color: lightgrey;
  width: 100%;
  justify-content: center;
`

const ShiftsPeriodContainer = styled.tr``

const DateToday = styled.th`
  padding: 30px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-align: center;
`

const ShiftPeriod = styled.td``

const ShiftTimes = styled.div`
  margin: 10px;
  font-weight: bold;
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
          <DateToday>{moment().format("dddd[] Do MMMM YYYY")}</DateToday>
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
              <ShiftName>
                {shift.rota}: {shift.nameString}
              </ShiftName>
            </ShiftPeriod>
          </ShiftsPeriodContainer>
        ))}
      </ShiftsBodyContainer>
    </ShiftsTableContainer>
  )
}

export default memo(ThreeRingsShiftsList)
