import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { StoreService } from '@core';
import { FieldTemplatesService } from '@core/services/data/field-templates.service';
import { User } from '@model';
import { FieldTemplate } from '@model/fieldTemplate';
import { isNonNull } from '@utilities';
import { filter, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  public displayedColumns: String[] = ['name','irrigationDuration'];
  public dataSource: MatTableDataSource<FieldTemplate>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  profileForm = new FormGroup({
    profileName: new FormControl(''),
    profileEmail: new FormControl(''),
  });
  fieldTemplate = new FormGroup({
    fieldName: new FormControl(''),
    fieldDuration: new FormControl(''),
  })
  

  constructor(public readonly store: StoreService, public readonly fieldTemplateService: FieldTemplatesService) { 
    this.dataSource = new MatTableDataSource<FieldTemplate>();
  }
   ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.store.user$.pipe(filter(user => isNonNull(user)),switchMap((user)=> this.fieldTemplateService.getFields(user)))
    .subscribe((fieldTemplates: FieldTemplate[])=> this.dataSource = new MatTableDataSource<FieldTemplate>(fieldTemplates))
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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

}
