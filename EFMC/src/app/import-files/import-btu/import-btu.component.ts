import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';
import { ImportService } from 'src/services/import.services';

@Component({
  selector: 'app-import-btu',
  templateUrl: './import-btu.component.html',
  styleUrls: ['./import-btu.component.css']
})
export class ImportBtuComponent implements OnInit {
  @ViewChild('fileInput') fileInput;

  importBTUForm: FormGroup;
  fileToUpload: File | null = null;

  maxDate: Date;

  constructor(private importService : ImportService) {}

  ngOnInit(): void {
    this.initImportForm();
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

  onSubmit(){

    if(!this.importBTUForm.valid){
      return
    }

    const fileBrowser = this.fileInput.nativeElement;
    const importDate = this.importBTUForm.value.importDate;
    //console.log(fileBrowser.files[0]);

    this.importService.uploadBTU(fileBrowser).subscribe(data => {

    });

  }

}
