import React from "react"
import Album from "./components/Album"
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

import GoogleMapContainer from "./components/CoursesGMContainer"
import LeafletMap from "./components/LeafletMap"
import CruiseTable from "./components/CruiseTable"
import CrimesMap from "./components/CrimeGMContainer"
import CrimesMapApi from "./components/CrimeGMContainerApi"

const useStyles = makeStyles((theme) => ({
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
            {<HomeIcon />}
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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="googlemap" element={<GoogleMapLink />} />
        <Route path="leaflet" element={<LeafletMapLink />} />
        <Route path="cruisetable" element={<CruiseTableLink />} />
        <Route path="crimesmap" element={<CrimesMapLink />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

function Home() {
  return <Album />
}

function GoogleMapLink() {
  return <GoogleMapContainer />
}

function LeafletMapLink() {
  return <LeafletMap />
}

function CruiseTableLink() {
  return <CruiseTable />
}

function CrimesMapLink() {
  return <CrimesMapApi />
  // return <CrimesMap />
}

function NotFound() {
  return (
    <div>
      <h1>Not found!</h1>
      <p>Sorry your page was not found!</p>
    </div>
  )
}
