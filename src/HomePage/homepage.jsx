import React, { Component } from 'react';
import "./homepage.css";
import { getMergeSortAnimation } from '../SortingAlgorithms/mergeSort';
import { getBubbleSortAnimation } from '../SortingAlgorithms/bubbleSort';
import { getSelectionSortAnimation } from '../SortingAlgorithms/selectionSort';
import { getQuickSortAnimation } from "../SortingAlgorithms/quickSort";
import {PrettoSlider} from "../CustomSlider/custom-slider";
import Typography from "@material-ui/core/Typography";
const INITIAL_COLOR = "#ff847c";
const FINAL_COLOR ="#05dfd7";
const COMP_COLOR ="#fe346e";

let timer1=null;
let timer2=null;

class HomePage extends Component {
  constructor() {
    super();
    this.state={
      arr:[],
      speed:50,
      items:50,
      live:false,
    }
  }

  updateSpeed(event,val) {
  this.setState((prev)=>({...prev,speed:100-val}));
  }
  updateItems(event,val) {
    this.setState((prev)=>({...prev,items:val}),()=>this.generateArray());
  }
  componentDidMount() {
    this.generateArray();
  }
  generateArray() {
    if(timer1!=null) {
    clearTimeout(timer1);
    clearTimeout(timer2);
    }
    const arr=[];
    for(let i=0;i<this.state.items;i++)
      arr.push(randomNumber(4,98));
    this.setState((prev)=>({...prev,arr}),()=> {
      var ele = document.getElementsByClassName('arrayBar');
      for (var i = 0; i < ele.length; i++ ) {
        ele[i].style.backgroundColor = "#ff847c";
      }
    });
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
        const color = (i%3)===0?INITIAL_COLOR:FINAL_COLOR;
        timer1 = setTimeout(()=>{
          bar1Style.backgroundColor=color;
          bar2Style.backgroundColor=color;
        },i*this.state.speed)
      } else {
        const [bar,height] = res[i];
        const barStyle = arrayBars[bar].style;
        timer2 = setTimeout(()=>{
          barStyle.height=`${height}%`;
          const newArr = this.state.arr;
          newArr[bar]=height;
          barStyle.transition="height 0.7s";
        },i*this.state.speed);
      }
    }
    this.setState((prev)=>({...prev,live:false}));
  }
  bubbleSort() {
    const res = getBubbleSortAnimation(this.state.arr);
    for(let i=0;i<res.length;i++) {
      const arrayBars = document.getElementsByClassName('arrayBar');
      if(res[i].length===3) {//Compare
        const [bar1,bar2,flag] = res[i];
        const bar1Style = arrayBars[bar1].style;
        const bar2Style = arrayBars[bar2].style;
        let color;
        if((i%3)===0) color=COMP_COLOR;
        else color=INITIAL_COLOR;
        timer1 = setTimeout(()=>{
          bar1Style.backgroundColor=color;
          if(flag===false)
            bar2Style.backgroundColor=color;
          else
            bar2Style.backgroundColor=FINAL_COLOR;
        },i*this.state.speed);
      } else {//Swap
        const [bar1,height1,bar2,height2] = res[i];
        if(bar1!==-1){
          const bar1Style = arrayBars[bar1].style;
          const bar2Style = arrayBars[bar2].style;
          timer2 = setTimeout(()=>{
            bar1Style.height=`${height1}%`;
            bar2Style.height=`${height2}%`;
            bar1Style.transition="height 0.7s";
            bar2Style.transition="height 0.7s";
          },i*this.state.speed);
        }
      }
    }
    setTimeout(()=>{
      document.getElementsByClassName('arrayBar')[0].backgroundColor="#05dfd7";
    },this.state.speed)
    
  }
  selectionSort() {
    const res = getSelectionSortAnimation(this.state.arr);
    console.log(res);
    for(let i=0;i<res.length;i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      if(res[i].length===3) {
        const [bar1,bar2,flag]=res[i];
        const bar1Style=arrayBars[bar1].style;
        const bar2Style=arrayBars[bar2].style;
        let color;
        if(flag===true) color=COMP_COLOR;
        else color=INITIAL_COLOR;
        timer1 = setTimeout(()=>{
          bar1Style.backgroundColor=color;
          bar2Style.backgroundColor=color;
          // bar1Style.transition="all 0.7s";
          // bar2Style.transition="all 0.7s";
        },i*this.state.speed);
      } else if(res[i].length===4) {
        if(res[i][1]===-1) {
          const bar1Style=arrayBars[res[i][0]].style;
          timer2 = setTimeout(()=>{
            bar1Style.backgroundColor=FINAL_COLOR;
            bar1Style.transition="all 1s";
          },i*this.state.speed);
          
        } else {
          const [bar1,height1,bar2,height2] = res[i];
          const bar1Style=arrayBars[bar1].style;
          const bar2Style=arrayBars[bar2].style;
          timer2 = setTimeout(()=>{
            bar1Style.height=`${height1}%`;
            bar2Style.height=`${height2}%`;
            bar1Style.backgroundColor=FINAL_COLOR;
            bar1Style.transition="all 0.7s";
            bar2Style.transition="all 0.7s";
          },i*this.state.speed);
        }
      }
    }
  }
  quickSort() {
    const res = getQuickSortAnimation(this.state.arr);
    for(let i=0;i<res.length;i++) {
      const arrayBars = document.getElementsByClassName("arrayBar");
      if(res[i].length===3) {
        const [bar1,bar2,flag] = res[i];
        const bar1Style = arrayBars[bar1].style;
        const bar2Style = arrayBars[bar2].style;
        let color;
        if(flag===true) color=COMP_COLOR;
        else color=INITIAL_COLOR;
        timer1 = setTimeout(()=>{
          bar1Style.backgroundColor=color;
          bar2Style.backgroundColor=color;
          bar1Style.transition="all 0.7s";
          bar2Style.transition="all 0.7s";
        },i*this.state.speed); 
      } else if(res[i].length===4) {
        const [bar1,height1,bar2,height2] = res[i];
        if(bar1!==-1) {
          const bar1Style = arrayBars[bar1].style;
          const bar2Style = arrayBars[bar2].style;
          timer2 = setTimeout(()=>{
            bar1Style.height = `${height1}%`;
            bar2Style.height = `${height2}%`;
            bar1Style.transition="all 0.7s";
            bar2Style.transition="all 0.7s";
          },i*this.state.speed); 
        }
      } /*else if(res[i].length===2) {
        const barStyle = arrayBars[res[i][0]].style;
        setTimeout(()=>{
          barStyle.backgroundColor=FINAL_COLOR;
        },i*this.state.speed);
      }*/
  }

  }
  render()
  {
    return (
      <div className="homepage">
        <div className="header">
          <div className="menuBar1">
            <button className="styledButton" onClick={()=>/*window.location.reload()*/this.generateArray()}>Reset</button>
            <button className="styledButton" onClick={()=>this.mergeSort()}>Merge Sort</button>
            <button className="styledButton" onClick={()=>this.bubbleSort()}>Bubble Sort</button>
            <button className="styledButton" onClick={()=>this.selectionSort()}>Selection Sort</button>
            <button className="styledButton" onClick={()=>this.quickSort()}>Quick Sort</button>
          </div>
          <div className="menuBar2">
            <div className="sliderTab">
              <Typography gutterBottom>Speed</Typography>
              <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={50} min={1} max={100} onChange={(e,v)=>this.updateSpeed(e,v)}/>
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
