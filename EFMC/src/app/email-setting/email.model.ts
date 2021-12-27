
export class Email {
  public id: number;
  public emailAddress: string;
  public password: string;
  public host: string;
  public port: string;
  public cc: string;
  public updated_Date: Date;
}

export interface EmailData {
  id: number;
  emailAddress: string;
  password: string;
  host: string;
  port: string;
  cc: string;
  updated_Date: Date;
}
