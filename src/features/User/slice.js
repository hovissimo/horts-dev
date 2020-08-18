import { usersAdapter } from "./adapter"

import { createSlice } from "@reduxjs/toolkit"

export const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState(),
  reducers: {
    // Can pass adapter functions directly as case reducers.  Because we're passing this
    // as a value, `createSlice` will auto-generate the `bookAdded` action type / creator
    userAdded: usersAdapter.addOne,
    usersReceived(state, action) {
      // Or, call them as "mutating" helpers in a case reducer
      usersAdapter.setAll(state, action.payload.users)
    },
  },
})

export const userActions = usersSlice.actions
