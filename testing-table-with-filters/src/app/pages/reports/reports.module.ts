import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { ReportsRoutingModule } from './reports-routing.module';
import { FiltersComponent } from './components/filters/filters.component';
import { CheckboxModule } from 'src/app/shared/components/checkbox/checkbox.module';
import { FormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [ReportsComponent, FiltersComponent, TableComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    FormsModule,
    AgGridModule,
    CheckboxModule,
  ],
})
export class ReportsModule {}
