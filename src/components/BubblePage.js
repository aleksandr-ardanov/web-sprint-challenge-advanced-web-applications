import React, { useEffect, useState } from "react" 
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from '../helpers/axiosWithAuth'


const BubblePage = () => {
  const [colorList, setColorList] = useState([]); 

  useEffect(()=>{                         //fetches data from api and adds it to the colorList
    axiosWithAuth().get('/colors')
    .then(res => {
      // console.log(res);
      setColorList(res.data);           
    })
    .catch(err => {
      console.log({err});
    })
  },[]);
  
  // console.log('color from the server',colorList)       

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
