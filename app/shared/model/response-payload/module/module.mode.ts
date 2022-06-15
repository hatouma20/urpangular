import {SubModuleModel} from './submodule.model';

export class ModuleModel {
  constructor(
    public name: { value: string, dirty: boolean, class: string, error: string },
    public service_id: { value: string, dirty: boolean, class: string, error: string },
    public sub_modules: Array<SubModuleModel>,
    public uuid: { value: string, dirty: boolean, class: string, error: string },
  ) {
  }
}
