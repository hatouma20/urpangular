import {ModuleModel} from './module.mode';

export class SubModuleModel {
  constructor(
    public module: ModuleModel,
    public name: { value: string, dirty: boolean, class: string, error: string },
    public uuid: { value: string, dirty: boolean, class: string, error: string },
  ) {
  }
}
