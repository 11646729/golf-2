import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles"
import {
  AppBar,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SaveIcon from "@material-ui/icons/Save"
import EditIcon from "@material-ui/icons/Edit"
import HomeIcon from "@material-ui/icons/Home"
import MenuIcon from "@material-ui/icons/Menu"

import Album from "./components/Album"
import WeatherChart from "./components/WeatherChart"
import CoursesMap from "./components/CoursesMap"
import CruiseTable from "./components/CruiseTable"
import CrimesMap from "./components/CrimesMap"
import TransportMap from "./components/TransportMap"
import GTFSTransportMap from "./components/GTFSTransportMap"
import GTFSTestMap from "./components/GTFSTestMap"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 0,
    height: 30,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  // This group of buttons will be aligned to the right
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12,
  },
}))

export default function App() {
  const classes = useStyles()
  return (
    <Router>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              aria-label="Menu"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              color="inherit"
              aria-label="Home"
              // tooltip="Home"
              // linkButton="true"
              href="/"
            >
              <HomeIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              My Website
            </Typography>
            <section className={classes.rightToolbar}>
              <IconButton color="inherit" aria-label="Edit">
                <EditIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="Save">
                <SaveIcon />
              </IconButton>
              <IconButton color="inherit" aria-label="More Options">
                <MoreVertIcon />
              </IconButton>
            </section>
          </Toolbar>
        </AppBar>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="weatherchart" element={<WeatherChartLink />} />
        <Route path="golfcoursesmap" element={<CoursesMapLink />} />
        <Route path="cruisetable" element={<CruiseTableLink />} />
        <Route path="crimesmap" element={<CrimesMapLink />} />
        <Route path="transportmap" element={<TransportMapLink />} />
        <Route path="gtfstransportmap" element={<GTFSTransportMapLink />} />
        <Route path="gtfstestmap" element={<GTFSTestMapLink />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return <Album />
}

function WeatherChartLink() {
  return <WeatherChart />
}

function CoursesMapLink() {
  return <CoursesMap />
}

function CruiseTableLink() {
  return <CruiseTable />
}

function CrimesMapLink() {
  return <CrimesMap />
}

function TransportMapLink() {
  return <TransportMap />
}

function GTFSTransportMapLink() {
  return <GTFSTransportMap />
}

function GTFSTestMapLink() {
  return <GTFSTestMap />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
