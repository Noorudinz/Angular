

export class FlatOwners {
  public flatId?: number;
  public flatNo?: string;
  public buildingId?: number;
  public buildingType?: string;
  public floorNo?: number;
  public area?: number;
  public possesionDate?: Date;
  public bedRooms?: string;
  public carParks?: number;
  public familyName?: string;
  public firstName?: string;
  public mobileNumber?: string;
  public telNumber?: string;
  public email1?: string;
  public email2?: string;
  public address?: string;
  public carNo?: string;
  public carParkNos?: string;
  public isdel?: boolean;

}


export interface FlatList {
  flatId: number;
  flatNo: string;
  buildingId: number;
  buildingType: string;
  floorNo: number;
  area: number;
  possesionDate: Date;
  bedRooms: string;
  carParks: number;
  familyName: string;
  firstName: string;
  mobileNumber: string;
  telNumber: string;
  email1: string;
  email2: string;
  address: string;
  carNo: string;
  carParkNos : string;
  isdel: boolean;
}
