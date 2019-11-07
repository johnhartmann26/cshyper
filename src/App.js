import React from "react";
import Header from "./components/Header";
import Table from "./components/Table";
import Form from "./components/Form";
import firebase from "./firebase";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      numOfRankers: 0,
      isAdmin: false,
      rankedTeams: [],
      rankings: []
    };
    this.calcRankings = this.calcRankings.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.switchTab = this.switchTab.bind(this);
    this.pullFirestore = this.pullFirestore.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    this.pullFirestore();
  }
  pullFirestore() {
    let db = firebase.firestore();
    db.collection("rankings")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.setState(curr => {
            let pushed = curr.rankings.concat(doc.data());
            return {
              rankings: pushed
            };
          });
        });
      })
      .then(this.calcRankings);
  }

  calcRankings() {
    let response = this.state.rankings;
    let rankings = [];
    let allTeams = [];
    this.setState({ numOfRankers: response.length });
    for (let i = 0; i < response.length; i++) {
      let individualRanking = {
        ranker: response[i]["Ranker"],
        country: response[i]["Country"],
        rankings: []
      };
      for (let j = 1; j < 21; j++) {
        // change back to 21
        let team = response[i][j];
        individualRanking.rankings.push(team);
      }

      rankings.push(individualRanking);
    }
    for (let i = 0; i < rankings.length; i++) {
      for (let j = 0; j < rankings[i].rankings.length; j++) {
        let team = rankings[i].rankings[j].toLowerCase().trim();
        let pointsToAdd = 20 - j;
        let index = allTeams.findIndex(obj => obj.name === team);
        if (index === -1) {
          allTeams.push({
            name: team,
            points: pointsToAdd,
            best: j + 1,
            worst: j + 1,
            appearances: 1
          });
        } else {
          allTeams[index].points += pointsToAdd;
          allTeams[index].appearances += 1;
          if (j < allTeams[index].best) {
            allTeams[index].best = j + 1;
          } else if (j > allTeams[index].worst) {
            allTeams[index].worst = j + 1;
          }
        }
      }
    }
    allTeams = allTeams.sort((a, b) => (a.points < b.points ? 1 : -1));
    this.setState({
      rankedTeams: allTeams
    });
    console.log(this.state.rankedTeams);
    return allTeams;
  }
  toggleAdmin() {
    this.state.isAdmin
      ? this.setState({ isAdmin: false })
      : this.setState({ isAdmin: true });
  }
  switchTab() {
    this.state.isHome
      ? this.setState({ isHome: false })
      : this.setState({ isHome: true });
  }
  render() {
    if (this.state.isHome) {
      // showRankingsPage
      return (
        <div>
          <Header isHome={this.state.isHome} switch={this.switchTab} />
          <Table
            className="rankingsTable"
            rankedTeams={this.state.rankedTeams}
            rankersCount={this.state.numOfRankers}
          />
        </div>
      );
    } else {
      // setRankingsPage
      return (
        <div>
          <Header isHome={this.state.isHome} switch={this.switchTab} />
          <Form />
        </div>
      );
    }
  }
}

export default App;
