import { NgModule } from '@angular/core';
import { PumpsystemsRoutingModule } from '@features/pumpsystems/routes';
import {
  PumpsystemsOverviewComponent,
  PumpsystemComponent,
} from '@features/pumpsystems/pages';
import {
  PumpsystemCardComponent,
  SlotsTimelineComponent,
  AddSlotFormComponent,
  SlotDataDialogComponent,
} from '@features/pumpsystems/components';
import { CoreModule } from '@shared/core';
import { ErrorModule } from '@shared/error';

@NgModule({
  declarations: [
    PumpsystemsOverviewComponent,
    PumpsystemCardComponent,
    PumpsystemComponent,
    SlotsTimelineComponent,
    AddSlotFormComponent,
    SlotDataDialogComponent,
  ],
  imports: [CoreModule, ErrorModule, PumpsystemsRoutingModule],
})
export class PumpsystemsModule {}
