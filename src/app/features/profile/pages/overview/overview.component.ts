import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTab, MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@core';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';
import { User } from '@model';
import { FieldTemplate } from '@model/fieldTemplate';
import { isNonNull } from '@utilities';
import { Observable, of, Subscription, } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit, OnDestroy{
  public fields: FieldTemplate[];
  public displayedColumns: String[] = ['name','irrigationDuration'];
  public dataSource: MatTableDataSource<FieldTemplate>
  private mySubscryption: Subscription;
  @ViewChild(MatTab) tab: MatTabsModule;
  @ViewChild(MatSort) sort: MatSort;
  

  profileForm = new FormGroup({
    profileName: new FormControl(''),
    profileEmail: new FormControl(''),
  });
  fieldTemplate = new FormGroup({
    fieldName: new FormControl(''),
    fieldDuration: new FormControl(''),
  })
  
  constructor(public readonly store:StoreService, public readonly fieldTemplateService: FieldTemplatesService, public route:ActivatedRoute ) { 
    this.fields = new Array<FieldTemplate>();

  }
  ngOnDestroy(): void {
    this.mySubscryption.unsubscribe();
  }
    
   ngOnInit(): void {
    this.dataSource = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.getFieldsfromUser();
    
  }
  getFieldsfromUser() : void {
    this.mySubscryption = this.store.user$.pipe(
      filter(user => isNonNull(user)),
      switchMap((user)=> this.fieldTemplateService.getFields(user))
      ).subscribe((fieldTemplates: FieldTemplate[])=> {        
          this.fields = fieldTemplates;
          this.dataSource = new MatTableDataSource<FieldTemplate>(fieldTemplates);
      })
  }

  applyFilter() {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  public addField(of:User){
    if(this.fieldTemplate.valid){
      const _currentField: FieldTemplate = {
        name: this.fieldTemplate.value.fieldName,
        irrigationDuration: this.fieldTemplate.value.fieldDuration,
        fieldRegion: 1,
      }
      this.fieldTemplateService.addTemplate(_currentField,of);
    }
  }
  public updateUserData(){
    console.log(" TODO updateUser");
    console.log(this.profileForm.value.profileName);
    console.log(this.profileForm.value.profileEmail);
  }


}
