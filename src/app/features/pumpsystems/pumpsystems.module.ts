import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import { PumpsystemsOverviewComponent } from '@features/pumpsystems/pages';

@NgModule({
  declarations: [PumpsystemsOverviewComponent],
  imports: [CommonModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
