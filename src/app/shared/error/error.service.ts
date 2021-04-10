import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ErrorComponent } from './error.component';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private readonly dialog: MatDialog) {}

  showErrorDialog(error: Error): Observable<void> {
    return this.dialog
      .open(ErrorComponent, { data: error })
      .afterClosed()
      .pipe(mapTo(null));
  }
}
