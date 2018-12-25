import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      controlShapes: [
        //[{x: 5,y: 5},{x: 350,y: 695},{x: 695,y: 5}],
      ],
      currentPoint: {x:200, y:150},
      prevPoints: [],
      activeShape: 0
    };
    this.canvas = React.createRef();
  }

  componentDidMount () {
    const c = this.canvas.current;
    const ctx = c.getContext("2d");
    const { controlShapes, currentPoint } = this.state;

    controlShapes.forEach(cs => {
      ctx.moveTo(cs[0].x, cs[0].y);
      cs.forEach(p => {
        ctx.lineTo(p.x, p.y);
        ctx.moveTo(p.x, p.y);
      });
      ctx.lineTo(cs[0].x, cs[0].y);
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, 1, 0, 2 * Math.PI);
    ctx.stroke();
  }

  componentDidUpdate () {
    const c = this.canvas.current;
    const ctx = c.getContext("2d");
    const { controlShapes, currentPoint, prevPoints } = this.state;

    ctx.beginPath();
    ctx.rect(0, 0, 700, 700);
    ctx.fillStyle = "white";
    ctx.fill();

    controlShapes.filter(cs => cs.length > 0).forEach(cs => {
      ctx.moveTo(cs[0].x, cs[0].y);
      cs.forEach(p => {
        ctx.lineTo(p.x, p.y);
        ctx.moveTo(p.x, p.y);
      });
      ctx.lineTo(cs[0].x, cs[0].y);
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(currentPoint.x, currentPoint.y, 1, 0, 2 * Math.PI);
    ctx.stroke();

    prevPoints.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1, 0, 2 * Math.PI);
      ctx.stroke();
    });
  }

  tick = () => {
    const { controlShapes, currentPoint, prevPoints } = this.state;
    const i = Math.floor(Math.random() * controlShapes.length);
    const j = Math.floor(Math.random() * controlShapes[i].length);
    const x = (controlShapes[i][j].x + currentPoint.x) / 2;
    const y = (controlShapes[i][j].y + currentPoint.y) / 2;
    this.setState({prevPoints: [...prevPoints, currentPoint], currentPoint:{x, y}});
  }

  handleRunClick = () => {
    this.timer = setInterval(this.tick, 1);
  }

  handleStopClick = () => {
    clearInterval(this.timer);
  }

  handleNewShape = () => {
    this.setState({controlShapes: [...this.state.controlShapes, []]});
  }

  handleSelectChange = (e) => {
    this.setState({activeShape: parseInt(e.target.value)});
  }

  handleCanvasClick = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    const { controlShapes, activeShape } = this.state;
    const newShape = [...controlShapes[activeShape], {x, y}];
    this.setState({
      controlShapes: controlShapes.map((cs, i) => i === activeShape ? newShape : cs)
    });
  }

  render() {
    return (
      <div className="app">
        <div className='controlsWrap'>
          <select onChange={this.handleSelectChange}>
            {this.state.controlShapes.map(
              (cs, i) => <option key={i} value={i}>{i}</option>
            )}
          </select>
          <button onClick={this.tick}>step</button>
          <button onClick={this.handleRunClick}>run</button>
          <button onClick={this.handleStopClick}>stop</button>
          <button onClick={this.handleNewShape}>stop</button>
        </div>
        <canvas
          ref={this.canvas}
          style={{border: '1px solid red'}}
          width={700}
          height={700}
          onClick={this.handleCanvasClick}
        ></canvas>
      </div>
    );
  }
}

export default App;
