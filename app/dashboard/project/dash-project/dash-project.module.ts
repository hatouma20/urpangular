import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRippleModule,
  MatSelectModule,
  MatStepperModule,
} from "@angular/material";
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTablesModule } from "angular-datatables";
import { TagInputModule } from "ngx-chips";
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { ProjectComponent } from "./project/project.component";
import { DashProjectRoutingModule } from "./dash-project-routing.module";
import { ProjectListComponent } from "./project-list/project-list.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";

@NgModule({
  declarations: [ProjectComponent, ProjectDetailsComponent, ProjectListComponent],
  imports: [
    CommonModule,
    DashProjectRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NgbDatepickerModule,
    TagInputModule,
    DragDropModule,
    MDBBootstrapModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatStepperModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    ProjectComponent,
  ],
})
export class DashProjectModule {}
