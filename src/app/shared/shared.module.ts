import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { AuthModule } from '@shared/auth';
import { ErrorModule } from '@shared/error';
import { UserModule } from '@shared/user';

@NgModule({
  exports: [CoreModule, AuthModule, ErrorModule, UserModule],
})
export class SharedModule {}
