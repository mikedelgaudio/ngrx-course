import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

// create a typesafe selector to grab the data in store
export const selectAuthState = createFeatureSelector<AuthState>("auth");

// has memory and the output does not re-cal (MEMORIZED)
export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
