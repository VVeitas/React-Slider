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
