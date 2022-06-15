import {CollaboratorBankAccount} from './collaborator-Bank-Account';
import {ContratModel} from './contrat/contrat-model';
import {DepatementModel} from './contrat/depatement-model';
import {TeamModel} from "./teams/team";

export class CollaboratorModel {
  constructor(
    public address: { value: string, dirty: boolean, class: string, error: string },
    public city: { value: string, dirty: boolean, class: string, error: string },
    public id: { value: number, dirty: boolean, class: string, error: string },
    // public contracts: ContratModel[],
    public country: { value: string, dirty: boolean, class: string, error: string },
    public dateOfBirth: { value: Date, dirty: boolean, class: string, error: string },
    // public departement: DepatementModel,
    public faxNumber: { value: string, dirty: boolean, class: string, error: string },
    public firstname: { value: string, dirty: boolean, class: string, error: string },
    public idCardNumber: { value: string, dirty: boolean, class: string, error: string },
    public lastname: { value: string, dirty: boolean, class: string, error: string },
    public maidenName: { value: string, dirty: boolean, class: string, error: string },
    public matricule: { value: string, dirty: boolean, class: string, error: string },
    public mobileNumber: { value: string, dirty: boolean, class: string, error: string },
    public passportId: { value: string, dirty: boolean, class: string, error: string },
    public personalEmail: { value: string, dirty: boolean, class: string, error: string },
    public personalPicture: { value: string, dirty: boolean, class: string, error: string },
    public phoneNumber: { value: string, dirty: boolean, class: string, error: string },
    public postalCode: { value: string, dirty: boolean, class: string, error: string },
    public proEmail: { value: string, dirty: boolean, class: string, error: string },
    public salutation: { value: string, dirty: boolean, class: string, error: string },
    public socialSecurityNumber: { value: number, dirty: boolean, class: string, error: string },
    public state: { value: string, dirty: boolean, class: string, error: string },
    public status: { value: string, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
    public nationality: { value: string, dirty: boolean, class: string, error: string },
    public leavingreason: { value: string, dirty: boolean, class: string, error: string },
    public hearing_reason: { value: string, dirty: boolean, class: string, error: string },
    public isDeleted: { value: boolean, dirty: boolean, class: string, error: string },
    public created: { value: Date, dirty: boolean, class: string, error: string },
    public collaboratorBankAccount: CollaboratorBankAccount,
    public isValid: boolean,

    public civilState: { value: string, dirty: boolean, class: string, error: string },
    public dateOfCin: { value: string, dirty: boolean, class: string, error: string },
    public attachementCinBack: { value: string, dirty: boolean, class: string, error: string },
    public attachementCinFront: { value: string, dirty: boolean, class: string, error: string },
    // public team: { value: string, dirty: boolean, class: string, error: string }
    public team: TeamModel,
    public teamBoss: { value: boolean, dirty: boolean, class: string, error: string },
    ) {
  }
}

