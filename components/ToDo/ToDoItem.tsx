import { useState } from "react";
import { Animated, StyleSheet, TextInput } from "react-native";
import Checkbox from "expo-checkbox";

import { View } from "@/components/Themed";
import { ToDoItemType, ToDoStatus } from "@/types/toDoTypes";
import { COLORS } from "@/constants/Colors";
import { useToDoStore } from "@/store";
import React from "react";
import { useFadeAnimation } from "@/hooks/useFadeAnimation";

interface Props {
  item: ToDoItemType;
}

const ToDoItem = ({ item }: Props) => {
  const { editToDoItem } = useToDoStore((state) => state);
  const isToDoOpen = item.status === ToDoStatus.Open;
  const [inputText, changeInputText] = useState(item.text);
  const [isChecked, setChecked] = useState(!isToDoOpen);
  const { fadeAnim, fadeOut } = useFadeAnimation();
  const onEditFinished = () => {
    editToDoItem(item.id, { text: inputText, editDate: new Date() });
  };
  const onChecked = (value: boolean) => {
    setChecked(true);
    fadeOut(1000);
    setTimeout(() => {
      editToDoItem(item.id, {
        status: value ? ToDoStatus.Done : ToDoStatus.Open,
      });
    }, 1000);
  };
  return (
    <View>
      <Animated.View
        style={[
          styles.section,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={(value) => onChecked(value)}
          color={isChecked ? COLORS.tertiary : undefined}
        />
        <TextInput
          multiline
          editable={isToDoOpen}
          onChangeText={(text) => changeInputText(text)}
          onBlur={onEditFinished}
          value={inputText}
          style={{ padding: 10, width: "100%" }}
        />
      </Animated.View>
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
