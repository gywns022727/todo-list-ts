import { useState, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import GlobalStyles from "./Global.styled";
import {
  Container,
  RowBox,
  Input,
  Button,
  List,
  ToDo,
  Title,
} from "./App.styled";

interface Todo {
  id: number;
  name: string;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoName, setTodoName] = useState<string>("");

  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodoName(value);
  };

  const handlePressEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") addTodo();
  };

  const addTodo = () => {
    if (!todoName.trim()) return;
    setTodos((prevState) => [
      ...prevState,
      { id: prevState.length, name: todoName },
    ]);
  };

  useEffect(() => {
    try {
      const parseData: Todo[] = JSON.parse(localStorage.getItem("todos") || "");
      setTodos(parseData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <GlobalStyles />
      <Container>
        <Title>Todo List</Title>
        <RowBox>
          <Input
            placeholder="Todo를 입력해주세요"
            value={todoName}
            onChange={handleInputChange}
            onKeyUp={handlePressEnter}
          />
          <Button onClick={addTodo}>추가</Button>
        </RowBox>
        <List>
          {todos.map(({ id, name }) => {
            return <ToDo key={id}>{name}</ToDo>;
          })}
        </List>
      </Container>
    </>
  );
}

export default App;
