import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState, useCategoryState } from "../atoms";
import { AiOutlinePlus } from "react-icons/ai";

interface IForm {
  useCategory: string;
}

function CreateCategory(){
  const categorys = useRecoilValue(useCategoryState);
  const setUseCategory = useSetRecoilState(useCategoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onSubmit = ({ useCategory }: IForm) => {
    setUseCategory((category) => [ ...category, { text: useCategory, id: Date.now(), } ]);
    setValue("useCategory", "");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input { ...register("useCategory") } placeholder="Add a category." />
      <button>Add</button>
    </form>
  );
}

export default CreateCategory;