import { create } from "zustand";
import { searchStore } from "../../Helpers/types.ts";

export const SearchStore = create<searchStore>((set) => ({
    search: "",
    setSearch: (value) => {
        set({ search: value });
    }
}))