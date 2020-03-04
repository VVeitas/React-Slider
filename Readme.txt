

## React-Slider Component
Custom React-Slider component. Created using only core react dependencies and webpack/babel environment. Slider is compatible with both mobiles and desktop devices. As this app setup instructions will focus on React functional part so I will not describe CSS code. It can be found at _src/style.css_.

## Slider Properties
- Layout preparation
- Left and Right buttons
- Navigation buttons (go to slide X)
- Infinite slider
- Mobile responsive and supports swipes

## App Setup
At this point I assume, that you have your react, webpack and babel environment made up. If not, see this [React Webpack and Babel setup](https://www.valentinog.com/blog/babel/) 

Lets first create __style.css__ file inside _/src_ folder.
Till now our __App.js__ and __Index.js__ files should look like this:

_src/App.js_
```ruby
import React, { Component } from "react";
import './style.css';
import img1 from './image1.jpg';
import img2 from './image2.jpg';
import img3 from './image3.jpg';
import img4 from './image4.jpg';
import img5 from './image5.jpg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      
    };}
  render() {
    return (
    )}}
    
export default App;
```
_src/Index.js_
```ruby
import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";

ReactDOM.render(
  <App />, document.getElementById('container')
);
```

Lets create several div elements where slider and images will be placed.
```ruby
render() {
    return (
      <div className="app">
        <div className="slider">
        </div>
      </div>
    )
  }
```



Now in a components state we will create objects array that will be used as a seperate slides in a slider container.
(At the same moment adding more state properties that will be used further in process.

```ruby
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
```

Mapping arrays objects in __slider__ div element
```ruby
  render() {
    return (
      <div className="app">
        <div className="slider">
        {this.state.images.map((img, index) => {
        	return <img
        	key={index}
        	src={img.image}
        	/> })}
        </div>
      </div>
    )}
```
	

## Left and Right Buttons

Right after the end of __constructor(props)__ object insert arrow functions that will be used by both left and right buttons and mobile swipes event handlers

```ruby
left = () => {
      this.setState({
        x : this.state.x + 100,
      })}
    

  right = () => {
      this.setState({
        x : this.state.x - 100,
      })}
```

Create left and right buttons div elements inside __slider__ div element with _onClick_ event handlers

```ruby
<div className="slider"
      <button className="left button" onClick={this.left}>
      </button>
      <button className="right button" onClick={this.right}>
      </button>
...
```

Now, to make the function actually working we need to make __img__ elements use the state.x value for styling, in order to move left and right with the help of TranslateX.

```ruby
{this.state.images.map((img, index) => {
    return <img
    className="img"
    key={index}
    src={img.image}
    style={this.state.x}
    /> })}
```
