import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Checkbox from "expo-checkbox";

import { View } from "@/components/Themed";
import { ToDoItemType } from "@/types/toDoTypes";
import { COLORS } from "@/constants/Colors";
import { useToDoStore } from "@/store";
import React from "react";

interface Props {
  item: ToDoItemType;
}

const ToDoItem = ({ item }: Props) => {
  const { editToDoItem } = useToDoStore((state) => state);
  const [inputText, changeInputText] = useState(item.text);
  const [isChecked, setChecked] = useState(false);
  const onEditFinished = () => {
    editToDoItem(item.id, { text: inputText, editDate: new Date() });
  };
  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? COLORS.tertiary : undefined}
      />
      <TextInput
        multiline
        onChangeText={(text) => changeInputText(text)}
        onBlur={onEditFinished}
        value={inputText}
        style={{ padding: 10, width: "100%" }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
export default React.memo(ToDoItem);
