import React, { memo } from "react"
import PropTypes from "prop-types"
import { useTable } from "@tanstack/react-table"
import styled from "styled-components"

import Title from "./Title"

const CruisesTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const CruisesTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const Button = () => <button type="button">Show</button>

const CruisesTable2 = (props) => {
  const { cruisesTableTitle, data } = props

  CruisesTable2.propTypes = {
    cruisesTableTitle: PropTypes.string,
    data: PropTypes.array,
    loadingError: PropTypes.string,
  }

  const columns = React.useMemo(
    () => [
      {
        Header: "Day",
        accessor: "arrivalDate",
      },
      {
        Header: "Ship",
        accessor: "vesselshortcruisename",
        Cell: (tableProps) => (
          <div>
            <img
              src={tableProps.row.original.cruiselinelogo}
              alt="Cruise Line Logo"
              width="30px"
              height="30px"
            />
            <i> This text is bold</i>
          </div>
        ),
      },
      {
        Header: "Arrival Time",
        accessor: "vesseletatime",
      },
      {
        Header: "Departure Time",
        accessor: "vesseletdtime",
      },
      {
        Header: "Itinerary",
        accessor: "cruiselinelogo",
        Cell: () => <Button type="Show" />,
      },
    ],
    []
  )

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div>
      <CruisesTableTitleContainer>
        <Title>{cruisesTableTitle}</Title>
      </CruisesTableTitleContainer>
      <CruisesTableContainer>
        <table
          {...getTableProps()}
          style={{
            width: "94%",
            marginLeft: "20px",
            marginRight: "20px",
            borderSpacing: "20px",
            border: "1px solid lightgray",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps()}
                    style={{
                      fontSize: "14px",
                      padding: "10px",
                      color: "black",
                    }}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        fontSize: "13px",
                        padding: "10px",
                        border: "solid 1px lightgray",
                        background: "papayawhip",
                        textAlign: "center",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </CruisesTableContainer>
    </div>
  )
}

export default memo(CruisesTable2)
