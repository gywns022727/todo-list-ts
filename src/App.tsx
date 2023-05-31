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
  // todolist data를 저장하는 state
  const [todos, setTodos] = useState<Todo[]>([]);
  // todo를 추가하기 위해 적는 내용을 담는 state
  const [todoName, setTodoName] = useState<string>("");
  // 현재 수정중인 todo의 id르 담는 state
  const [editId, setEditId] = useState<number | undefined>();
  // 수정 버튼을 누른 뒤 나온 input의 값을 수정하는데  써야하기 때문에 state에 담아 놓는다
  const [editName, setEditName] = useState<string>("");

  // todoName state를 input의 onChange에서 setState 해주는 함수
  const handleInputChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setTodoName(value);
  };

  // todo를 만드는input에서 enter를 눌렀을 때 todo를 추가해주는 함수
  const handlePressEnter = ({ key }: KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") addTodo();
  };

  // todo를 추가하는 함수
  const addTodo = () => {
    // todoName이 빈값이면 추가하지 않음(히후 코드 실행 X)
    if (!todoName.trim()) return;

    // localStorage에서 count를 +1 gowna (id로 사용하기 위해)
    const count = Number(localStorage.getItem("count")) + 1;
    localStorage.setItem("count", `${count}`);

    // todo에 새로운 todo 추가
    setTodos((prevState) => [
      ...prevState,
      { id: prevState.length, name: todoName },
    ]);

    // todoName을 비워줌
    setTodoName("");
  };

  // todo를 초기화 해주는 함수 (state, localStorage)
  const resetTodo = () => {
    setTodos([]);
    localStorage.setItem("count", "0");
  };

  // 수정할 todo의 내용을 input의 onChange에서 설정해주는 함수
  const handlEditName = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setEditName(value);
  };

  // 컴포넌트(페이지)가 '처음 렌더링 됐을 때 locasStorge의 todos를 state에 넣어줌
  useEffect(() => {
    // JSON, ~함수는 에러가 나면 그냥 터져버리기 때문에 try/catch로 감싸줌
    try {
      const parseData: Todo[] = JSON.parse(localStorage.getItem("todos") || "");
      setTodos(parseData);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // state todo가 변화 될 때(추가, 삭제) locaslStorage에도 저장해줌
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
            maxLength={7}
            width="250px"
          />
          <Button onClick={addTodo}>추가</Button>
          <Button onClick={resetTodo}>초기화</Button>
        </RowBox>
        <List>
          {todos.map(({ id, name }) => {
            const isEdit: boolean = editId === id;

            const deletTodo = () => {
              setTodos((prevState) => prevState.filter((v) => v.id !== id));
            };

            const toggleEditTodo = () => {
              setEditId(() => (isEdit ? undefined : id));
            };

            const editTodo = () => {
              setTodos((prevState) =>
                prevState.map((todo) =>
                  todo.id === id ? { ...todo, name: editName } : todo
                )
              );
              toggleEditTodo();
            };

            return (
              <ToDo key={id}>
                {isEdit ? (
                  <Input defaultValue={name} onChange={handlEditName} />
                ) : (
                  name
                )}

                <div>
                  <Button onClick={deletTodo} backgroundColor="#ff3333">
                    삭제
                  </Button>

                  <Button onClick={toggleEditTodo}>
                    {isEdit ? "취소" : "수정"}
                  </Button>
                  {isEdit && <Button onClick={editTodo}>저장</Button>}
                </div>
              </ToDo>
            );
          })}
        </List>
      </Container>
    </>
  );
}

export default App;
