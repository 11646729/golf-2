import React, { memo } from "react"

import styled from "styled-components"

const EventsTableContainer = styled.table`
  width: 100%;
  justify-content: center;
`

const EventsTHeadContainer = styled.thead`
  background-color: #f5fcee;
  width: 100%;
`

const EventsTRowContainer = styled.tr``

const EventsTBodyContainer = styled.tbody`
  background-color: #f5fcee;
  width: 100%;
`

const EventsHeader = styled.th`
  border: 2px solid grey;
  border-style: solid;
  padding: 30px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-align: center;
  justify-content: center;
`

const EventsItemContainer = styled.tr``

const EventsItem = styled.div`
  margin: 10px;
`

const ThreeRingsEventsList = (props) => {
  return (
    // <table className="cruisestable">
    //   <thead>
    //     <tr className="widgetLgTh">
    //       <th>Day</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {props.data.map((row) => (
    //       <tr className="widgetLgTr" key={row.portarrivalid}>
    //         <td className="widgetLgDay">
    //           <div className="widgetLgDayOfWeek">{row.weekday}</div>
    //         </td>
    //         <td className="widgetLgShip">
    //           <div className="widgetLgShipName">
    //             {row.vesselshortcruisename}
    //           </div>
    //         </td>
    //         <td className="widgetLgArrivalTime">{row.vesseletatime}</td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </table>
    <EventsTableContainer>
      <EventsTHeadContainer>
        <EventsTRowContainer>
          <EventsHeader>Events</EventsHeader>
        </EventsTRowContainer>
      </EventsTHeadContainer>
      {props.eventsData.map((eventsItem) => (
        <EventsTBodyContainer>
          <EventsItemContainer key={eventsItem.id}>
            <EventsItem>{eventsItem.name}</EventsItem>
            <EventsItem>{eventsItem.description}</EventsItem>
          </EventsItemContainer>
        </EventsTBodyContainer>
      ))}
    </EventsTableContainer>
  )
}

export default memo(ThreeRingsEventsList)
