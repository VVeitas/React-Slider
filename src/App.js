import React, { Component } from "react";
import './style.css';
import img1 from './image1.jpg';
import img2 from './image2.jpg';
import img3 from './image3.jpg';
import img4 from './image4.jpg';
import img5 from './image5.jpg';


class App extends React.Component {
  ftouch = 0;
  mtouch= 0;
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
      transitionEnd: 0,
    }
  }

  //  Left and right functions for both swipes and onclick event handlers
  left = () => {
    if(this.state.transitionEnd == 1){
      this.setState({
        x : this.state.x + 100,
        needTransition: 1,
        transitionEnd: 0
      })}
    };

  right = () => {
    if(this.state.transitionEnd == 1){
      this.setState({
        x : this.state.x - 100,
        needTransition: 1,
        transitionEnd: 0
      })}
    };


  componentDidMount = () => {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
    const images1 = [
      ...this.state.images.slice(3,5),
      ...this.state.images,
      ...this.state.images.slice(0,2)];
      this.setState({
        images : images1
      });
      this.setState({
        transitionEnd:1,
      })
    };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.updateWindowDimensions);
    };

  updateWindowDimensions = () => {
    this.setState({ width: window.innerWidth });
    };


  //   TranslateX and transition styling function switch
  sliderStyle = () => {
    if (this.state.needTransition === 1 ) {
      return {
        transform : `translateX(${this.state.x}%)`,
        WebkitTransform : `translateX(${this.state.x}%)`,
        MozTransform : `translateX(${this.state.x}%)`,
        WebkitTransition : "0.4s ease-in-out",
        MozTransition : "0.4s ease-in-out",
        };
      }
      return {
        transform : `translateX(${this.state.x}%)`,
        WebkitTransform : `translateX(${this.state.x}%)`,
        MozTransform : `translateX(${this.state.x}%)`,
      };
    };


  //  Infinite loop functioning using transitionEnd event handler at slider div
  handleSliderTranslateEnd = () => {
    this.setState({
      transitionEnd:1,
    })
    if (this.state.x == -700) {
      this.setState ({
        needTransition: 0,
        x : -200,
      })
    };
    if (this.state.x == 0) {
      this.setState ({
        needTransition: 0,
        x : -500,
      })}
    };

    //  Indicator buttons function: go to slide X
  indicatorsHandler = (item) =>{
      const item1 = item.id
      this.setState({
        x : (item1 + 1) * -100,
        needTransition: 1,
      })
    }


  //  Swipe function for mobile phones. Tolerance set to 10%.
  touchstart = e => {
    this.ftouch = e.nativeEvent.touches[0].clientX;
  }

  touchmove = e => {
    const delta =  e.nativeEvent.touches[0].clientX;
    this.mtouch = delta - this.ftouch;
  }

  touchend = () => {
    const mov = this.mtouch / this.state.width;
    if (mov <= -0.1) {
      this.right();
    }
    if (mov >= 0.1){
      this.left();
    }
    this.mtouch = 0;
    }

  render(){
    const style = this.sliderStyle
    return(
      <div className="app">

      <div className="slider"
      onTouchStart={this.touchstart}
      onTouchMove={this.touchmove}
      onTouchEnd={this.touchend}
      >
      <button className="left button" onClick={this.left}>
      </button>
      <button className="right button" onClick={this.right}>
      </button>
      <ul>
      {this.state.images.map((item,index) => {
        if (index > 1 &&  index < 7) {
          return <li
            className="indicators"
            key={index}
            onClick={() => this.indicatorsHandler(item)}
              > </li>}
            })}
      </ul>
        {this.state.images.map((img, index) => {
          return <img
          key={index}
          src={img.image}
          style={this.sliderStyle()}
          onTransitionEnd={this.handleSliderTranslateEnd}
          /> })}
          </div>
          </div>
            );
          }};

        export default App
