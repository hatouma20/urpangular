import {LineModel} from "./line.model";

export class PageModel {
  private _id: number
  private _height: any;
  private _line: LineModel;


  constructor(id: number, height: any,  line: LineModel) {
    this._id = id;
    this._height = height;
    this._line = line;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get height(): any {
    return this._height;
  }

  set height(value: any) {
    this._height = value;
  }

  get line(): LineModel {
    return this._line;
  }

  set line(value: LineModel) {
    this._line = value;
  }


}
