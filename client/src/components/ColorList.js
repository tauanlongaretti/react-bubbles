import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            console.log(res);
            updateColors(res.data);
          });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteColor = colorToEdit => {
    axiosWithAuth()
      .delete(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        axiosWithAuth()
          .get("/colors")
          .then(res => {
            console.log(res);
            updateColors(res.data);
          });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
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
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>Edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      <form className="new-color-form">
        <legend>Add Color</legend>
        <label>
          color name:
        <input 
          className="new-color-input"
          // value={colorToAdd.color} 
        />
        </label>
        <label>
          hex code:
        <input 
          className="new-color-input"
          // value={colorToAdd.color} 
        />
        </label>
        <button className="button" type="submit">Add</button>  
      </form>
    </div>
  );
};

export default ColorList;
