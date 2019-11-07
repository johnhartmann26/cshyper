import React from "react";
import Header from "./components/Header";
import AdminButtons from "./components/AdminButtons";
import Table from "./components/Table";
import Form from "./components/Form";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHome: true,
      numOfRankers: 0,
      isAdmin: false,
      rankedTeams: [
        {
          name: "astralis",
          points: 177,
          best: 1,
          worst: 4,
          appearances: 9
        },
        {
          name: "evil geniuses",
          points: 166,
          best: 2,
          worst: 3,
          appearances: 9
        }
      ]
    };
    this.setRankings = this.setRankings.bind(this);
    this.toggleAdmin = this.toggleAdmin.bind(this);
    this.switchTab = this.switchTab.bind(this);
  }
  setRankings() {
    // https://sheetsu.com/apis/v1.0bu/b38ae2ae1f75
    let response = [{"Ranker":"HTLV","Country":"Denmark","1":"EG","2":"Astralis","3":"Fnatic","4":"Liquid","5":"Vitality","6":"Avangar","7":"NIP","8":"100T","9":"Faze","10":"Furia","11":"mousesports","12":"navi","13":"g2","14":"ence","15":"mibr","16":"forze","17":"heroic","18":"CR4ZY","19":"Grayhound","20":"tricked"},{"Ranker":"Duckwalk","Country":"USA","1":"EG","2":"Astralis","3":"100T","4":"Fnatic","5":"Liquid","6":"Vitality","7":"G2","8":"Faze","9":"nip","10":"Furia","11":"Navi","12":"Mousesports","13":"Heroic","14":"Ence","15":"Avangar","16":"MIBR","17":"CR4ZY","18":"North","19":"Grayhound","20":"forZe"},{"Ranker":"kayzeno","Country":"USA","1":"EG","2":"Astralis","3":"Fnatic","4":"Liquid","5":"G2","6":"100T","7":"Vitality","8":"NIP","9":"Faze","10":"Furia","11":"Mousesports","12":"Navi","13":"MIBR","14":"Heroic","15":"Ence","16":"Cr4zy","17":"North","18":"Avangar","19":"BIG","20":"Grayhound"},{"Ranker":"mayhem","Country":"UK","1":"EG","2":"Astralis","3":"100T","4":"Liquid","5":"Fnatic","6":"Vitality","7":"G2","8":"NIP","9":"Navi","10":"Faze","11":"Mousesports","12":"heroic","13":"MIBR","14":"Grayhound","15":"North","16":"Furia","17":"CR4ZY","18":"Ence","19":"Avangar","20":"BIG"},{"Ranker":"riqatc","Country":"USA","1":"EG","2":"Fnatic","3":"Astralis","4":"Liquid","5":"Vitality","6":"Furia","7":"100T","8":"G2","9":"NIP","10":"Faze","11":"Mousesports","12":"Heroic","13":"MIBR","14":"Avangar","15":"Navi","16":"Cr4zy","17":"Forze","18":"Ence","19":"Grayhound","20":"Tricked"},{"Ranker":"UHO","Country":"Russia","1":"EG","2":"Astralis","3":"Vitality ","4":"fnatic","5":"Liquid","6":"G2","7":"Avangar","8":"NiP","9":"navi","10":"Furia","11":"100T","12":"FaZe","13":"mousesports","14":"ENCE","15":"Mibr","16":"heroic","17":"North","18":"CR4ZY","19":"ForZe","20":"Grayhound"},{"Ranker":"H00V3R ","Country":"UK","1":"EG","2":"Astralis ","3":"Fnatic","4":"100T","5":"Liquid","6":"Vitality","7":"Mousesports","8":"Furia","9":"G2","10":"FaZe","11":"Nip","12":"Navi","13":"CR4ZY","14":"Grayhound","15":"mibr","16":"Heroic","17":"Ence","18":"Avangar","19":"BIG","20":"North"}]
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
          <AdminButtons sheetsuCall={this.setRankings} />
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
