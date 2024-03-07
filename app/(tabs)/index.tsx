import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";

import { Text, View } from "@/components/Themed";
import { SIZES } from "@/constants/Sizes";
import { COLORS } from "@/constants/Colors";
import { useToDoStore } from "@/store";
import ToDoList from "@/components/ToDo/ToDoList";
import { ToDoStatus } from "@/types/toDoTypes";

const OpenToDos = () => {
  const { addToDoItem, toDos } = useToDoStore((state) => state);
  const [toDoText, setToDoText] = useState("");
  const onSaveToDoText = () => {
    if (toDoText) {
      const uniqId = uuidv4();
      const createDate = new Date();
      addToDoItem({
        id: uniqId,
        createDate,
        editDate: createDate,
        text: toDoText,
        status: ToDoStatus.Open,
      });
      setToDoText("");
    }
  };
  const openToDoItems = toDos.filter((i) => i.status === ToDoStatus.Open);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={styles.wrapper}>
            <TextInput
              multiline={true}
              numberOfLines={2}
              style={styles.input}
              value={toDoText}
              placeholder="Add your ToDo"
              onChangeText={(text) => {
                setToDoText(text);
              }}
            />
          </View>
          <TouchableOpacity style={styles.addBtn} onPress={onSaveToDoText}>
            <FontAwesome size={22} color="white" name="arrow-right" />
          </TouchableOpacity>
        </View>
        <ToDoList toDoItems={openToDoItems} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  inputContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    marginRight: 10,
  },
  addBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
export default OpenToDos;
