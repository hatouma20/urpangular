export class SprintRequestForm {
  constructor(
    public name: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public active: {
      value: boolean;
      dirty: boolean;
      class: string;
      error: string;
    },
    public dateEnd: {
      value: Date;
      dirty: boolean;
      class: string;
      error: string;
    },
    public dateStart: {
      value: Date;
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
    public tasksOfSprint: {
      value: Array<any>;
      dirty: boolean;
      class: string;
      error: string;
    },
    public isValid: boolean
  ) {}
}
