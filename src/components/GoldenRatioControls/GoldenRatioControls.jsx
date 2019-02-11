import './GoldenRatioControls.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  denom: PropTypes.number.isRequired,
  n: PropTypes.number.isRequired,

  onSizeChange: PropTypes.func.isRequired,
  onDenomChange: PropTypes.func.isRequired,
  onNChange: PropTypes.func.isRequired,
  onFillClick: PropTypes.func.isRequired,
  onClearClick: PropTypes.func.isRequired,
  onRunClick: PropTypes.func.isRequired,
  onStopClick: PropTypes.func.isRequired
};

class GoldenRatioControls extends Component {
  handleDenomChange = e => {
    this.props.onDenomChange(parseFloat(e.target.value));
  };

  handleSizeChange = e => {
    this.props.onSizeChange(e.target.value);
  };

  handleNChange = e => {
    this.props.onNChange(e.target.value);
  };

  render() {
    return (
      <div className="controlsWrapper">
        <label>
          Denom
          <input
            type="number"
            value={this.props.denom}
            onChange={this.handleDenomChange}
            step="0.0001"
            min={0}
            max={1}
          />
        </label>
        <label>
          Point size
          <input
            type="number"
            defaultValue={this.props.size}
            onChange={this.handleSizeChange}
            min={1}
            max={20}
          />
        </label>
        <label>
          N seeds:
          <input
            type="number"
            defaultValue={this.props.n}
            onChange={this.handleNChange}
            min={0}
            max={1000}
          />
        </label>
        <button onClick={this.props.onFillClick}>Fill</button>
        <button onClick={this.props.onClearClick}>Clear</button>
        <button onClick={this.props.onRunClick}>Run</button>
        <button onClick={this.props.onStopClick}>Stop</button>
      </div>
    );
  }
}

GoldenRatioControls.propTypes = propTypes;

export default GoldenRatioControls;
