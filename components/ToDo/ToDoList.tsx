import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "@/components/Themed";
import { useToDoStore } from "@/store";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const { toDos } = useToDoStore((state) => state);
  return (
    <View>
      <FlatList
        data={toDos}
        renderItem={({ item }) => <ToDoItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
});
export default ToDoList;
