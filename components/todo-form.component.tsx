import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";
import { ITask } from "../App";

const TodoForm = ({ onAddTask }: { onAddTask: (task: ITask) => void }) => {
  const [task, setTask] = useState("");
  const handleChangeTask = (val: string) => {
    setTask(val);
  };
  const handleAddTask = () => {
    if (!task) return;
    onAddTask({ id: String(Math.random()), isChecked: false, task });
    setTask("");
  };
  return (
    <View style={styles.actionContainer}>
      <TextInput
        style={styles.input}
        placeholder="Your task"
        value={task}
        onChangeText={handleChangeTask}
      />
      <View>
        <Button onPress={handleAddTask} title="Add" />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
  },
});
export default TodoForm;
