import {configureStore} from "@reduxjs/toolkit"

import { usersSlice} from "./features/User/slice"

export const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  }
})