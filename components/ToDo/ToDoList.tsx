import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { Text, View } from "@/components/Themed";
import { useToDoStore } from "@/store";
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
  const { toDos } = useToDoStore((state) => state);
  console.log({ toDos });
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={toDos}
        renderItem={({ item }) => <ToDoItem item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 15,
  },
});
export default React.memo(ToDoList);
