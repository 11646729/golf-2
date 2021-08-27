import React from "react"
import { Link } from "react-router-dom"
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
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
}))

export default function CruiseCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="/static/images/CruiseShips.jpg"
        title="Cruise Ship in Belfast Lough"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Cruise Ship Arrivals
        </Typography>
        <Typography>
          Details about the Cruise Ships arriving soon in Belfast
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" component={Link} to="/cruisetable">
          View
        </Button>
      </CardActions>
    </Card>
  )
}