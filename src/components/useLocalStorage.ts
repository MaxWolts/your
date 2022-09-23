import { useReducer, useEffect} from 'react';
import {Item} from './types';

type State = {
  items: Item[],
  sincronizedItems: boolean,
  loading: boolean
}
const initialState: State = {
  items: [],
  sincronizedItems: true,
  loading: false,
}

type ActionType = {type: 'save', payload: Item[] } | {type: 'sincronize' } | {type: 'success', payload: Item[] }


const useLocalStorage = (itemName: string) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const {
    loading,
    items,
    sincronizedItems,
  } = state;

  const onSave = (item:Item[]) => {
    const stringifiedItem = JSON.stringify(item)
    localStorage.setItem(itemName, stringifiedItem)
    dispatch({type: 'save', payload: item})
  }
  const onSuccess = (parseState: Item[]) => {
    dispatch({type: 'success', payload: parseState})
  }

  useEffect(() => {
    setTimeout(() => {
      try {
        const localStorageItem = localStorage.getItem(itemName)
        let parseState: Item[];
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(items))
          parseState = []
        } else {
          parseState = JSON.parse(localStorageItem)
        }
        onSuccess(parseState);
      } catch (error) {
        console.log(error)
      }
    }, 2000)
  }, [sincronizedItems])

  return {
    loading,
    items,
    sincronizedItems,
    onSave
  }

}

const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case 'save':
      return {
        ...state,
        items: action.payload
      }
    case 'sincronize':
      return {
        ...state,
        sincronizedItems: true,
        loading: true,
      }
    case 'success':
      return {
        ...state,
        loading: true,
        sincronizedItems: true,
        items: action.payload,
      }
    default:
      return state
  }
}

export {useLocalStorage}
