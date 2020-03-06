

# React-Slider custom component
 Created using only core react dependencies and webpack/babel environment. Slider is compatible with both mobiles and desktop devices. As this app setup instructions will focus only on React part, CSS styling will be skipped. This projects CSS code and images can be found at _/src_ folder.

## Slider Properties
- [Layout preparation](https://github.com/VVeitas/React-Slider#layout-preparation)
- [Left and Right functions](https://github.com/VVeitas/React-Slider#left-and-right-buttons)
- [Infinite slider](https://github.com/VVeitas/React-Slider#infinite-loop)
- [Indicator buttons (go to slide X)](https://github.com/VVeitas/React-Slider#indicator-buttons)
- [Swipe support for mobile phones](https://github.com/VVeitas/React-Slider#swipe-function)

## Layout Preparation
At this point you should have your react, webpack and babel environment prepared. If not, see this [React Webpack and Babel setup](https://github.com/VVeitas/React-Slider#swipe-function).

Till now our files should look like this:

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

    }}
    render() {
      return (
      )}}

export default App
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
    )}}
```



Now, in a components state we will create objects array that will be used as a seperate slides in a slider container (At the same time adding more state properties that will be used in the future).
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
          transitionEnd: 1,
    }}
```

Mapping arrays objects in div __slider__ element.
```ruby
render() {
  return (
    <div className="app">
      <div className="slider">
      {this.state.images.map((img, index) => {
        return
        <img
          key={index}
          src={img.image}
        	/> })}
      </div>
    </div>
    )}}
```

For images layout in div __slider__ element we will be using CSS flexbox.
```
display: flex;
overflow: hidden;
```
Check CSS file in _/src_ folder for more information about elements styling.

## Left and Right Buttons
Right after the end of __constructor(props)__ object, insert arrow functions that will be used by both left and right buttons and mobile swipes event handlers.
```ruby
left = () => {
      this.setState({
        x : this.state.x + 100,
      })};
right = () => {
      this.setState({
        x : this.state.x - 100,
      })};
```

Create left and right buttons div elements inside div __slider__ element with _onClick_ event handlers.
```ruby
<div className="slider"
      <button className="left button" onClick={this.left}>
      </button>
      <button className="right button" onClick={this.right}>
      </button>
```

Now, to make the function actually working we need to make __img__ elements use __this.state.x__ value for styling.
```ruby
{this.state.images.map((img, index) => {
    return <img
    className="img"
    key={index}
    src={img.image}
    style={{transform : `translateX(${this.state.x}%)`}}
    /> })}
```

Now, our slider can swipe left and right. Lets add transitions to slider movement.
```ruby
sliderStyle = () => {
      return {
        transform : `translateX(${this.state.x}%)`,
        WebkitTransform : `translateX(${this.state.x}%)`,
        MozTransform : `translateX(${this.state.x}%)`,
        WebkitTransition : "0.4s ease-in-out",
        MozTransition : "0.4s ease-in-out",
        }};
```
We will be using transition values returned from an arrow function, because, later on we will be adding infinite loop function for slider, so we will need to turn off the transition occasionally.

Change __img__ elments style to return value from a function.
```ruby
{this.state.images.map((img, index) => {
      return <img
        key={index}
        src={img.image}
        style={this.sliderStyle()}
        /> })}
```

We dont want our slides to hop when clicking right or left buttons quickly several times. So we will add additional event handler which will be _onTransitionEnd_. It will change the state, so that we will be able to use __left__ or __right__ functions again only when images transition will be finished.
```ruby
{this.state.images.map((img, index) => {
  return <img
    key={index}
    src={img.image}
    style={this.sliderStyle()}
    onTransitionEnd={this.handleSliderTranslateEnd}
    /> })}
```
Add another arrow function for _onTransitionEnd_ event handler.
```ruby
handleSliderTranslateEnd = () => {
  this.setState({
    transitionEnd:1
  })};
```
Now lets add additional code to left and right arrow functions. When clicked, these functions will set states __transitionEnd__ to 0. So these functions will not be able to used again, unless the transition have finished and states __transitionEnd__ value is again set to 1.
```ruby
left = () => {
  if(this.state.transitionEnd == 1){
    this.setState({
      x : this.state.x + 100,
      transitionEnd: 0,
    })}};

right = () => {
  if(this.state.transitionEnd == 1){
    this.setState({
      x : this.state.x - 100,
      transitionEnd: 0,
    })}};
```

## Infinite Loop
To implement infinite option, we will slice the last two array objects and put it in the front of the array, and then we will slice first two array objects and put it in end of the array. So now our array will contain 9 objects.

Lets add Reacts lifecycle function __componentDidMount__ next to other functions, that will slice our array on the launch of the component.
```ruby
componentDidMount = () => {
  const images1 = [
    ...this.state.images.slice(3,5),
    ...this.state.images,
    ...this.state.images.slice(0,2)];
    this.setState({
      images : images1
    })};
```

While we will be sliding left and reach the arrays first objects position (__this.state.x : 0__), we will initially function it to set "__this.state.x: -500__". This way we will be able to slide left infinite times. We will do the same for sliding right, just with other values. (Also note that, when changing the value of __this.state.x__ we will get unwanted transition. For that occasions, we will have to turn off transition by setting its value in the state to 0).
```ruby
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
    })}};
```
Lets add _if_ statement for transition to __sliderStyle__ arrow function.
```ruby
sliderStyle = () => {
  if (this.state.needTransition === 1 ) {
    return {
      transform : `translateX(${this.state.x}%)`,
      WebkitTransform : `translateX(${this.state.x}%)`,
      MozTransform : `translateX(${this.state.x}%)`,
      WebkitTransition : "0.4s ease-in-out",
      MozTransition : "0.4s ease-in-out",
      }}
    return {
      transform : `translateX(${this.state.x}%)`,
      WebkitTransform : `translateX(${this.state.x}%)`,
      MozTransform : `translateX(${this.state.x}%)`,
    }};
```
Lets set _this.state_ __needTransition__ value to 1 when clicking left and right buttons. It will let __left__ and __right__ functions to use transition. (Transitions will be disabled on __transitionEnd__ function, when it will be right position to jump from one slide to another without visible effect).
```ruby
left = () => {
    if(this.state.transitionEnd == 1){
      this.setState({
        x : this.state.x + 100,
        transitionEnd: 0,
        needTransition: 1
      })}};

  right = () => {
    if(this.state.transitionEnd == 1){
      this.setState({
        x : this.state.x - 100,
        transitionEnd: 0,
        needTransition: 1
      })}
    };
```

## Indicator Buttons

For indicator buttons we will be using array mapping like we did with the images but we will add _if_ statement. This way we will exclude our arrays sliced objects which are not needed for indicators. Also add _onClick_ event handler same as below:

```ruby
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
```

Make an arrow function for this event handler.

```ruby
indicatorsHandler = (item) =>{
    const item1 = item.id
    this.setState({
      x : (item1 + 1) * -100,
      needTransition: 1,
    })};
```

## Swipe Function
For swipes, lets set __slider__ div elements event handlers like this:

```ruby
<div className="slider"
  onTouchStart={this.touchStart}
  onTouchMove={this.touchMove}
  onTouchEnd={this.touchEnd}>
```

Set these __ftouch__ and __mtouch__ values right above the __constructor(props)__.
```ruby
class App extends React.Component {
  ftouch = 0;
  mtouch= 0;
  constructor(props) {
    super(props);
```

 __touchStart__ will take the value of the first screen touch. __touchMove__ will estimate the distance between the first touch and where our finger have moved. And lastly, __touchEnd__ function, with the _if_ statement, will decide whether to initiate __left__ or __right__ functions. (Note that we also set the _mov_ tolerance to 10%, that means the swipe will not be initiated unless we will swipe 10% X axis of our screen). (Setup of state __this.state.width__ will be described in the next step).

```ruby
touchStart = e => {
  this.ftouch = e.nativeEvent.touches[0].clientX;
}
touchMove = e => {
  const mov =  e.nativeEvent.touches[0].clientX;
  this.mtouch = mov - this.ftouch;
}
touchEnd = () => {
  const mov = this.mtouch / this.state.width;
  if (mov <= -0.1) {
    this.right();
  }
  if (mov >= 0.1){
    this.left();
  }
  this.mtouch = 0;
  };
```

Finally, we need to set width value in state. By adding some code to React lifecycle functions, we will get value of our window inner width on components mount with the help of __componentDidMount__ function and will update that in the state.

```ruby
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
  };
componentWillUnmount = () => {
  window.removeEventListener('resize', this.updateWindowDimensions);
  };
updateWindowDimensions = () => {
  this.setState({ width: window.innerWidth });
  };
```
