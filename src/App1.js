

var first = this.state.images[0];
var second = this.state.images[1];
var insert = document.getElementById("bbc");
var aaa = document.createElement("joo");
insert.src = first;
insert.after(first);


button {
  position: absolute;
  top: 50%;
  z-index: 1;
  transform: translateY(-50%);
  height: 8%;
  width: 6%;
  cursor: pointer;
  border: none;
  margin: 0 15px;
  opacity: 0.6;
}
