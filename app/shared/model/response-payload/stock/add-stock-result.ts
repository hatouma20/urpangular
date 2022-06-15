import {StockAttributeForm} from '../../request-payload/stock/stock-attribut-form';
import {DepotForm} from "../depot/depot-form";
export class AddstockResult {
  constructor(
    public accounting_Code_Export_Sale: { value: string; dirty: boolean; error: string; class: string },
    public accounting_Code_Purchase: { dirty: boolean; error: string; value: string; class: string },
    public accounting_Code_Purchase_Import: { dirty: boolean; error: string; value: string; class: string },
    public accounting_Code_Sale: { dirty: boolean; error: string; value: string; class: string },

    public barcode_Type: { dirty: boolean; error: string; value: string; class: string },
    public barcode_Value: { dirty: boolean; error: string; value: string; class: string },

    public description: { dirty: boolean; error: string; value: string; class: string },
    public douaniere: { dirty: boolean; error: string; value: string; class: string },
    public fix_Sale_Price: { dirty: boolean; error: string; value: boolean; class: string },
    public gain_Margin: { dirty: boolean; error: string; value: number; class: string },
    public height: { dirty: boolean; error: string; value: number; class: string },
    public id_product: { dirty: boolean; error: string; value: number; class: string },

    public photo: { dirty: boolean; error: string; value: string; class: string },
    public label: { dirty: boolean; error: string; value: string; class: string },
    public length: { dirty: boolean; error: string; value: number; class: string },
    public length_Unit: { dirty: boolean; error: string; value: string; class: string },
    public lots_Series: { dirty: boolean; error: string; value: string; class: string },
    public min_Stock: { dirty: boolean; error: string; value: number; class: string },
    public name: { dirty: boolean; error: string; value: string; class: string },
    public nature_of_Product: { dirty: boolean; error: string; value: string; class: string },
    public note: { dirty: boolean; error: string; value: string; class: string },
    public origin_Country: { dirty: boolean; error: string; value: string; class: string },

    public uuid: { dirty: boolean; error: string; value: string; class: string },

    public ref: { dirty: boolean; error: string; value: string; class: string },
    public selling_Price: { dirty: boolean; error: string; value: number; class: string },
    public selling_Price_Min: { dirty: boolean; error: string; value: number; class: string },
    public selling_Type: { dirty: boolean; error: string; value: string; class: string },
    public state_Purchase: { dirty: boolean; error: string; value: string; class: string },
    public state_Sale: { dirty: boolean; error: string; value: string; class: string },
    public stock: { dirty: boolean; error: string; value: number; class: string },
    public supplier: { dirty: boolean; error: string; value: string; class: string },
    public surface: { dirty: boolean; error: string; value: number; class: string },
    public surface_Unit: { dirty: boolean; error: string; value: string; class: string },
    public tva: { dirty: boolean; error: string; value: string; class: string },
    public volume: { dirty: boolean; error: string; value: number; class: string },
    public volume_Unit: { dirty: boolean; error: string; value: string; class: string },

    public weight: { dirty: boolean; error: string; value: number; class: string },
    public weight_Unit: { dirty: boolean; error: string; value: string; class: string },

    public depot: any = [],
    public buying_Price: { dirty: boolean; error: string; value: number; class: string },
    public width: { dirty: boolean; error: string; value: number; class: string },

  ) {
  }
}
