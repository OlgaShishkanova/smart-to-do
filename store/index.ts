import { ToDoItemType } from "@/types/toDoTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ToDoState {
  toDos: ToDoItemType[];
  addToDoItem: (item: ToDoItemType) => void;
  removeToDoItems: (ids: string[]) => void;
  editToDoItem: (id: string, info: any) => void;
}

export const useToDoStore = create(
  persist<ToDoState>(
    (set, get) => ({
      toDos: [],
      addToDoItem: (item) =>
        set((state) => ({ toDos: [...state.toDos, item] })),
      removeToDoItems: (ids) =>
        set((state) => ({
          toDos: state.toDos.filter((i) => !ids.includes(i.id)),
        })),
      editToDoItem: (id, info) => {
        set((state) => ({
          toDos: state.toDos.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                ...info,
              };
            }
            return item;
          }),
        }));
      },
    }),
    {
      name: "todo-store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
