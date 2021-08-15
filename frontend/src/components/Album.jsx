import React from "react"
import {
  Button,
  Grid,
  Typography,
  Container,
  makeStyles,
} from "@material-ui/core"

import CopyRight from "../components/copyright/CopyRight"
import RawDataLoadCard from "./RawDataLoadCard"
import TemperaturesCard from "./TemperaturesCard"
import GolfCoursesCard from "./GolfCoursesCard"
import CrimesCard from "./CrimesCard"
import CruiseTableCard from "./CruiseTableCard"
import TransportCard from "./TransportCard"

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: "100%",
  },
}))

export default function Album() {
  const classes = useStyles()

  return (
    <div>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              My Dashboard
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Something short and leading about ...
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Main call to action
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          {/* End hero unit */}
          <Grid container>
            <Grid item sm={4} style={{ padding: 20 }}>
              <RawDataLoadCard />
            </Grid>
            <Grid item sm={4} style={{ padding: 20 }}>
              <TemperaturesCard />
            </Grid>
            <Grid item sm={4} style={{ padding: 20 }}>
              <GolfCoursesCard />
            </Grid>
            <Grid item sm={4} style={{ padding: 20 }}>
              <CrimesCard />
            </Grid>
            <Grid item sm={4} style={{ padding: 20 }}>
              <CruiseTableCard />
            </Grid>
            <Grid item sm={4} style={{ padding: 20 }}>
              <TransportCard />
            </Grid>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <CopyRight />
      </footer>
      End footer
    </div>
  )
}
