import React, { ReactNode } from "react";
import { AddOrEditItem } from "../AddOrEditItem/AddOrEditItem";
import { ModalType } from '../App';
import {Item, Category} from '../types';

interface Props {
  modalData: ModalType,
  setModalData: React.Dispatch<React.SetStateAction<ModalType>>,
  sectionName: Category,
  setOpenAndCloseModal: () => void,
  addItem: (item: Item) => void,
  changeItem: (item: Item, index: number) => void
}

const Modal = ({setModalData, modalData, sectionName, setOpenAndCloseModal,addItem, changeItem}:Props) => {
  return(
  <div className="Modal">
    <AddOrEditItem modalData={modalData} setModalData={setModalData} sectionName={sectionName} closeModal={setOpenAndCloseModal} addItem={addItem} changeItem={changeItem}></AddOrEditItem>
  </div> )
}

export { Modal }
