import React, { memo } from "react"

import "./rawdataloadpage.css"

function RawDataLoadPage() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }

  return (
    <div className="container">
      <div>In RawDataLoadPage.jsx</div>
      <Button type="Show" />
    </div>
  )
}

export default memo(RawDataLoadPage)
