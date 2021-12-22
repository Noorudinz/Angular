

export interface Payments {
  receiptNo:  number;
	billNo:  number;
	flatNo:  string;
	paymentMode:  string;
	chequeNo:  string;
	chequeDate:  string;
	bank:  string;
	amountReceived :  number;
	receivedBy:  string;
	narration:  string;
	createdDate:  Date;
}

export interface Summary {
  accontNo: number;
  flatNo: string;
  narration: string;
  transtype: number;
  charge: number;
  receipts: number;
  amount: number;
  created_date: Date;
  charge_id: number;
  receipt_id: number;
}
