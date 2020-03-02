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
      x: -200,
      width: 0,
      needTransition: 1,
    }
  }

  handleSliderTranslateEnd = () =>{
    if (this.state.x == 0){
      this.setState({
        x: -500,
        needTransition: 0,
      })
    }

    if (this.state.x == -700){
      this.setState({
        x: -200,
        needTransition: 0,
      })
    }

  }

  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const _images = [
      ...this.state.images.slice(3,5),
      ...this.state.images,
      ...this.state.images.slice(0,2)];
    this.setState({
      images : _images
    });


  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
  }


  //   TranslateX and transition function
  sliderStyle = () => {
    if (this.state.needTransition === 1 ) {
      return {
        transform:`translateX(${this.state.x}%)`,
        transition: "0.4s ease-in-out"
      };
    }
      return {
        transform:`translateX(${this.state.x}%)`
      };
  }


  left = () => {
    this.setState({
      x : this.state.x + 100,
      needTransition: 1,
    });

  }

  right = () => {
    console.log(this.state.x)
    this.setState({
      x : this.state.x - 100,
      needTransition: 1,
    });

    if (this.state.x === -700){
      this.setState({
        x: 0
      })
    }
  }


  //  Swipes for mobile phones
  touchstart = e => {
    this.firsttouch = e.nativeEvent.touches[0].clientX;
  }

  touchmove = e => {
    const delta =  e.nativeEvent.touches[0].clientX;
    this.movementtouch = delta - this.firsttouch;
  }

  touchend = () => {
    const mov = this.movementtouch / this.state.width;
    if (mov <= -0.1) {
      this.right();
    }
    if (mov >= 0.1){
      this.left();
    }
    this.movementtouch = 0;
  }

  render(){
    const style = this.sliderStyle
    return(
      <div className="App">

      <div className="slider"
      onTouchStart={this.touchstart}
      onTouchMove={this.touchmove}
      onTouchEnd={this.touchend}
      >
      <button className="left button lft" onClick={this.left}>
      </button>
      <button className="right button rht" onClick={this.right}>
      </button>
      {this.state.images.map((img, index) => {
        return <img
        className="img"
        key={index}
        src={img.image}
        style={this.sliderStyle()}
        onTransitionEnd={this.handleSliderTranslateEnd}
         />
      })}

      </div>
      </div>
    );
  }
}

export default App
