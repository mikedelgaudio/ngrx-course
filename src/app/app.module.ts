import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";

import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { HttpClientModule } from "@angular/common/http";

import { RouterModule, Routes } from "@angular/router";
import { AuthModule } from "./auth/auth.module";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { RouterState, StoreRouterConnectingModule } from "@ngrx/router-store";
import { metaReducers, reducers } from "./reducers";
import { EffectsModule } from "@ngrx/effects";
import { EntityDataModule } from "@ngrx/data";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "courses",
    loadChildren: () =>
      import("./courses/courses.module").then((m) => m.CoursesModule),
    canActivate: [AuthGuard],
  },
  {
    path: "**",
    redirectTo: "/",
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatToolbarModule,
    AuthModule.forRoot(),
    // add a runtime check to ensure we are not mutating state
    StoreModule.forRoot(reducers, {
      metaReducers, // runs before other reduceers
      runtimeChecks: {
        strictStateImmutability: true, // state should not mutate
        strictActionImmutability: true, // actions should not mutate
        strictActionSerializability: true, // serializable only data (can be saved by dev tools aka not dates)
        strictStateSerializability: true, // ensures the state is always serializable
      },
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({
      stateKey: "router",
      routerState: RouterState.Minimal,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
