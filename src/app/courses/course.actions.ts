import { createAction, props } from "@ngrx/store";
import { Course } from "./model/course";

// action happened
export const loadAllCourses = createAction(
  "[Course Resolver] Load All Courses"
);

// trigger finished loading
export const allCoursesLoaded = createAction(
  "[Load Courses Effect] All Courses Loaded",
  props<{ courses: Course[] }>()
);
