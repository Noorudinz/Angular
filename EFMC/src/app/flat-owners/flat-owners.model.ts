

export class FlatOwners {
  public flatId: number;
  public buildingId: number;
  public flatNo: string;
  public area: number;
  public possesionDate: Date;
  public bedRooms: string;
  public familyName: string;
  public firstName: string;
  public mobileNumber: string;
  public telNumber: string;
  public email1: string;
  public email2: string;
  public address: string;
  public carNo: string;
  public carParkNos : string;
  public isdel: string;
}


export interface FlatList {
  flatNo: number;
  buildingType: string;
  firstName: string;
  mobileNumber: string;
  possesionDate: Date;
}
