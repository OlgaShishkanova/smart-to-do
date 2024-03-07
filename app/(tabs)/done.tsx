import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { useToDoStore } from "@/store";
import { ToDoStatus } from "@/types/toDoTypes";
import ToDoList from "@/components/ToDo/ToDoList";

const DoneToDos = () => {
  const { toDos } = useToDoStore((state) => state);
  const doneToDoItems = toDos.filter((i) => i.status === ToDoStatus.Done);
  return (
    <View style={styles.container}>
      <ToDoList toDoItems={doneToDoItems} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
export default DoneToDos;
