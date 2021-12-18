import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ImportService } from 'src/services/import.services';
import * as Alert from '../../toster/alert';
import { BTU } from '../import-files.model';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { takeLast } from 'rxjs/operators';
import * as XLSX from 'xlsx';
type AOA = any[][];

@Component({
  selector: 'app-import-btu',
  templateUrl: './import-btu.component.html',
  styleUrls: ['./import-btu.component.css']
})
export class ImportBtuComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  importBTUForm: FormGroup;
  fileToUpload: File | null = null;

  maxDate: Date;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  private userSub: Subscription;
  private closeSub: Subscription;
  btuList: BTU[] = [];
  isLoading = false;

  data: AOA = [[1, 2], [3, 4]];

  constructor(private importService : ImportService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.initImportForm();
    this.initDataTable();
  }


  private initImportForm(){
    let importDate = null;

    this.importBTUForm = new FormGroup({
      'importDate': new FormControl(importDate, [Validators.required]),
      'importFile': new FormControl('', [Validators.required])
    });
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());

  }

  private initDataTable(){

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy: true,
    };

    this.loadBTUData();

    this.isLoading = false;
  }

  private loadBTUData(){
    this.userSub = this.importService.getBTUList().subscribe(data => {
      if(data !== null){
        this.btuList = data;
        this.dtTrigger.next();
      }
    });
  }

  addfile(event: any)
  {
    const target: DataTransfer = <DataTransfer>(event.target);
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      const header = this.data.shift().map(v => v.toLowerCase());

      if(!((header.includes("flatno"))
       && (header.includes("meterid"))
       && (header.includes("reading"))) ){
       Alert.tosterAlert('Invalid file or header column names mis matched','error');
       this.fileInput.nativeElement.value = "";
       return;
       }

    };
    reader.readAsBinaryString(target.files[0]);
  }



  onSubmit(){

    if(!this.importBTUForm.valid){
      return
    }

    const fileBrowser = this.fileInput.nativeElement;
    const importDate = this.importBTUForm.value.importDate;

    if (fileBrowser.files.length !== 1) {
      Alert.tosterAlert('Mutilple or zero files are not allowed', 'error');
      return;
    }

    try {
      this.isLoading = true;

      this.closeSub = this.importService.uploadBTU(fileBrowser)
      .pipe(takeLast(1))
      .subscribe((data: HttpResponse<any>) => {
        console.log(data);
       if(data.body?.isUpdated){
        Alert.tosterAlert(data.body?.message, 'success');
       } else {
        Alert.tosterAlert(data.body?.message, 'error');
       }
       this.initDataTable();
       window.location.reload();
      },
      (err: HttpErrorResponse)=>{ console.log(err.message) });
    }
    catch(error){
      console.log(error);
    }

  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }
    if(this.userSub){
      this.userSub.unsubscribe();
    }
  }

}
