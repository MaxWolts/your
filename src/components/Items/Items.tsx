import React from "react";
import { Item } from "../Item/Item";
import { ModalType } from '../App';
import {Item as ItemType, Category} from '../types';

interface Props {
  setModalData: React.Dispatch<React.SetStateAction<ModalType>>,
  sectionName: Category,
  getItems: (category: Category, state: boolean) => ItemType[],
  changeState: (index: number) => void,
  filterState: boolean,
  deleteItem: (index: number) => void
  searchedItems: ItemType[],
  searchValue: string,
  openModal: () => void,
  getTotalItemsByCategory: (category: Category) => {
    total: number;
    pendient: number;
    finished: number;
  }
}

const Items = ({setModalData, sectionName, getItems, changeState, filterState, deleteItem, searchedItems, searchValue, openModal, getTotalItemsByCategory }:Props) => {
  let itemsData = getItems(sectionName, filterState);

  let newSearchedItems: ItemType[] = [];
  if(searchedItems.length >= 1) {
    newSearchedItems = searchedItems.filter(item => item.category == sectionName);
  };
  let totals = getTotalItemsByCategory(sectionName)
  return(
    <>
      <p className="Total-items">Pending: {totals.pendient} Finished: {totals.finished}</p>
      <div className="Items">
        {searchValue.length >= 1 &&
          (newSearchedItems.length >= 1?
            newSearchedItems.map( (item, index) =>
            (<Item
              setModalData={setModalData}
              itemData={item}
              key={index}
              changeState={changeState}
              deleteItem={deleteItem}
              openModal={openModal} />)):
              <p className="no-data-menssage">Click in the "+" to add an item.</p>
          )
        }

        {(itemsData.length && searchValue.length == 0)?
          itemsData.map( (item, index) => (<Item
            setModalData={setModalData}
            itemData={item}
            key={index}
            changeState={changeState}
            deleteItem={deleteItem}
            openModal={openModal} />)): <></>}

        {(searchValue.length <=1 && itemsData.length <= 0) &&
        <p className="no-data-menssage">Click in the "+" to add an item.</p>
        }
      </div>
    </>
  )
};

export { Items }
