export class VirementResult {
  constructor( public compteorigin: string,
               public comptedestinataire: string,
               public datevirement: string,
               public description: string,
               public montant: string,
               public uuid: string,
               public isValid: boolean) {
  }
}

