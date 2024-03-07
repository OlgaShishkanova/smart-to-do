import React from "react";
import { StyleSheet, FlatList } from "react-native";

import { View } from "@/components/Themed";
import ToDoItem from "./ToDoItem";
import { ToDoItemType } from "@/types/toDoTypes";

interface Props {
  toDoItems: ToDoItemType[];
}

const ToDoList = ({ toDoItems }: Props) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={toDoItems}
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
