import React from 'react';

import Layout from '../components/layout';
import Canvas from '../components/Canvas';
import GoldenRatioControls from '../components/GoldenRatioControls';
import {fill} from '../flower';

class IndexPage extends React.Component {
  constructor(props) {
    super(props);
    this.check = React.createRef();
    this.denom = React.createRef();
    this.state = {
      seeds: [],
      width: 800,
      height: 600,
      size: 4,
      denom: 0,
      n: 350
    };
  }

  fill = (denom = this.state.denom, n = this.state.n) => {
    this.setState({seeds: fill(denom, n), denom: denom, n: n});
  };

  handleFillClick = () => {
    this.fill();
  };

  handleDenomChange = value => {
    this.fill(value);
  };

  handleSizeChange = value => {
    this.setState({size: value});
  };

  handleNChange = value => {
    this.fill(this.state.denom, value);
  };

  handleRunClick = () => {
    let denom = 0;
    this.interval = setInterval(() => {
      this.fill(denom);
      denom += 0.0001;
      if (denom >= 1) {
        this.handleStopClick();
      }
    }, 10);
  };

  handleStopClick = () => {
    clearInterval(this.interval);
  };

  handleClearClick = () => {
    this.setState({seeds: [], denom: 0});
  };

  render() {
    return (
      <Layout>
        <div style={{display: 'flex'}}>
          <GoldenRatioControls
            width={this.state.width}
            height={this.state.height}
            size={this.state.size}
            denom={this.state.denom}
            n={this.state.n}
            onSizeChange={this.handleSizeChange}
            onDenomChange={this.handleDenomChange}
            onNChange={this.handleNChange}
            onFillClick={this.handleFillClick}
            onClearClick={this.handleClearClick}
            onRunClick={this.handleRunClick}
            onStopClick={this.handleStopClick}
          />
          <Canvas
            width={this.state.width}
            height={this.state.height}
            cellSize={this.state.size}
            shapes={{points: this.state.seeds}}
          />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
