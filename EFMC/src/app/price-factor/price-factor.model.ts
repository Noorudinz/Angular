
export class PriceFactor {
  public priceID: number;
  public btuFactor: number;
  public electricityFactor: number;
  public waterFactor: number;
  public serviceCharge: number;
  public otherCharges: number;
  public created_date: Date;
  public updated_date: Date;
}

export interface PriceFactorData {
  priceID: number;
  btuFactor: number;
  electricityFactor: number;
  waterFactor: number;
  serviceCharge: number;
  otherCharges: number;
  created_date: Date;
  updated_date: Date;
}
