import React, { Component } from "react";
import { withRouter } from "next/router";
import Slider from 'react-rangeslider';
export default withRouter(
  class RangeSlider extends Component {
    constructor (props, context) {
      super(props, context)
      this.state = {
        value: 10
      }
    }
  
    handleChangeStart = () => {
      console.log('Change event started')
    };
  
    handleChange = value => {
      this.setState({
        value: value
      })
    };
  
    handleChangeComplete = () => {
      console.log('Change event completed')
    };
    state = {};
    componentDidMount = () => {};
    
    render() {
      const horizontalLabels = {
        0: '0',
        // 62500: '62500',
        // 125000: '125000',
        // 187000: '187000',
        250000: '250000'
      }
      const { value } = this.state;
      const formatkg = value => 'EUR '+value 
      return (
        <div>
          <div className='slider1'>
        <Slider
        
          hideMinMax={false}
          grid={true}
          grid_num={4}
          grid_snap={false}
          min={0}
          max={250000}
          step={1}
          keyboard={true}
          labels={horizontalLabels}
          value={value}
          format={formatkg}
          onChangeStart={this.handleChangeStart}
          onChange={this.handleChange}
          onChangeComplete={this.handleChangeComplete}
        />
        
      </div>
        </div>
      );
    }
  }
);
