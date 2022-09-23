export type Category = 'Game' | 'Serie' | 'Movie' | 'Book';

export interface Item {
  id: number,
  name: string,
  description: string,
  state: boolean,
  category: Category,
}

export interface ItemDataUpdate extends Omit<ItemData, 'id'>{}
