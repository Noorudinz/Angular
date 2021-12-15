

export class FlatOwners {
  public flatId: number;
  public flatNo: string;
  public buildingId: number;
  public floorNo: number;
  public area: number;
  public possesionDate: Date;
  public bedRooms: string;
  public carParks: number;
  public familyName: string;
  public firstName: string;
  public mobileNumber: string;
  public telNumber: string;
  public email1: string;
  public email2: string;
  public address: string;
  public carNo: string;
  public carParkNos : string;
  public isdel: boolean;
}


export interface FlatList {
  flatNo: string;
  buildingType: string;
  firstName: string;
  mobileNumber: string;
  possesionDate: Date;
}
