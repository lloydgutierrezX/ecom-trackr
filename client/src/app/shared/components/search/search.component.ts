import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnDestroy {
  @Input() placeholder = 'Search...'
  @Output() search = new EventEmitter<string>();

  private input$ = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
    this.input$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((query) => this.search.emit(query));
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.input$.next(input.value);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
