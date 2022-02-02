import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

// Use [] for where on the site the action occurs
// Then make a typesafe payload requirement

// TODO: Refactor string actions to global shared file
export const login = createAction(
  "[LOGIN PAGE] User Login",
  props<{ user: User }>()
);

export const logout = createAction("[TOP MENU] Logout");
