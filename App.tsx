import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import List from "./components/list.component";
import TodoForm from "./components/todo-form.component";
import { getData, storeData } from "./service/data.service";
import { LOCALSTORAGE } from "./constants/storage.constant";

export interface ITask {
  task: string;
  id: string;
  isChecked: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<ITask[]>([]);
  const [isOpenCompletedList, setIsOpenCompletedList] = useState(false);
  const unCompletedTasks = todos.filter((todo) => !todo.isChecked);
  const completedTasks = todos.filter((todo) => todo.isChecked);
  const handleAddTask = (task: ITask) => {
    setTodos((todos) => [task, ...todos]);
    storeTodos();
  };
  const handleDelete = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
    storeTodos();
  };
  const handleToggleStateCheck = (id: string) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
    storeTodos();
  };
  const storeTodos = () => {
    setTodos((todos) => {
      storeData(LOCALSTORAGE.todos, todos);

      return todos;
    });
  };
  useEffect(() => {
    (async () => {
      const todos = await getData<ITask[]>(LOCALSTORAGE.todos);
      console.log(todos);
      if (todos && todos.length) {
        setTodos(todos);
      }
    })();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>TodoList</Text>
      <View>
        <TodoForm onAddTask={handleAddTask} />
        {/* un completed list */}
        <View>
          <List
            list={unCompletedTasks}
            onDelete={handleDelete}
            onToggleCheck={handleToggleStateCheck}
          />
        </View>
        {/* completed list */}
        {completedTasks.length > 0 && (
          <View style={{ marginTop: 24 }}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => setIsOpenCompletedList((prev) => !prev)}
              >
                <Text style={{ fontSize: 20 }}>Uncompleted List</Text>
              </Pressable>
              {isOpenCompletedList ? (
                <Icon name="keyboard-arrow-down" size={30} color="#000" />
              ) : (
                <Icon name="chevron-right" size={30} color="#000" />
              )}
            </View>
            {isOpenCompletedList && (
              <List
                list={completedTasks}
                onDelete={handleDelete}
                onToggleCheck={handleToggleStateCheck}
              />
            )}
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 8,
    flex: 1,
  },
  heading: {
    fontSize: 32,
    fontStyle: "italic",
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "#fff",
    marginBottom: 12,
  },
});

export default App;
