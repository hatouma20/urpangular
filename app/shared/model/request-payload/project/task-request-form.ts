export class TaskRequestForm {
  constructor(
    public collaborator: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public priority: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public status: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public description: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public estimation: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public name: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public type: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public project: {
      value: any;
      dirty: boolean;
      class: string;
      error: string;
    },
    public sprint: {
      value: any;
      dirty: boolean;
      class: string;
      error: string;
    },
    public commentTasks: {
      value: Array<any>;
      dirty: boolean;
      class: string;
      error: string;
    },
    public isValid: boolean
  ) {}
}
