import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs/index";
import { catchError, map, timeout } from "rxjs/internal/operators";
import { SKIP_AUTH_INTERCEPTOR_HEADER } from "../../../constants/header";

import { ProjectResult } from "src/app/shared/model/response-payload/project/project-result";
import { TaskResult } from "src/app/shared/model/response-payload/project/task-result";

import { ProjectRequestForm } from "../../../model/request-payload/project/project-request-form";
import { TaskRequestForm } from "src/app/shared/model/request-payload/project/task-request-form";
import { SprintRequestForm } from "src/app/shared/model/request-payload/project/sprint-request-form";

@Injectable({
  providedIn: "root",
})
export class ProjectService {
  constructor(private http: HttpClient) {}
  parametersAdd: ProjectRequestForm;
  parametersTaskAdd: TaskRequestForm;
  parametersSprintAdd: SprintRequestForm;
  oneProjectResult: ProjectResult;
  ProjectTasksResult: Array<TaskResult>;
  ProjectResultList: Array<ProjectResult>;
  addResult: BehaviorSubject<string> = new BehaviorSubject(null);
  addTaskResult: BehaviorSubject<string> = new BehaviorSubject(null);
  addSprintResult: BehaviorSubject<string> = new BehaviorSubject(null);
  baseUrl = "http://ns3012518.ip-149-202-74.eu:8762/wind-project-mgm/";

  public adaptSearchResult(data: any): any {}

  add() {
    const payload = {
      name: this.parametersAdd.name.value,
      code: this.parametersAdd.code.value,
      description: this.parametersAdd.description.value,
      dateStart: this.parametersAdd.startDate.value,
      hrEstimationMargin: this.parametersAdd.hrEstimationMargin.value,
      hrEstimationValue: this.parametersAdd.hrEstimationValue.value,
      costEstimationMargin: this.parametersAdd.costEstimationMargin.value,
      costEstimationValue: this.parametersAdd.costEstimationValue.value,
      timeEstimationMargin: this.parametersAdd.timeEstimationMargin.value,
      timeEstimationValue: this.parametersAdd.timeEstimationValue.value,
      status: this.parametersAdd.status.value,
      meetings: [],
      sprints: [],
      tasks: [],
    };
    return this.http
      .post(`${this.baseUrl}` + "projects", payload, {
        headers: new HttpHeaders().set(
          SKIP_AUTH_INTERCEPTOR_HEADER.name,
          SKIP_AUTH_INTERCEPTOR_HEADER.value
        ),
      })
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          return this.addResult.next(this.adaptSearchResult(response));
        })
      );
  }

  getProjectByID(uuid: string): Observable<any> {
    return this.http
      .get<ProjectResult>(`${this.baseUrl}` + "projects" + `/${uuid}`)
      .pipe(
        map((response) => {
          return (this.oneProjectResult = response);
        })
      );
  }

  addTask() {
    const payload = {
      collaborator: "",
      priority: "",
      status: "TODO",
      commentTasks: [],
      description: "",
      estimation: "0",
      name: this.parametersTaskAdd.name.value,
      project: this.oneProjectResult,
      sprint: null,
      type: "",
    };
    return this.http
      .post(`${this.baseUrl}` + "tasks", payload, {
        headers: new HttpHeaders().set(
          SKIP_AUTH_INTERCEPTOR_HEADER.name,
          SKIP_AUTH_INTERCEPTOR_HEADER.value
        ),
      })
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          return this.addTaskResult.next(this.adaptSearchResult(response));
        })
      );
  }

  addSprint() {
    const payload = {
      active: this.parametersSprintAdd.active.value,
      dateEnd: this.parametersSprintAdd.dateEnd.value,
      dateStart: this.parametersSprintAdd.dateStart.value,
      project: this.oneProjectResult,
      tasksOfSprint: [],
    };
    return this.http
      .post(`${this.baseUrl}` + "sprints", payload, {
        headers: new HttpHeaders().set(
          SKIP_AUTH_INTERCEPTOR_HEADER.name,
          SKIP_AUTH_INTERCEPTOR_HEADER.value
        ),
      })
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          return this.addSprintResult.next(this.adaptSearchResult(response));
        })
      );
  }

  getAllProjects(): Observable<any> {
    return this.http.get<Array<ProjectResult>>(`${this.baseUrl}/projects`).pipe(
      map((response) => {
        return (this.ProjectResultList = response);
      })
    );
  }
  getProjectTasks(projectId: string): Observable<any> {
    return this.http
      .get<Array<TaskResult>>(
        `${this.baseUrl}` + "tasks/project" + `/${projectId}`
      )
      .pipe(
        map((response) => {
          return (this.ProjectTasksResult = response);
        })
      );
  }

  assignTaskToCollaborator(projectUuid: any, selectedCollaborator: any) {
    return this.http
      .put(
        `${this.baseUrl}` + `tasks/${projectUuid}/assign-to-user`,
        selectedCollaborator,
        {
          headers: new HttpHeaders().set(
            SKIP_AUTH_INTERCEPTOR_HEADER.name,
            SKIP_AUTH_INTERCEPTOR_HEADER.value
          ),
        }
      )
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          return response;
        })
      );
  }

  updateTask(updatedTask: any) {
    console.log("make it to here");
    return this.http
      .put(`${this.baseUrl}` + `tasks`, updatedTask, {
        headers: new HttpHeaders().set(
          SKIP_AUTH_INTERCEPTOR_HEADER.name,
          SKIP_AUTH_INTERCEPTOR_HEADER.value
        ),
      })
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          console.log(e);
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          console.log(response);
          return response;
        })
      );
  }

  deleteTask(uuid: any) {
    return this.http
      .delete(`${this.baseUrl}/tasks/${uuid}`, {
        headers: new HttpHeaders().set(
          SKIP_AUTH_INTERCEPTOR_HEADER.name,
          SKIP_AUTH_INTERCEPTOR_HEADER.value
        ),
      })
      .pipe(
        timeout(60000),
        catchError((e, c) => {
          return []; // only for catch error to work, it requires a return of array, object..
        }),
        map((response: any) => {
          return response;
        })
      );
  }
}
