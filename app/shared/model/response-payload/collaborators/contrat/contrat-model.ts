import {CollaboratorModel} from '../collaborator-model';
import {ContractDocument} from './contract-document';
import {ContractDurationDto} from './contract-DurationDto';
import {ContractTypeDto} from './contract-TypeDto';
import {HiringReasonDto} from './hiring-ReasonDto';
import {LeavingJobReasonDto} from './leaving-Job-ReasonDto';
import {SalaryDto} from './salaryDto';
import {TrialPeriodDto} from './trial-Period-Dto';

export class ContratModel {
  constructor(
    public collaborator: CollaboratorModel,
    public contractDocument: ContractDocument,
    public contractStatus: { value: string, dirty: boolean, class: string, error: string },
    // public contractDuration: ContractDurationDto,
    public duration: { value: string, dirty: boolean, class: string, error: string },
    public unit_duration: { value: string, dirty: boolean, class: string, error: string },
    public contractType: ContractTypeDto,
    public hiringDate: { value: Date, dirty: boolean, class: string, error: string },
    public hiringReason: HiringReasonDto,
    public id: number,
    public leavingJobReason: LeavingJobReasonDto,
    public ref: { value: string, dirty: boolean, class: string, error: string },
    public salary: SalaryDto,
    public trialPeriod: TrialPeriodDto,
    public weeklySchedule: { value: number, dirty: boolean, class: string, error: string },
    public title: { value: string, dirty: boolean, class: string, error: string },
    public isValid: boolean
  ) {
  }
}
