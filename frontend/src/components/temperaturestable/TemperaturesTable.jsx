import React, { memo } from "react"
import "./temperaturestable.css"

import Title from "../title/Title"

function TemperaturesTable(props) {
  return (
    <div>
      <div className="temperaturestablecontainertitle">
        <Title>{props.temperaturesTableTitle}</Title>
      </div>
      <div className="temperaturestable">temperatures selection</div>
    </div>
  )
}

export default memo(TemperaturesTable)
