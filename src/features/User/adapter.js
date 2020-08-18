import {
  createEntityAdapter,
} from '@reduxjs/toolkit'

// type User = { id: string; name: string, date_created: number }

export const usersAdapter = createEntityAdapter({
  // Keep the "all IDs" array sorted by creation date (oldest first)
  sortComparer: (a, b) => b.date_created - a.date_created,
})