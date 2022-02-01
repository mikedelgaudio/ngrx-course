import { createSelector } from "@ngrx/store";

// has memory and the output does not re-cal (MEMORIZED)
export const isLoggedIn = createSelector(
  (state) => state["auth"],
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
