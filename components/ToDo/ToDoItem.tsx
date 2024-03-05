import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import Checkbox from "expo-checkbox";

import { Text, View } from "@/components/Themed";
import { ToDoItemType } from "@/types/toDoTypes";
import { COLORS } from "@/constants/Colors";

interface Props {
  item: ToDoItemType;
}

const ToDoItem = ({ item }: Props) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.section}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={setChecked}
        color={isChecked ? COLORS.tertiary : undefined}
      />
      <Text>{item.text}</Text>
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
export default ToDoItem;
