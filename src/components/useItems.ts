import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import {Item, Category} from './types';

function useItems () {
  const {
    loading,
    items,
    sincronizedItems,
    onSave: saveItem
  } = useLocalStorage('Items_v1');

  const [searchValue, setSearchValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [filterState, setFilterState] = useState(false);

  let searchedItems = [];
  if (searchValue.length <= 0) {
    searchedItems = items
  } else {
    searchedItems = items.filter(item => {
      const todoText = item.name.toLowerCase()
      const searchText = searchValue.toLowerCase()
      return todoText.includes(searchText)
    })
  }

  const addItem = (item: Item) => {
    item.id = items.length;
    const newItems = [...items];
    newItems.push(item);
    saveItem(newItems);
  }
  const changeItem = (item: Item, index: number) => {
    const newItems = [...items];
    newItems[index]= item;
    saveItem(newItems);
  }
  const deleteItem = (index: number) => {
    const newItems = [...items];
    const position = newItems.findIndex(item => item.id === index);
    newItems.splice(position, 1);
    for (let index = position; index < newItems.length; index++) {
      newItems[index].id = newItems[index].id -1
    }
    saveItem(newItems);
  }
  const changeState = (index: number) => {
    const newItems = [...items]
    newItems[index].state = !newItems[index].state
    saveItem(newItems);
  }
  const getItemsByCategory = (category: Category, state: boolean) => {
    let newItems: Item[]
    newItems = items.filter(item => item.category === category);
    const filter = newItems.filter(item => item.state === state)
    return filter
  }
  const openAndCloseModal = () => {
    setOpenModal(!openModal);
  }
  const getTotalItemsByCategory = (category: Category) => {
    let newItems: Item[]
    newItems = items.filter(item => item.category === category);
    let peding = newItems.filter((item => item.state === false))
    return {
      total: newItems.length,
      pendient: peding.length,
      finished: newItems.length - peding.length
    }
  }

  return {
    loading,
    addItem,
    changeItem,
    deleteItem,
    changeState,
    getItemsByCategory,
    openModal,
    openAndCloseModal,
    filterState, setFilterState,
    searchedItems,
    setSearchValue,
    searchValue,
    getTotalItemsByCategory
  }

}

export { useItems }
