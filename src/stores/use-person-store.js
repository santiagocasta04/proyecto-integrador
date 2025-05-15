import { create } from "zustand";

const usePersonStore = create((set) => ({
  currentAnimation: "Yawn",

  setCurrentAnimation: (animation) => 
    set(() => ({
      currentAnimation: animation,
    })),
}));

export default usePersonStore;


