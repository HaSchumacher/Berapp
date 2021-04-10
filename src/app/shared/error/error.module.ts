import { NgModule } from '@angular/core';
import { CoreModule } from '@shared/core';
import { ErrorComponent } from './error.component';

@NgModule({
  declarations: [ErrorComponent],
  imports: [CoreModule],
})
export class ErrorModule {}
