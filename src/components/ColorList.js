import React, { useEffect, useState } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth';
import EditMenu from './EditMenu'

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  // console.log(colorToEdit) 
  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth().put(`/colors/${colorToEdit.id}`,colorToEdit) 
    .then(res => {
      // console.log(res.data);
      const updatedColorsArray = colors.map(color => {                
        return color.id === res.data.id ?
        color = res.data
        :color
      })
      if (JSON.stringify(updatedColorsArray) !== JSON.stringify(colors)){   // we prevent bubbles from moving with this action in case if nothing has changed and save button pressed
        updateColors(updatedColorsArray)           
      }
    })
    .catch(err => {
      console.log({err})
    })
  };

  useEffect(()=>{
    console.log('updated colors', colors)   //check when colors updated
  },[colors])

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(res => {
      console.log(res);
      const filteredColorsArray = colors.filter(col => col.id !== color.id);   
      updateColors(filteredColorsArray);         //replaces an old array with the new array without deleted color
    })
    .catch(err => {
      console.log(err)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }

    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.