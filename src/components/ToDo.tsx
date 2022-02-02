import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IToDo, toDoState, useCategoryState } from "../atoms";

export const TODO_KEY = "todos";

function ToDo({ text, category, id }: IToDo) {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);

  const categorys = useRecoilValue(useCategoryState);

  useEffect(() => {
    localStorage.setItem(TODO_KEY, JSON.stringify(toDos));
    // const savedToDos = localStorage.getItem("todos");
    // const parsedToDos = JSON.parse(savedToDos as any);
    // console.log(parsedToDos);
  }, [toDos]);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget: { name }} = event;
  
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = {text, id, category: name as any};

      console.log(newToDo);
      return [...oldToDos.slice(0, targetIndex), newToDo, ...oldToDos.slice(targetIndex + 1),];
    });
  }

  const onClickDelete = () => {
    // setToDos((deleteToDo) => deleteToDo.filter((toDo) => toDo.id !== id));
    setToDos((oldToDo) => {
      const selectToDo = oldToDo.filter(toDo => toDo.id !== id);
      localStorage.setItem(TODO_KEY, JSON.stringify(selectToDo));
      return selectToDo
    });
  }

  // categorys?.map(useCategory => {
  //   const categoryName = useCategory.text;
  //   console.log(categoryName);
  //   return categoryName;
  // });

  console.log(categorys);

  return (
    <>
      <li>
        <span>{text}</span>
        <button onClick={onClickDelete}>삭제</button>
        {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button> }
        {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button> }
        {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button> }
        {/* {categorys?.map((useCategory) => {category !== String(useCategory.text) && <button name={useCategory.text} onClick={onClick}>{useCategory.text}</button>})} */}
        {categorys?.map((useCategory) => category !== String(useCategory.text) && <button name={useCategory.text} onClick={onClick}>{useCategory.text}</button>)}
      </li>
    </>
  );
}

export default ToDo;