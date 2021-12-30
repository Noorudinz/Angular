export class Building {
  public buildingId?: number;
  public buildingName?: string;
  public buildingIncharge?: string;
  public buildingCode?: string;
  public floors?: number;
  public erf?: number;
  public arf?: number;
  public wrf?: number;
  public remarks?: string;
  public created_ByUserId?: string;
  public updated_ByUserId?: string;
}

  // constructor(
  //   buildingId?: number,
  //   buildingName?: string,
  //   buildingIncharge?: string,
  //   buildingCode?: string,
  //   floors?: number,
  //   erf?: number,
  //   wrf?: number,
  //   arf?: number,
  //   remarks?: string,
  //   created_ByUserId?: string,
  //   updated_ByUserId?: string
  // ) {
  //   this.buildingId = buildingId || 0;
  //   this.buildingName = buildingName || '';
  //   this.buildingIncharge = buildingIncharge || '';
  //   this.buildingCode = buildingCode || '';
  //   this.floors = floors || 0;
  //   this.erf = erf || 0;
  //   this.wrf = wrf || 0;
  //   this.arf = arf || 0;
  //   this.remarks = remarks || '';
  //   this.created_ByUserId = created_ByUserId || '';
  //   this.updated_ByUserId = updated_ByUserId || '';
  // }



  export class BuildingStore {
    public buildingId?: number;
    public buildingName?: string;
    public buildingIncharge?: string;
    public buildingCode?: string;
    public floors?: number;
    public erf?: number;
    public arf?: number;
    public wrf?: number;
    public remarks?: string;
    public created_ByUserId?: string;
    public updated_ByUserId?: string;

  constructor(
    buildingId?: number,
    buildingName?: string,
    buildingIncharge?: string,
    buildingCode?: string,
    floors?: number,
    erf?: number,
    wrf?: number,
    arf?: number,
    remarks?: string,
    created_ByUserId?: string,
    updated_ByUserId?: string
    ) {
      this.buildingId = buildingId || 0;
      this.buildingName = buildingName || '';
      this.buildingIncharge = buildingIncharge || '';
      this.buildingCode = buildingCode || '';
      this.floors = floors || 0;
      this.erf = erf || 0;
      this.wrf = wrf || 0;
      this.arf = arf || 0;
      this.remarks = remarks || '';
      this.created_ByUserId = created_ByUserId || '';
      this.updated_ByUserId = updated_ByUserId || '';
    }
  }
