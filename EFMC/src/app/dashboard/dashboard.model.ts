
export class Dashboard {
  public flatOwnersCount: number;
  public totalOutstandingPayments: number;
  public lastMonthTotBills: number;
  public lastMonthTotalRevenue: number;
  public topFiveOP: TopFiveOutstandings[];
}

export class TopFiveOutstandings {
  public name: string;
  public flatNo: string;
  public amount: number;
}

export interface BarChartData{
  type: string;
  name: string;
  data: [];
}
