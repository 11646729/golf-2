import React from "react"
import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

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

export default function CruiseTableCard() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image="/static/images/NearbyClubs.jpg"
        title="Nearby Golf Clubs"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          Cruise Ship Arivals
        </Typography>
        <Typography>
          This shows details of the Cruise Ships arriving soon in Belfast
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
