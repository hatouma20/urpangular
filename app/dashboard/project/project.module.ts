import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProjectRoutingModule } from "./project.routing.module";
import { DataTablesModule } from "angular-datatables";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [CommonModule, ProjectRoutingModule, DataTablesModule, NgbModule],
})
export class ProjectModule {}
