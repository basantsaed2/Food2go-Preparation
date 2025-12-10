import { createSlice } from "@reduxjs/toolkit";

// Initial states
const initialPreparationState = { data: null };

/*  preparation */
const preparationSlice = createSlice({
       name: "preparation",
       initialState: initialPreparationState,
       reducers: {
              setPreparation: (state, action) => {
                     state.data = action.payload;
              },
              removePreparation: (state) => {
                     state.data = null;
              },
       },
});

export const { setPreparation, removePreparation } = preparationSlice.actions;

export const preparationReducer = preparationSlice.reducer;
