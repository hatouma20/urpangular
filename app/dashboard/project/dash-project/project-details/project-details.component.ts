import { Component, OnInit } from "@angular/core";
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { WindForm } from "../../../../shared/model/windForm";
import { WindFormElement } from "../../../../shared/model/windForm";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";

import { TaskRequestForm } from "../../../../shared/model/request-payload/project/task-request-form";
import { TaskPriorityEnum } from "../../../../shared/model/enum-type/project/task-priority-enum";
import { ProjectService } from "src/app/shared/services/back-end/project/project.service";
import { CollaboratorService } from "src/app/shared/services/back-end/collaborator/collaborator.service";
import { SprintRequestForm } from "../../../../shared/model/request-payload/project/sprint-request-form";

@Component({
  selector: "wind-project-details",
  templateUrl: "./project-details.component.html",
  styleUrls: ["./project-details.component.scss"],
})
export class ProjectDetailsComponent implements OnInit {
  taskPriorityEnum = TaskPriorityEnum;
  project: any;
  projectTasks: Array<any>;
  projectSprints: Array<any>;
  activeSprint: any;
  collaborators: Array<any> = [];
  errCreateSprint: boolean = false;
  createSprintRequiredErr: boolean = false;
  taskToUpdate: any;
  taskToDelete: any;
  taskToAffect: any;
  selectedPriority: any;
  keysTaskPriority = [];
  selectedCollaborator: any;
  selectedSprint: any;
  showToast: boolean = false;
  constructor(
    private projectService: ProjectService,
    private modalSprint: NgbModal,
    private collaboratorService: CollaboratorService
  ) {}
  form: WindForm = new WindForm([
    new WindFormElement(
      "costEstimationMargin",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "costEstimationMargin"
    ),
    new WindFormElement(
      "costEstimationValue",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "costEstimationValue"
    ),
    new WindFormElement(
      "hrEstimationMargin",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "hrEstimationMargin"
    ),
    new WindFormElement(
      "hrEstimationValue",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "hrEstimationValue"
    ),
    new WindFormElement(
      "timeEstimationMargin",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "timeEstimationMargin"
    ),
    new WindFormElement(
      "timeEstimationValue",
      "",
      "text",
      [Validators.required, Validators.min(4)],
      "timeEstimationValue"
    ),
  ]);

  showAddInput: boolean = false;
  taskForm: TaskRequestForm = new TaskRequestForm(
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: "", dirty: false, class: "", error: "" },
    { value: [], dirty: false, class: "", error: "" },
    true
  );

  showAddSprint: boolean = false;
  sprintForm: SprintRequestForm = new SprintRequestForm(
    { value: "", dirty: false, class: "", error: "" },
    { value: false, dirty: false, class: "", error: "" },
    { value: null, dirty: false, class: "", error: "" },
    { value: null, dirty: false, class: "", error: "" },
    { value: {}, dirty: false, class: "", error: "" },
    { value: [], dirty: false, class: "", error: "" },
    true
  );

  todo = ["Get to work", "Pick up groceries", "Go home", "Fall asleep"];

  inprogress = [];

  done = ["Get up", "Brush teeth", "Take a shower", "Check e-mail", "Walk dog"];

  ngOnInit(): void {
    // this.project = ProjectService.oneProjectResult;
    this.project = {
      code: "P2",
      costEstimationMargin: 2,
      costEstimationValue: 15,
      dateStart: "2021-09-29 08:29",
      description: "string",
      hrEstimationMargin: 2,
      hrEstimationValue: 6,
      meetings: [
        {
          dateMeeting: "2021-09-29T08:29:36.842Z",
          description: "string",
          url: "string",
          uuid: "string",
        },
      ],
      name: "projet number 2",
      sprints: [
        {
          active: false,
          name: "PN2-1",
          dateStart: "2021-09-09 08:29",
          dateEnd: "2021-10-09 08:29",
          tasksOfSprint: [
            {
              COLLABORATOR: "sana",
              PRIORITY: "MEDIUM",
              STATUS: "TODO",
              commentTasks: [
                {
                  author: "string",
                  text: "string",
                  uuid: "string",
                },
              ],
              description: "description task 2",
              estimation: 0,
              name: "name task 2",
              type: "type task 2",
              uuid: "2",
            },
          ],
          uuid: "12",
        },
        {
          active: false,
          name: "PN2-2",
          dateStart: "2021-10-09 08:29",
          dateEnd: "2021-10-29 08:29",
          tasksOfSprint: [],
          uuid: "13",
        },
        {
          name: "PN2-3",
          active: false,
          dateStart: "2021-11-09 08:29",
          dateEnd: "2021-11-29 08:29",
          tasksOfSprint: [],
          uuid: "14",
        },
        {
          name: "PN2-4",
          active: false,
          dateStart: "2021-12-09 08:29",
          dateEnd: "2021-12-29 08:29",
          tasksOfSprint: [],
          uuid: "15",
        },
      ],
      status: "DRAFT",
      tasks: [
        {
          COLLABORATOR: "sana",
          PRIORITY: "HIGH",
          STATUS: "TODO",
          commentTasks: [
            {
              author: "string",
              text: "string",
              uuid: "string",
            },
          ],
          description: "description task 1",
          estimation: 0,
          name: "name task 1",
          type: "type task 1",
          uuid: "1",
        },
        {
          COLLABORATOR: "sana",
          PRIORITY: "MEDIUM",
          STATUS: "TODO",
          commentTasks: [
            {
              author: "string",
              text: "string",
              uuid: "string",
            },
          ],
          description: "description task 2",
          estimation: 0,
          name: "name task 2",
          type: "type task 2",
          uuid: "2",
        },
        {
          COLLABORATOR: "ghada",
          PRIORITY: "LOW",
          STATUS: "TODO",
          commentTasks: [
            {
              author: "string",
              text: "string",
              uuid: "string",
            },
          ],
          description: "description task 3",
          estimation: 0,
          name: "name task 3",
          type: "type task 3",
          uuid: "3",
        },
      ],
      timeEstimationMargin: 7,
      timeEstimationValue: 90,
      uuid: "2",
    };
    (this.activeSprint = {
      active: false,
      name: "PN2-1",
      dateStart: "2021-09-09 08:29",
      dateEnd: "2021-10-09 08:29",
      tasksOfSprint: [
        {
          COLLABORATOR: "sana",
          PRIORITY: "MEDIUM",
          STATUS: "TODO",
          commentTasks: [
            {
              author: "string",
              text: "string",
              uuid: "string",
            },
          ],
          description: "description task 2",
          estimation: 0,
          name: "name task 2",
          type: "type task 2",
          uuid: "2",
        },
      ],
      uuid: "12",
    }),
      (this.projectTasks = this.project.tasks);
    this.projectSprints = this.project.sprints;
    this.collaborators = [];
    this.collaboratorService.getAllCollaborators().subscribe((response) => {
      response.forEach((elt) => {
        this.collaborators.push({
          name: elt.firstname + " " + elt.lastname,
          uuid: elt.uuid,
        });
      });
    });
    this.keysTaskPriority = Object.keys(this.taskPriorityEnum).filter(
      (k) => !isNaN(Number(k))
    );
  }

  showAddTask() {
    this.showAddInput = true;
  }

  onShowAddSprint(content) {
    //this.showAddSprint = true;
    this.modalSprint.open(content, { size: "m" });
  }

  nameSprint() {
    let sprintName: string = "";
    let parts: Array<string> = [];
    parts = this.project.name.split(" ");
    for (let i = 0; i < parts.length; i++) {
      sprintName += parts[i].charAt(0).toUpperCase();
    }
    sprintName = sprintName + "-" + (this.projectSprints.length + 1);
    return sprintName;
  }

  addNewTask() {
    // ws add new task
    this.projectService.parametersTaskAdd = this.taskForm;
    this.projectService.addTask().subscribe(() => {
      console.log("done");
    });
    this.showAddInput = false;
    this.projectTasks.push({
      COLLABORATOR: "",
      PRIORITY: "LOW",
      STATUS: "TODO",
      commentTasks: [],
      description: "",
      estimation: 0,
      name: this.taskForm.name.value,
      type: "",
      uuid: "uuid",
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  createSprint() {
    if (
      this.sprintForm.dateStart.value === null ||
      this.sprintForm.dateEnd.value === null
    ) {
      this.createSprintRequiredErr = true;
      this.errCreateSprint = false;
    } else {
      // verify that the end date is at least 2 weeks later than the start date
      if (
        moment(this.sprintForm.dateStart.value).add(14, "days") >
        moment(this.sprintForm.dateEnd.value)
      ) {
        this.errCreateSprint = true;
        this.createSprintRequiredErr = false;
      } else {
        // ws add new task
        this.projectService.parametersSprintAdd = this.sprintForm;
        this.projectService.addSprint().subscribe(() => {
          console.log("done");
        });
        this.modalSprint.dismissAll();
        this.showAddSprint = false;
        this.errCreateSprint = false;
        this.createSprintRequiredErr = false;
        this.projectSprints.push({
          name: this.nameSprint(),
          active: false,
          dateStart: this.sprintForm.dateStart.value,
          dateEnd: this.sprintForm.dateEnd.value,
          tasksOfSprint: [],
          uuid: "12",
        });
        this.sprintForm.name.value = "";
        this.sprintForm.dateStart.value = null;
        this.sprintForm.dateEnd.value = null;
      }
    }
  }

  onShowUpdateTask(content, task) {
    this.modalSprint.open(content, { size: "m" });
    this.taskToUpdate = task;
  }

  onShowDeleteTask(content, task) {
    this.modalSprint.open(content, { size: "m" });
    this.taskToDelete = task;
  }

  onShowAffectTask(content, task) {
    this.modalSprint.open(content, { size: "m" });
    this.taskToAffect = task;
  }

  onShowStartSprint(content) {
    this.modalSprint.open(content, { size: "m" });
  }

  getSelectedPriority(e) {
    this.selectedPriority = e.target.value;
    this.taskToUpdate.priority.value =
      this.taskPriorityEnum[this.selectedPriority];
  }

  getSelectedCollaborator(e) {
    this.selectedCollaborator = e.target.value;
  }

  getSelectedSprint(e) {
    this.selectedSprint = e.target.value;
  }

  updateTask() {
    this.modalSprint.dismissAll();
    console.log("updating !!! ", this.taskToUpdate);
    this.projectService.updateTask(this.taskToUpdate);
  }

  deleteTask() {
    this.modalSprint.dismissAll();
    console.log("deleting !!! ");
  }

  affectTask() {
    this.modalSprint.dismissAll();

    console.log("assigning !!!!");
  }

  startSprint() {
    this.modalSprint.dismissAll();
    console.log("starting !!!!", this.selectedSprint);
  }

  completeSprint() {
    this.modalSprint.dismissAll();
    console.log("completing !!!!");
  }

  dropTask(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
