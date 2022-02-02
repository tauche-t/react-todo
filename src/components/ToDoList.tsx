import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoSelector, toDoState, useCategoryState } from "../atoms";
import CreateToDo from "./CreateToDo";
import CreateCategory from "./CreateCategory";
import ToDo from "./ToDo";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InnerContainer = styled.div`
  width: 500px;
  margin-top: 30px;

  h1 {
    text-align: center;
    font-size: 24px;
    padding-bottom: 10px;
  }

  select {
    margin-top: 10px;
  }
`;



function ToDoList() {
  const categorys = useRecoilValue(useCategoryState);
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  }

  // const [toDo, setToDo] = useState("");

  // const onChange = (event:React.FormEvent<HTMLInputElement>) => {
  //   const { currentTarget: { value } } = event;

  //   setToDo(value);
  // };

  // const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  // }

  return (
    <Wrapper>
      <InnerContainer>
        <h1>To Dos</h1>
        <hr />

        <select onInput={onInput}>
          <option value="TO_DO">To Do</option>
          <option value="DOING">Doing</option>
          <option value="DONE">Done</option>
          {categorys?.map((category) => (
            <option key={category.id} value={category.text}>{category.text}</option>
          ))}
        </select>

        <CreateCategory />

        <CreateToDo />

        {toDos?.map((toDo: any) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}

        {/* <h2>To Do</h2>
        <ul>
          {toDo.map((toDo) => (
            <ToDo key={toDo.id} { ...toDo } />
          ))}
        </ul>
        <hr />
        <h2>DOING</h2>
        <ul>
          {doing.map((toDo) => (
            <ToDo key={toDo.id} { ...toDo } />
          ))}
        </ul>
        <hr />
        <h2>DONE</h2>
        <ul>
          {done.map((toDo) => (
            <ToDo key={toDo.id} { ...toDo } />
          ))}
        </ul> */}
      </InnerContainer>
    </Wrapper>
  );
}

export default ToDoList