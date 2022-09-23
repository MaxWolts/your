import React,{useRef} from "react";
import { ModalType } from '../App';
import {Category, Item} from '../types';

interface Props {
  modalData: ModalType,
  setModalData: React.Dispatch<React.SetStateAction<ModalType>>,
  sectionName: Category,
  closeModal: () => void,
  addItem: (item: Item) => void,
  changeItem: (item: Item, index: number) => void
}

const AddOrEditItem = ({modalData, sectionName, setModalData, closeModal, addItem, changeItem}:Props) => {
  const nameRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const descriptionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const categoryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let newItem: Item = {
      id: 0,
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current?.value as Category,
      state:false,
    }
    if(modalData != '') {
      newItem.id = modalData.id
      newItem.state = modalData.state
      handleEdit(newItem, modalData.id)
    } else {
      addItem(newItem);
    }
    closeModal();
  }

  setTimeout(()=>{
    if (modalData != '') {
      nameRef.current.value = modalData.name;
      descriptionRef.current.value = modalData.description;
    }
  }, 10)

  const closeModalandDataModal = () => {
    if(modalData != '') {
      setModalData('')
    }
    closeModal()
  }
  const handleEdit = (editedItem: Item, index:number) => {
    changeItem(editedItem, index)
  }

  return(
    <form className="AddOrEditItem" onSubmit={(eve)=>{handleSubmit(eve)}}>
      <h2>{modalData == ''? 'Add': 'Edit'} item</h2>
      <span>Name</span>
      <input type="text" name="name2" placeholder="Name" className="AddOrEditItem__name" ref={nameRef}/>
      <span>Note</span>
      <input type="text" name="note" placeholder="Write a note" className="AddOrEditItem__note" ref={descriptionRef}/>
      <span>Category</span>
      <select name="" id="" defaultValue={ sectionName } className="AddOrEditItem__note" ref={categoryRef}>
        <option value="" className="SeclectACategory" disabled>Select category</option>
        <option value="Serie" className="Serie">Series</option>
        <option value="Game" className="Game">Games</option>
        <option value="Movie" className="Movie">Movies</option>
        <option value="Book" className="Book">Books</option>
      </select>
      <div className="AddOrdEditItem__buttons">
        <button className="cancel" onClick={ closeModalandDataModal } type="button">Cancel</button>
        <button className="addOrEdit" type="submit">{modalData == ''? 'Add': 'Edit'}</button>
      </div>
    </form>
  )
}

export { AddOrEditItem }
