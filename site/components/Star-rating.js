import React, { Component } from "react";
import { withRouter } from "next/router";
import StarRatingComponent from "react-star-rating-component";
export default withRouter(
  class StarRatingImg extends Component {
    constructor() {
      super();

      this.state = {
        rating: 3
      };
    }

    state = {};
    componentDidMount = () => {};
    onStarClick(nextValue) {
      this.setState({ rating: nextValue });
    }
    render() {
      const { rating } = this.state;
      return (
        <div className="is-inline-block align-middle">
          <div  style={{ fontSize: 18 }}>
            <StarRatingComponent
              name="app1"
              starCount={5}
              value={rating}
              onStarClick={this.onStarClick.bind(this)}
            />
          </div>
        </div>
      );
    }
  }
);
