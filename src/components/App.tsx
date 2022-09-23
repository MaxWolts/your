import React, { useState } from "react";
import { Title } from "./Title/Title";
import { Structure } from "./Structure/Structure";
import { Menu } from "./Menu/Menu";
import { Search } from "./Search/Search";
import { SectionButton } from "./SectionButton/SectionButton";
import { Items } from "./Items/Items";
import { Modal } from "./Modal/Modal";
import { Loading } from "./Loading/Loading";
import './global.scss'

import {Item, Category } from './types';
import {useItems } from './useItems';

export type ModalType = '' | Item;

export const App = () => {
  const [sectionsNames, setSectionsNames] = useState<Category>('Serie');
  const [modalData, setModalData] = useState<ModalType>('');


  const {
    loading,
    addItem,
    getTotalItemsByCategory,
    deleteItem,
    changeState,
    changeItem,
    getItemsByCategory,
    filterState, setFilterState,
    openModal, openAndCloseModal,
    searchedItems,
    searchValue, setSearchValue,
  } = useItems();

  return (
    <>
      <Structure>
        {loading?
          <>
            <Title
              sectionName={sectionsNames}
            />
            <Search setSearchValue={ setSearchValue} />
            <SectionButton
              setFilterState={setFilterState}
              filterState={filterState}
            />

            <Items
              setModalData={setModalData}
              sectionName={sectionsNames}
              getItems={getItemsByCategory}
              changeState={changeState}
              filterState={filterState}
              deleteItem={deleteItem}
              searchedItems={searchedItems}
              searchValue={searchValue}
              openModal={openAndCloseModal}
              getTotalItemsByCategory={getTotalItemsByCategory}
            />
            <Menu
              sectionsNames={sectionsNames}
              setSectionsNames={setSectionsNames}
              setOpenModal={openAndCloseModal}
            />
            {openModal?
              <Modal setModalData={setModalData}
              modalData={modalData}
              sectionName={sectionsNames}
              setOpenAndCloseModal={openAndCloseModal}
              addItem={addItem}
              changeItem={changeItem }></Modal>: ''
            }
          </>: <Loading/>
        }
      </Structure>
    </>
  );

}
