import React from "react";
import TableView from "react-table-view";

function Table(props) {
  if (props.rankedTeams.length > 0) {
    return <TableView data={props.rankedTeams} />;
  } else {
    return <p>Bear with us...</p>;
  }
}

export default Table;
