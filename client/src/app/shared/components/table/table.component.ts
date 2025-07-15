import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITableConfig } from '../../interfaces/table-config.model';
import { IconsComponent } from "../icons/icons.component";
import { RefreshTimerService } from '../../services/refresh-timer/refresh-timer.service';
import { LoaderService } from '../../services/loader/loader.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconsComponent, LoaderComponent],
  templateUrl: './table.component.html'
})
export class TableComponent<T> implements OnInit {

  @Input() config!: ITableConfig<T>;
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<number>();

  rows: T[] = [];

  isLoading = false;

  constructor(
    private refreshTimerSrvc: RefreshTimerService,
    private loaderSrvc: LoaderService
  ) {
    this.loaderSrvc.loading$.subscribe((state) =>
      this.isLoading = state);
  }

  ngOnInit() {
    // auto refresh table data every 5 minutes
    this.startRefreshTimer(Number(1000 * 30), () => this.loadData());
  }

  /**
   * Starts a refresh timer that triggers a callback on each interval.
   *
   * - Uses the shared `RefreshTimerService` to emit a signal every `timer` milliseconds.
   * - Subscribes to the refresh stream and invokes the provided callback on each tick.
   *
   * @param timer - Interval in milliseconds between refreshes
   * @param cb - Callback function to execute on each refresh
  */
  startRefreshTimer(timer: number, cb: () => void) {
    this.refreshTimerSrvc.start(timer);
    this.refreshTimerSrvc.refesh$.subscribe(() => cb());
  }

  /**
   * Loads data using the configured `load` action if enabled.
   * Updates the `rows` used by the table.
  */
  loadData() {
    if (!this.config.actions['load']?.enabled) {
      return;
    }

    this.toggleLoader(true);

    this.config.actions?.load?.handler()
      .subscribe((data: T[]) => {
        this.rows = data;
        this.toggleLoader(false);
      });
  }


  onEditRow(row: T) {
    this.onEdit.emit(row);
  }

  onDeleteRow(row: T) {
    this.onDelete.emit(Number((row as any)?.id));
  }

  toggleLoader(state: boolean) {
    state ? this.loaderSrvc.show() : this.loaderSrvc.hide();
  }
}
