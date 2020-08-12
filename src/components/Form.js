import React from "react";
import dragula from "react-dragula";
import firebase from "firebase";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankedTeams: {},
      numOfTeamsRanked: 0,
    };
    this.countTeams = this.countTeams.bind(this);
    this.completeRankings = this.completeRankings.bind(this);
  }
  pushFirestore(submission) {
    let db = firebase.firestore();
    db.collection("rankings").add(submission);
  }
  completeRankings() {
    let date = Date();
    let submission = {
      Date: date,
    };
    let rank = 0;
    document
      .querySelectorAll("#dragElements div")
      .forEach((element) => (submission[++rank] = element.innerText));
    while (submission.length > 21) {
      submission.pop();
    }
    this.pushFirestore(submission);
  }
  countTeams() {
    let rankedTeams = {};
    let rank = 0;
    document
      .querySelectorAll("#dropTarget div")
      .forEach((element) => (rankedTeams[++rank] = element.innerText));
    this.setState({
      rankedTeams: rankedTeams,
      numOfTeamsRanked: Object.keys(rankedTeams).length,
    });
  }
  render() {
    const listTeams = this.props.unrankedTeams.map((team) => (
      <div id={team} className="formElem" key={team}>
        {team}
      </div>
    ));

    return (
      <div className="Form" id="dragElements">
        {listTeams}
      </div>
    );
  }
  componentDidMount() {
    dragula(
      [
        document.getElementById("dragElements"),
        document.getElementById("dropTarget"),
      ],
      {
        revertOnSpill: true,
        mirrorContainer: document.body,
      }
    );
  }
}

export default Form;
