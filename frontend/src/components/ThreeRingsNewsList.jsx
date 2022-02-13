import React, { memo } from "react"

import styled from "styled-components"

const NewsTableContainer = styled.table`
  width: 100%;
  justify-content: center;
`

const NewsTHeadContainer = styled.thead`
  background-color: #f5fcee;
  width: 100%;
`

const NewsTRowContainer = styled.tr``

const NewsTBodyContainer = styled.tbody`
  background-color: #f5fcee;
  width: 100%;
`

const NewsHeader = styled.th`
  border: 2px solid grey;
  border-style: solid;
  padding: 30px;
  font-weight: bold;
  font-size: 30px;
  color: darkblue;
  text-align: center;
  justify-content: center;
`

const NewsItemContainer = styled.tr``

const NewsItem = styled.div`
  margin: 10px;
`

const ThreeRingsNewsList = (props) => {
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
    <NewsTableContainer>
      <NewsTHeadContainer>
        <NewsTRowContainer>
          <NewsHeader>News</NewsHeader>
        </NewsTRowContainer>
      </NewsTHeadContainer>
      {props.newsData.map((newsItem) => (
        <NewsTBodyContainer>
          <NewsItemContainer key={newsItem.id}>
            <NewsItem>{newsItem.body}</NewsItem>
          </NewsItemContainer>
        </NewsTBodyContainer>
      ))}
    </NewsTableContainer>
  )
}

export default memo(ThreeRingsNewsList)
