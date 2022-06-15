import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { ProjectService } from "src/app/shared/services/back-end/project/project.service";

@Component({
  selector: "wind-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.scss"],
})
export class ProjectListComponent implements OnInit {
  constructor(private projectService: ProjectService, private router: Router) {}
  dtOptions: DataTables.Settings = {};
  projectList: Array<any> = [];
  dtTrigger: Subject<any> = new Subject<any>();
  compteListcount = 0;
  condition = true;
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 10,
    };
    this.projectList = [
      {
        code: "P1",
        costEstimationMargin: 0,
        costEstimationValue: 0,
        dateStart: "2021-09-29 08:29",
        description: "string",
        hrEstimationMargin: 3,
        hrEstimationValue: 3,
        name: "projet number 1",
        status: "DRAFT",
        timeEstimationMargin: 15,
        timeEstimationValue: 15,
        uuid: "1",
      },
      {
        code: "P2",
        costEstimationMargin: 0,
        costEstimationValue: 0,
        dateStart: "2021-09-29 08:29",
        description: "string",
        hrEstimationMargin: 0,
        hrEstimationValue: 0,
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
            active: true,
            dateEnd: "2021-09-29T08:29:36.842Z",
            dateStart: "2021-09-29T08:29:36.842Z",
            tasksOfSprint: [
              {
                COLLABORATOR: "string",
                PRIORITY: "HIGH",
                STATUS: "TODO",
                commentTasks: [
                  {
                    author: "string",
                    text: "string",
                    uuid: "string",
                  },
                ],
                description: "string",
                estimation: 0,
                name: "string",
                type: "string",
                uuid: "string",
              },
            ],
            uuid: "string",
          },
        ],
        status: "DRAFT",
        tasks: [
          {
            COLLABORATOR: "string",
            PRIORITY: "HIGH",
            STATUS: "TODO",
            commentTasks: [
              {
                author: "string",
                text: "string",
                uuid: "string",
              },
            ],
            description: "string",
            estimation: 0,
            name: "string",
            type: "string",
            uuid: "string",
          },
        ],
        timeEstimationMargin: 0,
        timeEstimationValue: 0,
        uuid: "2",
      },
    ];
    // this.projectService.getAllProjects().subscribe(() => {
    //   this.projectList = this.projectService.ProjectResultList;
    //   });
    this.compteListcount === 1;
    this.dtTrigger.next();
  }

  add() {
    this.router.navigateByUrl("/dashboard/project/project");
  }
  getProjetById(uuid) {
    // this.projectService.getProjectByID(uuid).subscribe((project) => {
    //   this.router.navigateByUrl("/dashboard/project/project/details");
    //   return project;
    // });
    this.router.navigateByUrl("/dashboard/project/project/details");
  }
}
