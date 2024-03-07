import { StyleSheet } from "react-native";

import { View, Text } from "@/components/Themed";
import { useToDoStore } from "@/store";
import { ToDoStatus } from "@/types/toDoTypes";
import ToDoList from "@/components/ToDo/ToDoList";

const DoneToDos = () => {
  const { toDos } = useToDoStore((state) => state);
  const doneToDoItems = toDos.filter((i) => i.status === ToDoStatus.Done);
  return (
    <View style={styles.container}>
      {doneToDoItems.length > 0 ? (
        <ToDoList toDoItems={doneToDoItems} />
      ) : (
        <View style={styles.text}>
          <Text>Done ToDos will be here</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  text: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default DoneToDos;
