import React from "react";

function Rankings(props) {
  let counter = 1;
  const listItems = props.rankedTeams.map((teamObject) => (
    <div className="tblRow">
      <div className="tblRankNum">#{counter++}</div>
      <div className="tblTeamName">{teamObject.name}</div>
      <div className="tblPoints">({teamObject.points} points)</div>
    </div>
  ));
  return <div className="tbl">{listItems}</div>;
}

export default Rankings;
