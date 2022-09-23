import React from "react";
import { ModalType } from '../App';
import { Item as ItemType } from '../types';

interface Props {
  setModalData: React.Dispatch<React.SetStateAction<ModalType>>,
  itemData: ItemType,
  changeState: (index: number) => void,
  deleteItem: (index: number) => void
  openModal: ()=> void
}

const Item = ({ setModalData, itemData, changeState, deleteItem, openModal }:Props ) => {
  return(
    <div className="Item" >
      <input type="checkbox" id={`check${itemData.id}`} className="Item__button button--check" onChange={()=>{changeState(itemData.id)}} checked={itemData.state}/>
      <label htmlFor={`check${itemData.id}`}></label>
      <p className="Item__text" onClick={ ()=> {
        setModalData(itemData);
        openModal()
      }}>{itemData.name}</p>
      <button className="Item__button button--delete" id={`delete${itemData.id}`} onClick={()=>{deleteItem(itemData.id)}}>X</button>
    </div>
  )
};

export { Item }
