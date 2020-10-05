import React, { Component } from 'react';
// import './styles.css';

/**
   * @class Leaderboard
   * @desc Compares the score property of each user object
   * @param {Prop} users-an array of objects with name and score properties
*/
class Leaderboard extends Component {
  constructor(props) {
    super(props);

    this.sortUsersByScore = this.sortUsersByScore.bind(this);
    this.sortUsersByName = this.sortUsersByName.bind(this);
    this.filterRank = this.filterRank.bind(this);

    this.state = {
      users: this.props.users,
      ranking: [],
      asc: false,
      alph: false,
    };
  }

  /**
     * @function componentDidMount
     * @desc Sorts users by score then adds a ranking key to each user object when the component loads. Then sets the ranking state
  */
  componentDidMount() {
    const ranking = this.state.users;
    ranking.sort(this.compareScore).reverse();
    ranking.map((user, index) => user.rank = index +1);
    this.setState({ ranking: ranking});
  }

  /**
     * @function compareScore
     * @desc Compares the score property of each user object
     * @param {Object, Object} user
  */
  compareScore(a,b) {
    if (a.score < b.score)
      return -1;
    if (a.score > b.score)
      return 1;
    return 0;
  }

  /**
     * @function compareName
     * @desc Compares the name property of each user object alphabetically
     * @param {Object, Object} user
  */
  compareName(a,b) {
    if (a.name < b.name)
      return -1;
    if (a.name > b.name)
      return 1;
    return 0;
  }

  /**
     * @function sortUsersByScore
     * @desc Sorts the ranking by score either ascending or descending
  */
  sortUsersByScore() {
    const ranking = this.state.ranking;
    if(this.state.asc === true) {
      ranking.sort(this.compareScore).reverse();
      this.setState({ ranking: ranking});
      this.setState({ asc: false});
      this.setState({ alph: false});
    } else {
      ranking.sort(this.compareScore);
      this.setState({ ranking: ranking});
      this.setState({ asc: true});
      this.setState({ alph: false});
    }
  }

  /**
     * @function sortUsersByName
     * @desc Sorts the ranking by name alphabetically either ascending or descending
  */
  sortUsersByName() {
    const ranking = this.state.ranking;
    if(this.state.alph === true) {
      ranking.sort(this.compareName).reverse();
      this.setState({ ranking: ranking});
      this.setState({ alph: false});
      this.setState({ asc: true});
    } else {
      ranking.sort(this.compareName);
      this.setState({ ranking: ranking});
      this.setState({ alph: true});
      this.setState({ asc: true});
    }
  }

  /**
     * @function filterRank
     * @desc Filters through the ranking to find matches and sorts all matches by score
     * @param {String} search input
  */
  filterRank(e) {
    const ranking = this.state.users;
    const newRanking = [];
    const inputLength = e.target.value.length
    for(var i = 0; i < ranking.length; i++) {
      const str = ranking[i].name.slice(0, inputLength).toLowerCase();
      if(str === e.target.value.toLowerCase()) {
        newRanking.push(ranking[i]);
      }
    }
    newRanking.sort(this.compareScore).reverse();
    this.setState({ ranking: newRanking});
  }

  
  render() {
    return (
      <div>
        <table id="lBoard">
          <tbody className='ranking'>
            <tr>
              <td colspan="10000"><h1>Leaderboard</h1></td>
            </tr>
            <tr>
              <td className='rank-header sortScore' onClick={ this.sortUsersByScore }> Rank </td>
              <td className='rank-header sortAlpha' onClick={ this.sortUsersByName }> Name </td>
              <td className='rank-header' onClick={ this.sortUsersByScore }> Score </td>
            </tr>
            {
            this.state.ranking.map((user, index) =>
               <tr className='ranking' key={index}>
                { user.page == this.state.page ? <td className='data'>{ user.rank }</td> : null }
                { user.page == this.state.page ? <td className='data'>{ user.name }</td> : null }
                { user.page == this.state.page ? <td className='data'>{ user.score }</td> : null }
               </tr>
             )
           }
          </tbody>
        </table>
      </div>
    );
  }
}
export default Leaderboard;
