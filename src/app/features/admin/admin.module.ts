import { NgModule } from '@angular/core';

import { AdminRoutingModule } from '@features/admin/routes';
import {
  OverviewComponent,
  PumpsystemsComponent,
  UsersComponent,
} from '@features/admin/pages';
import { CoreModule } from '@shared/core';

@NgModule({
  declarations: [OverviewComponent, UsersComponent, PumpsystemsComponent],
  imports: [CoreModule, AdminRoutingModule],
})
export class AdminModule {}
