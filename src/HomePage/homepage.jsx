import React, { Component } from 'react';
import "./homepage.css";
import { getMergeSortAnimation } from '../SortingAlgorithms/mergeSort';
import {PrettoSlider} from "../CustomSlider/custom-slider";
import Typography from "@material-ui/core/Typography";

class HomePage extends Component {
  constructor() {
    super();
    this.state={
      arr:[],
      speed:3,
      items:50,
      live:false,
    }
  }
  updateSpeed(event,val) {
  this.setState((prev)=>({...prev,speed:val}));
  }
  updateItems(event,val) {
    this.setState((prev)=>({...prev,items:val}),()=>this.generateArray());

    }
  componentDidMount() {
    this.generateArray();
  }
  generateArray() {
    const arr=[];
    for(let i=0;i<this.state.items;i++)
      arr.push(randomNumber(4,98));
    this.setState((prev)=>({...prev,arr}));
  }
  mergeSort() {
    const res = getMergeSortAnimation(this.state.arr)
    this.setState((prev)=>({...prev,live:true}));
    for(let i=0;i<res.length;i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      if((i%3)!==2) {
        const [bar1,bar2] = res[i];
        const bar1Style = arrayBars[bar1].style;
        const bar2Style = arrayBars[bar2].style;
        const color = (i%3)===0?"#fe346e":"#1eb2a6"
        setTimeout(()=>{
          bar1Style.backgroundColor=color;
          bar2Style.backgroundColor=color;
        },i*this.state.speed)
      } else {
        const [bar,height] = res[i];
        const barStyle = arrayBars[bar].style;
        setTimeout(()=>{
          barStyle.height=`${height}%`;
          const newArr = this.state.arr;
          newArr[bar]=height;
        },i*this.state.speed);
      }
    }
    this.setState((prev)=>({...prev,live:false}));
  }
  render()
  {
    return (
      <div className="homepage">
        <div className="header">
          <div className="menuBar1">
            <button className="styledButton" onClick={()=>this.generateArray()}>Reset</button>
            <button className="styledButton" onClick={()=>this.mergeSort()}>Merge Sort</button>
            <button className="styledButton" >Quick Sort</button>
          </div>
          <div className="menuBar2">
            <div className="sliderTab">
              <Typography gutterBottom>Speed</Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={3} min={1} max={100} onChange={(e,v)=>this.updateSpeed(e,v)}/>
            </div>
            <div className="sliderTab">
              <Typography gutterBottom>Items</Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50} min={5} max={300} onChange={(e,v)=>this.updateItems(e,v)}/>
            </div>
          </div>
        </div>
        <div className="visualizer-outer">
          <div className="visualizer">
            {this.state.arr.map((item,idx)=><div style={{height:`${item}%`}} className="arrayBar" key={idx}/>)}
          </div>
        </div>
      </div>
    );
  }
}

function randomNumber(min, max) {
  return Math.floor(min + Math.random()*(max + 1 - min))
}

export default HomePage;
