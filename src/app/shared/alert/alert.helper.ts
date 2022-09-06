import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable()
export class AlertHelper {

  constructor(private snackBar: MatSnackBar) {
  }

  showToaster(msg: string) {
    this.snackBar.open(msg, '', {
      duration: 3000,
    });
  }
}
