import React, { memo } from "react"
import moment from "moment"
import "./ThreeRingsEventsList2.css"

import styled from "styled-components"

const EventsTableContainer = styled.table`
  width: 100%;
  justify-content: center;
`

const EventsTHeadContainer = styled.thead``

const EventsTRowContainer = styled.tr``

const EventsTBodyContainer = styled.tbody``

const EventsHeader = styled.th`
  // width: 100%;
  background-color: #f5fcee;
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

const EventItem = styled.td`
  background-color: lightgrey;
  width: 90%;
  border: 2px solid grey;
  border-style: solid;
  // padding: 30px;
  text-align: center;
  justify-content: center;
`

const EventItemDate = styled.div`
  margin: 10px;
  font-weight: bold;
`

const EventItemTitle = styled.div`
  margin: 10px;
  font-weight: bold;
  font-size: 20px;
`

const EventItemDetails = styled.div`
  margin: 10px;
`

const EventItemAuthor = styled.div`
  margin: 10px;
`

const ThreeRingsEventsList = (props) => {
  return (
    <table className="cruisestable">
      <thead>
        <tr className="widgetLgTh">
          <th>Day</th>
        </tr>
      </thead>
      <tbody>
        {props.eventsData.map((eventsItem) => (
          <tr className="widgetLgTr" key={eventsItem.id}>
            <td className="widgetLgDay">
              <div className="widgetLgDayOfWeek">
                {moment(eventsItem.date).utc().format("dddd[] Do MMMM YYYY")}
              </div>
            </td>
            <td className="widgetLgShip">
              <div className="widgetLgShipName">{eventsItem.name}</div>
            </td>
            <td className="widgetLgArrivalTime">{eventsItem.creator.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
    //   <EventsTableContainer>
    //     <EventsTHeadContainer>
    //       <EventsTRowContainer>
    //         <EventsHeader>Events</EventsHeader>
    //       </EventsTRowContainer>
    //     </EventsTHeadContainer>
    //     <EventsTBodyContainer>
    //       {props.eventsData.map((eventsItem) => (
    //         <EventsItemContainer key={eventsItem.id}>
    //           <EventItem>
    //             {/* <EventItemDate>
    //               {moment(eventsItem.date).utc().format("dddd[] Do MMMM YYYY")}
    //             </EventItemDate>
    //             <EventItemTitle>{eventsItem.name}</EventItemTitle>
    //             <EventItemDetails>{eventsItem.description}</EventItemDetails>
    //             <EventItemAuthor>{eventsItem.creator.name}</EventItemAuthor> */}
    //           </EventItem>
    //         </EventsItemContainer>
    //       ))}
    //     </EventsTBodyContainer>
    //   </EventsTableContainer>
  )
}

export default memo(ThreeRingsEventsList)
