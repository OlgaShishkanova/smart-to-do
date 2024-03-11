import { useState } from "react";
import { Animated, StyleSheet, Text, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Checkbox from "expo-checkbox";

import { View } from "@/components/Themed";
import { ToDoItemType, ToDoStatus } from "@/types/toDoTypes";
import { COLORS } from "@/constants/Colors";
import { useToDoStore } from "@/store";
import React from "react";
import { useFadeAnimation } from "@/hooks/useFadeAnimation";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

interface Props {
  item: ToDoItemType;
}

const ToDoItem = ({ item }: Props) => {
  const { editToDoItem, removeToDoItems } = useToDoStore((state) => state);
  const isToDoOpen = item.status === ToDoStatus.Open;
  const [inputText, changeInputText] = useState(item.text);
  const [isChecked, setChecked] = useState(!isToDoOpen);
  const [isMenu, setIsMenu] = useState(false);
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
        finishedDate: new Date(),
      });
    }, 1000);
  };
  const onOptionSelect = (value: string) => {
    //TODO: make it as enum + more options
    if (value === "delete") {
      removeToDoItems([item.id]);
    }
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
        {isToDoOpen ? (
          <TextInput
            multiline
            onChangeText={(text) => changeInputText(text)}
            onBlur={onEditFinished}
            value={inputText}
            style={{ padding: 10, width: "90%" }}
          />
        ) : (
          <View style={styles.menuWrapper}>
            <Text disabled style={styles.text}>
              {inputText}
            </Text>
            <Menu
              opened={isMenu}
              onBackdropPress={() => setIsMenu(false)}
              onSelect={(value) => onOptionSelect(value)}
            >
              <MenuTrigger
                style={styles.iconWrapper}
                onPress={() => setIsMenu(true)}
              >
                <Ionicons size={18} color="black" name="ellipsis-vertical" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value="delete">
                  <Text>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        )}
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
  checkbox: {
    margin: 8,
  },
  text: {
    textDecorationLine: "line-through",
    width: "90%",
  },
  menuWrapper: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
  },
  iconWrapper: {
    padding: 10,
  },
});
export default React.memo(ToDoItem);
