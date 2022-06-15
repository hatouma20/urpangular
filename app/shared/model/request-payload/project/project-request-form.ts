export class ProjectRequestForm {
  constructor(
    public name: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public code: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public startDate: {
      value: Date;
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
    public costEstimationMargin: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public costEstimationValue: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public hrEstimationMargin: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public hrEstimationValue: {
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
    public timeEstimationMargin: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public timeEstimationValue: {
      value: string;
      dirty: boolean;
      class: string;
      error: string;
    },
    public isValid: boolean
  ) {}
}
