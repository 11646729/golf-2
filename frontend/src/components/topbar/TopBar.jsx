import React from "react"
import "./topbar.css"
import { NotificationsNone, Language, Settings } from "@material-ui/icons"

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">My Website</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">1</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="/static/images/brian.jpeg" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}
