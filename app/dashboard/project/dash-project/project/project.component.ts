import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import {FormBuilder} from '@angular/forms';

import { ProjectRequestForm } from "../../../../shared/model/request-payload/project/project-request-form";
import { ProjectStatusEnum } from "../../../../shared/model/enum-type/project/project-status-enum";
import { ProjectService } from "src/app/shared/services/back-end/project/project.service";
@Component({
  selector: "wind-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  projectStatusEnum = ProjectStatusEnum;
  keysProjectStatus = [];
  selected: any;
  projectForm: ProjectRequestForm = new ProjectRequestForm(
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: moment().toDate(), dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    true
  );

  constructor(private projectService: ProjectService, private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.keysProjectStatus = Object.keys(this.projectStatusEnum).filter(
      (k) => !isNaN(Number(k))
    );
  }

  getSelectedStatus(event: any) {
    this.selected = event.target.value;
    this.projectForm.status.value = this.projectStatusEnum[this.selected];
  }

  private validateRequiredInputForm() {
    if (this.projectForm.name.value === "") {
      this.projectForm.name.dirty = true;
      this.projectForm.name.class = "invalid";
      this.projectForm.name.error = "le champs nom du projet est obligatoire";
    } else {
      this.projectForm.name.dirty = false;
      this.projectForm.name.class = "valid";
      this.projectForm.name.error = "";
    }
    if (this.projectForm.code.value === "") {
      this.projectForm.code.dirty = true;
      this.projectForm.code.class = "invalid";
      this.projectForm.code.error = "le champs code est obligatoire";
    } else {
      this.projectForm.code.dirty = false;
      this.projectForm.code.class = "valid";
      this.projectForm.code.error = "";
    }
    if (this.projectForm.startDate.value === undefined) {
      this.projectForm.startDate.dirty = true;
      this.projectForm.startDate.class = "invalid";
      this.projectForm.startDate.error =
        "le champs date de début est obligatoire";
    } else {
      this.projectForm.startDate.dirty = false;
      this.projectForm.startDate.class = "valid";
      this.projectForm.startDate.error = "";
    }
    if (this.projectForm.description.value === "") {
      this.projectForm.description.dirty = true;
      this.projectForm.description.class = "invalid";
      this.projectForm.description.error =
        "le champs description est obligatoire";
    } else {
      this.projectForm.description.dirty = false;
      this.projectForm.description.class = "valid";
      this.projectForm.description.error = "";
    }
    if (this.projectForm.costEstimationMargin.value === "") {
      this.projectForm.costEstimationMargin.dirty = true;
      this.projectForm.costEstimationMargin.class = "invalid";
      this.projectForm.costEstimationMargin.error =
        "le champs marge d'estimation des coûts est obligatoire";
    } else {
      this.projectForm.costEstimationMargin.dirty = false;
      this.projectForm.costEstimationMargin.class = "valid";
      this.projectForm.costEstimationMargin.error = "";
    }
    if (this.projectForm.costEstimationValue.value === "") {
      this.projectForm.costEstimationValue.dirty = true;
      this.projectForm.costEstimationValue.class = "invalid";
      this.projectForm.costEstimationValue.error =
        "le champs valeur d'estimation des coûts est obligatoire";
    } else {
      this.projectForm.costEstimationValue.dirty = false;
      this.projectForm.costEstimationValue.class = "valid";
      this.projectForm.costEstimationValue.error = "";
    }
    if (this.projectForm.hrEstimationMargin.value === "") {
      this.projectForm.hrEstimationMargin.dirty = true;
      this.projectForm.hrEstimationMargin.class = "invalid";
      this.projectForm.hrEstimationMargin.error =
        "le champs marge d'estimation des resources humaines est obligatoire";
    } else {
      this.projectForm.hrEstimationMargin.dirty = false;
      this.projectForm.hrEstimationMargin.class = "valid";
      this.projectForm.hrEstimationMargin.error = "";
    }
    if (this.projectForm.hrEstimationValue.value === "") {
      this.projectForm.hrEstimationValue.dirty = true;
      this.projectForm.hrEstimationValue.class = "invalid";
      this.projectForm.hrEstimationValue.error =
        "le champs valeur d'estimation des resources humaines  est obligatoire";
    } else {
      this.projectForm.hrEstimationValue.dirty = false;
      this.projectForm.hrEstimationValue.class = "valid";
      this.projectForm.hrEstimationValue.error = "";
    }
    if (this.projectForm.timeEstimationMargin.value === "") {
      this.projectForm.timeEstimationMargin.dirty = true;
      this.projectForm.timeEstimationMargin.class = "invalid";
      this.projectForm.timeEstimationMargin.error =
        "le champs marge d'estimation de temps est obligatoire";
    } else {
      this.projectForm.timeEstimationMargin.dirty = false;
      this.projectForm.timeEstimationMargin.class = "valid";
      this.projectForm.timeEstimationMargin.error = "";
    }
    if (this.projectForm.timeEstimationValue.value === "") {
      this.projectForm.timeEstimationValue.dirty = true;
      this.projectForm.timeEstimationValue.class = "invalid";
      this.projectForm.timeEstimationValue.error =
        "le champs valeur d'estimation de temps est obligatoire";
    } else {
      this.projectForm.timeEstimationValue.dirty = false;
      this.projectForm.timeEstimationValue.class = "valid";
      this.projectForm.timeEstimationValue.error = "";
    }
    if (this.projectForm.status.value === "") {
      this.projectForm.status.dirty = true;
      this.projectForm.status.class = "invalid";
      this.projectForm.status.error = "le champs état est obligatoire";
    } else {
      this.projectForm.status.dirty = false;
      this.projectForm.status.class = "valid";
      this.projectForm.status.error = "";
    }
  }

  private FormIsValid() {
    console.log("make it is form valid")
    if (
      this.projectForm.name.dirty ||
      this.projectForm.code.dirty ||
      this.projectForm.startDate.dirty ||
      this.projectForm.description.dirty ||
      this.projectForm.hrEstimationMargin.dirty ||
      this.projectForm.hrEstimationValue.dirty ||
      this.projectForm.costEstimationMargin.dirty ||
      this.projectForm.costEstimationValue.dirty ||
      this.projectForm.timeEstimationMargin.dirty ||
      this.projectForm.timeEstimationValue.dirty ||
      this.projectForm.status.dirty
    ) {
      this.projectForm.isValid = false;
    } else {
      this.projectForm.isValid = true;
    }

    if (this.projectForm.isValid === true) {
      const shadesEl2 = document.querySelector(".alert-danger");
      shadesEl2.classList.remove("show");
    }
    console.log("make it to before return is form valid", this.projectForm.isValid)
    // tslint:disable-next-line:no-unused-expression
    return this.projectForm.isValid;
  }

  onAddProjectFormSubmit() {
    this.validateRequiredInputForm();
    this.projectService.parametersAdd = this.projectForm;
    this.projectService.add().subscribe(() => {
      console.log("done");
      // this.router.navigateByUrl('/search/flights/result');
    });
    const shadesEl = document.querySelector(".alert-success");
    shadesEl.classList.add("show");
    const a = document.getElementById("form1") as HTMLFormElement;
    a.reset();
    setTimeout(() => {
      shadesEl.classList.remove("show");
    }, 3000);
  }

  onFormSubmit() {
    this.validateRequiredInputForm();
    if (!this.FormIsValid()) {
      console.log("make it to first cdt")
      const shadesEl2 = document.querySelector(".alert-danger");
      shadesEl2.classList.add("show");
      return;
    } else {
      console.log("make it to second cdt")
      this.onAddProjectFormSubmit();
    }
  }
}
