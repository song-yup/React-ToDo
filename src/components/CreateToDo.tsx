import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import { categoryState, newCategoryState, toDoState } from "../atoms";
import styled from "styled-components";

const Box = styled.form`
  align-items: center;
  font-size: 25px;
`;

const Input = styled.input`
  font-size: 25px;
  margin-left: 10px;
  margin-bottom: 10px;
  margin-right: 5px;
`;

const AddButton = styled.button`
    font-size: 25px;
`;

const CategorySelect = styled.select`
    margin-left: 10px;
    font-size: 25px;
`;

interface IForm {
    toDo: string;
    newCategory: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState);
    // const category = useRecoilValue(categoryState);
    const { register, handleSubmit, setValue } = useForm<IForm>();

    const [newCategory, setNewCategory] = useRecoilState(newCategoryState);

    const handleValid = ({ toDo, newCategory }: IForm) => {
        setToDos((oldToDos) => [{ 
            text: toDo, category: category, id: Date.now() 
        }, ...oldToDos]);
        setValue("toDo", "");
        if(newCategory.trim() !== "") {
            setNewCategory((oldCategory) => [...oldCategory, {text: newCategory, id: Date.now()}]);
        }
        setValue("newCategory", "");
    };

    const [category, setCategory] = useRecoilState(categoryState);

    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        setCategory(event.currentTarget.value as any);
    };

    return (
        <Box onSubmit={handleSubmit(handleValid)}>
            <Input
                {...register("toDo", {
                    required: "Please Write a To Do!!!",
                })}
                placeholder="Write a to do"
            />
            <AddButton>To Do Add</AddButton>
            <br />
            <Input 
                {...register("newCategory")} 
                placeholder="Write New Category" 
            />
            <AddButton>Category Add</AddButton>
            <br />
            <CategorySelect value={category} onInput={onInput}>
                {/* <option value={Categories.To_Do}>To Do</option>
                <option value={Categories.Doing}>Doing</option>
                <option value={Categories.Done}>Done</option> */}
                {newCategory?.map(category =><option value={category.text}>{category.text}</option>)}
            </CategorySelect>
        </Box>
    );
}

export default CreateToDo;