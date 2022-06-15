import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FlightMainComponent } from "../../flight/fligt-main/flight-main.component";

const ROUTES: Routes = [
  {
    path: "",
    children: [
      {
        path: "project",
        loadChildren: () =>
          import("./dash-project/dash-project.module").then(
            (m) => m.DashProjectModule
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  entryComponents: [FlightMainComponent],
})
export class ProjectRoutingModule {}
