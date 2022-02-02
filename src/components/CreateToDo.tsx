import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "../atoms";
import { AiOutlinePlus } from "react-icons/ai";

const Form = styled.form`
  width: 100%;
  display: flex;
  margin-top: 15px;

  input {
    width: 100%;
    border-radius: 20px;
    padding: 5px 15px;
  }

  button {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-left: 10px;
    border: none;
    outline: none;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f1f3f5;
    color: #2f3640;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const toDos = useRecoilValue(toDoState);
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ toDo }: IForm) => {
    setToDos(oldToDos => [{ text: toDo, id: Date.now(), category }, ...oldToDos]);
    setValue("toDo", "");
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <input { ...register("toDo", { required: "Please write a To Do", }) } placeholder="Write a to do" />
      <button><AiOutlinePlus /></button>
    </Form>
  );
}

export default CreateToDo;