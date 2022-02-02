import { atom, selector } from "recoil";
import { TODO_KEY } from "./components/ToDo";

// export enum Categories {
//   "TO_DO" = "TO_DO",
//   "DOING" = "DOING",
//   "DONE" = "DONE",
// }

export interface IToDo {
  text: string;
  id: number;
  category: string;  // 할 일, 하고 있는 일, 완료한 일.  모든 string이 아니라, 3개의 string 중 하나
}

export interface ICategory {
  id: number;
  text: string;
}


export const categoryState = atom({
  key: "category",
  // default: Categories.TO_DO,
  default: "TO_DO",
});

export const useCategoryState = atom<ICategory[]>({
  key: "useCategory",
  default: [],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem(TODO_KEY) || '[]'),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo: any) => toDo.category === category);
    // return [
    //   toDos.filter((toDo) => toDo.category === "TO_DO"),
    //   toDos.filter((toDo) => toDo.category === "DOING"),
    //   toDos.filter((toDo) => toDo.category === "DONE"),
    // ];
  }
});
