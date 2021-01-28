import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { UserSelectRoleComponent } from './user-select-role';
import { UserTableComponent } from './user-table';

@NgModule({
  declarations: [UserSelectRoleComponent, UserTableComponent],
  imports: [CoreModule],
  exports: [UserTableComponent],
})
export class UserModule {}
