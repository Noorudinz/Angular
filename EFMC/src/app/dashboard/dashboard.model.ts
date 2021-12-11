
export class Dashboard {
  public flatOwnersCount: number;
  public totalOutstandingPayments: number;
  public topFiveOP: TopFiveOutstandings[];
}

export class TopFiveOutstandings {
  public name: string;
  public flatNo: string;
  public amount: number;
}
