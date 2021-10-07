import React, { memo } from "react"
import "./golfcoursestable.css"

import Title from "../title/Title"

function GolfCoursesTable(props) {
  return (
    <div>
      <div className="golfcoursestablecontainertitle">
        <Title>{props.golfCoursesTableTitle}</Title>
        {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
      </div>
      <div className="golfcoursestable">golf courses selection</div>
    </div>
  )
}

export default memo(GolfCoursesTable)
