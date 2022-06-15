export class TaskResult {
    constructor(
      public uuid: string,
      public code: string,
      public name: string,
      public dateStart: string,
      public description: string,
      public status: string,
      public costEstimationMargin: string,
      public costEstimationValue: string,
      public hrEstimationMargin: string,
      public hrEstimationValue: string,
      public timeEstimationMargin: string,
      public timeEstimationValue	: string,
      public meetings: Array<any>,
      public sprints: Array<any>,
      public tasks: Array<any>,
      public isValid: boolean
    ) {}
  }
  