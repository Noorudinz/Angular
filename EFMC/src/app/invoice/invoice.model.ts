export interface Bills {
  billNo:  number;
	flatNo:  number;
	cycle_from:  Date;
	cycle_to:  number;
	bTU_amount:  number;
	electricity_amount:  number;
	water_amount:  number;
	service_charge:  number;
	other_charge:  number;
	current_bill:  number;
	previous_arrear:  number;
	amount:  number;
	paid:  number;
	created_date: Date;
	due_date:  Date;
	elec_current:  number;
	elec_prev:  number;
	elec_consum:  number;
	btu_current:  number;
	btu_prev:  number;
	btu_consum:  number;
	water_current:  number;
	water_prev:  number;
	water_consum:  number;
	firstName:  string;
	floorNo:  number;
	buildingName:  string;
	mobileNumber:  string;
	email1:  string;
	address:  string;
	faxNumber: string;

}
