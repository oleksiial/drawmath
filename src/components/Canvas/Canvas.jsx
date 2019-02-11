import './Canvas.css';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  shapes: PropTypes.shape({
    points: PropTypes.arrayOf(
      PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        size: PropTypes.number
      })
    )
  }).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired
};

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  updateCanvas = () => {
    const ctx = this.canvas.current.getContext('2d', {alpha: false});
    ctx.fillStyle = '#eea';
    ctx.fillRect(0, 0, this.props.width, this.props.height);
    ctx.fillStyle = '#333';

    this.props.shapes.points.forEach(p => {
      ctx.beginPath();
      ctx.arc(
        p.x + this.props.width / 2,
        p.y + this.props.height / 2,
        this.props.cellSize,
        0,
        2 * Math.PI
      );
      ctx.fill();
    });
  };

  componentDidMount() {
    this.updateCanvas();
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  render() {
    return (
      <div>
        <canvas
          width={this.props.width}
          height={this.props.height}
          ref={this.canvas}
        />
      </div>
    );
  }
}

Canvas.propTypes = propTypes;

export default Canvas;
