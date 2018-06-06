import React, {Component, Fragment} from ('react');
import Happiness from './happiness_ratings_2017';

export default class HomePage extends Component {
  render() {
    return <Fragment>
      <h1>Happiness Ratings</h1>
      <p>{HAPPINESS.length} happiness.</p>
      {HAPPINESS.map(happiness => {
        return <div>
          ({happiness.score}) {happiness.rank}
          </div>
      })}
      </Fragment>
  }
}