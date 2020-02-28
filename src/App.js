import React, { Component } from "react";
import './style.css';
import img1 from './image1.jpg';
import img2 from './image2.jpg';
import img3 from './image3.jpg';
import img4 from './image4.jpg';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       images: [
         {image: img1, id: 1},
         {image: img2, id: 2},
         {image: img3, id: 3},
         {image: img4, id: 4},
       ],
       x: 0,
     }
  }

  right = () => {
    this.setState({
      x : this.state.x - 100
    });
  }

  left = () => {
    console.log(this.state.x);
  }

  reverse = () => {
    console.log(this.state.images)
  }

  render(){
    const x = this.state.x;
    const {images} = this.state;
    const left = this.reverse;
    const right = this.right;

    return(
      <div className="App">
      <div className="slider">
      <button onClick={left} style={{"height" : "60px" , "width" : "30px"}}> left </button>
      <button className="right" onClick={right} style={{"height" : "60px" , "width" : "30px"}}> right </button>
      {images.map(img => {
        return <img key={img.id} src={img.image} style={{transform:`translateX(${x}%)`}} />
      })}

      </div>
      </div>
    );
  }
}

export default App
