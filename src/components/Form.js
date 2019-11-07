import React from "react";
import dragula from "react-dragula";
import firebase from "firebase";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankedTeams: {},
      numOfTeamsRanked: 0
    };
    this.countTeams = this.countTeams.bind(this);
    this.completeRankings = this.completeRankings.bind(this);
  }
  pushFirestore(submission) {
    let db = firebase.firestore();
    db.collection("rankings").add(submission);
  }
  completeRankings() {
    let name = prompt("What is your name?");
    let country = prompt("What country are you from?");
    let date = Date();
    let submission = {
      Ranker: name,
      Country: country,
      Date: date
    };
    let rank = 0;
    document
      .querySelectorAll("#dropTarget div")
      .forEach(element => (submission[++rank] = element.innerText));
    this.pushFirestore(submission);
  }
  countTeams() {
    let rankedTeams = {};
    let rank = 0;
    document
      .querySelectorAll("#dropTarget div")
      .forEach(element => (rankedTeams[++rank] = element.innerText));
    this.setState({
      rankedTeams: rankedTeams,
      numOfTeamsRanked: Object.keys(rankedTeams).length
    });
  }
  render() {
    const listTeams = this.props.unrankedTeams.map(team => (
      <div id={team} className="formElem" key={team}>
        {team}
      </div>
    ));

    return (
      <div className="Form">
        <div className="titleBox">
          <h2>Last Week's Rankings</h2>
          <p>
            Please drag teams from the left box into the right box. When you've
            finished, click the submit button at the bottom.
          </p>
        </div>
        <div className="titleBox">
          <h2>Your Rankings</h2>
          <p>
            You have ranked {this.state.numOfTeamsRanked} out of 20 teams.
            Please complete all 20 of your rankings before you submit.
          </p>
        </div>
        <div className="dragBox" id="dragElements">
          {listTeams}
        </div>
        <div className="dragBox" id="dropTarget"></div>
        <button
          disabled={this.state.numOfTeamsRanked !== 20}
          id="formSubmit"
          onClick={this.completeRankings}
        >
          submit
        </button>
      </div>
    );
  }
  componentDidMount() {
    dragula(
      [
        document.getElementById("dragElements"),
        document.getElementById("dropTarget")
      ],
      {
        revertOnSpill: true,
        mirrorContainer: document.body
      }
    ).on("drop", this.countTeams);
  }
}

export default Form;
