import React, { Component } from "react";
import './style.css';
import img1 from './image1.jpg';
import img2 from './image2.jpg';
import img3 from './image3.jpg';
import img4 from './image4.jpg';
import img5 from './image5.jpg';


class App extends React.Component {
  firsttouch = 0;
  movementtouch= 0;
  lasttouch= 0;
  constructor(props) {
    super(props);
    this.state = {
      images: [
        {image: img1, id: 1},
        {image: img2, id: 2},
        {image: img3, id: 3},
        {image: img4, id: 4},
        {image: img5, id: 5},
      ],
      x: 0,
    }
  }


  left = () => {
    this.setState({
      x : this.state.x + 100
    });
    const x = this.state.x +100;
    if (x > 0) {
      this.setState({
        x : (this.state.images.length-1) *-100
      })
    }
  }

  right = () => {
    this.setState({
      x : this.state.x - 100
    });
    const x = this.state.x / -100;
    const listlength = this.state.images.length -2;
    if (x > listlength) {
      this.setState({
        x : 0
      })
    }
  }

  touchstart = e => {
    this.firsttouch = e.nativeEvent.touches[0].clientX;
  }

  touchmove = e => {
    const delta =  e.nativeEvent.touches[0].clientX;
    this.movementtouch = delta - this.firsttouch;
  }

  touchend = () => {
    const mov = this.movementtouch;
    if (mov < 0) {
      this.right();
    }
    else {
      this.left();
    }
  }

  render(){
    const {x} = this.state;
    const {images} = this.state;
    const left = this.left;
    const right = this.right;

    return(
      <div className="App">
      <div className="slider"
      onTouchStart={this.touchstart}
      onTouchMove={this.touchmove}
      onTouchEnd={this.touchend}
      >
      <button onClick={left} > left </button>
      <button className="right" onClick={right} > right </button>
      {images.map(img => {
        return <img key={img.id} src={img.image} style={{transform:`translateX(${x}%)`}} />
      })}

      </div>
      </div>
    );
  }
}

export default App
