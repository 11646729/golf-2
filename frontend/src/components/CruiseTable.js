import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
} from "@material-ui/core"

const columns = [
  { id: "name", label: "Name", minWidth: 70 },
  { id: "code", label: "ISO\u00a0Code", minWidth: 50 },
  {
    id: "population",
    label: "Population",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "size",
    label: "Size\u00a0(km\u00b2)",
    minWidth: 100,
    align: "right",
    format: (value) => value.toLocaleString(),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 100,
    align: "right",
    format: (value) => value.toFixed(2),
  },
]

function createData(name, code, population, size) {
  const density = population / size
  return { name, code, population, size, density }
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
]

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    marginTop: 50,
    maxHeight: 440,
  },
})

export default function CruiseTableCard() {
  const classes = useStyles()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [portArrivals, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])

  // Fetch data - after componentHasUpdated
  const url = "http://localhost:5000/api/cruise/portArrivals"

  // Now fetch cruise arrivals & vessels data
  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        setLoading(true)
        setError({})
        const result = await axios(url)
        if (!ignore) setData(result.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  console.log(portArrivals[0])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
