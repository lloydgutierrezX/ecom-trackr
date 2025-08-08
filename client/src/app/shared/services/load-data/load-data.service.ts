import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class LoadDataService {

  private reload$ = new Subject<void>();

  trigger(): void {
    this.reload$.next();
  }

  onReload = () => this.reload$.asObservable();
}
