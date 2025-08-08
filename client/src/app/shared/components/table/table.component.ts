import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITableColumns, ITableConfig } from '../../interfaces/table-config.model';
import { IconsComponent } from "../icons/icons.component";
import { refreshTimer, RefreshTimerService } from '../../services/refresh-timer/refresh-timer.service';
import { LoaderService } from '../../services/loader/loader.service';
import { FilterService } from '../../services/filter/filter.service';
import { PaginationService } from '../../services/pagination/pagination.service';
import { catchError, finalize, of, retry, Subject, takeUntil, timer } from 'rxjs';
import { ToastService } from '../../services/toast/toast.service';
import { LoadDataService } from '../../services/load-data/load-data.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './table.component.html'
})
export class TableComponent<T> implements OnInit, OnChanges, OnDestroy {

  @Input() config!: ITableConfig<T>;
  @Input() search = '';
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<number>();

  _rows: T[] = [];
  filteredRows: T[] = [];
  columns: ITableColumns[] = [];

  isLoading = false;

  destroy$ = new Subject<void>();

  get pagedRows(): T[] {
    const start = (this.paginationSrvc.currentPage() - 1) * this.paginationSrvc.pageSize();
    const end = start + this.paginationSrvc.pageSize();
    return this.filteredRows.slice(start, end);
  }

  constructor(
    private refreshTimerSrvc: RefreshTimerService,
    private loaderSrvc: LoaderService,
    private filterSrvc: FilterService<T>,
    private paginationSrvc: PaginationService,
    private toastSrvc: ToastService,
    private loadDataSrvc: LoadDataService
  ) {
    this.loaderSrvc.loading$.subscribe((state) =>
      this.isLoading = state);
  }

  ngOnInit(): void {

    this.loadDataSrvc.onReload()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Reloading data...');
        this.requestData();
      });

    this.requestData();

    // auto refresh table data every 5 minutes
    this.startRefreshTimer(refreshTimer, () => this.requestData());

    // Get only searchable columns and extract their keys and types
    this.columns = this.config.columns.filter(column => column.searchable);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['search'] && !changes['search'].firstChange) {
      this.toggleLoader(true);
      this.filterData(changes['search'].currentValue);
      this.toggleLoader(false);
    }
  }

  ngOnDestroy(): void {
    this.refreshTimerSrvc.stop();
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Starts a recurring timer and calls the callback on each tick.
   *
   * @param timer - Interval in ms
   * @param cb - Function to call each interval
   */
  startRefreshTimer(timer: number, cb: () => void) {
    this.refreshTimerSrvc.start(timer);
    this.refreshTimerSrvc.refesh$.subscribe(() => cb());
  }

  /**
   * Requests data using the configured `load` action if enabled.
   * Updates the `rows` used by the table.
  */
  requestData() {
    if (!this.config.actions['load']?.enabled) {
      this.toastSrvc.error('Load handler is not defined');
      return;
    }

    this.toggleLoader(true);

    this.config.actions?.load?.handler()
      .pipe(
        retry({ count: 3, delay: () => timer(1000 * 5) }), // retries each request for 3x with a 5s request delay
        catchError((error) => this.handleErrorRequest(error)),
        finalize(() => this.toggleLoader(false))
      ).subscribe((data: T[]) => this.handleSuccessRequest(data));
  }

  private handleErrorRequest(error: any) {
    console.error('Error loading data', error);
    this.toastSrvc.error('Error loading data.');
    return of(null);
  }

  private handleSuccessRequest(data: T[]) {
    if (!data) {
      return;
    }

    if (data.length === 0) {
      this.toastSrvc.info('No records found.');
    }

    this._rows = this.filteredRows = data;
    this.paginationSrvc.setTotal(data.length);
  }

  filterData(searchTerm: string) {
    if (this._rows.length === 0) {
      return;
    }

    this.filteredRows = this.filterSrvc.filter(this._rows, searchTerm, this.columns);
    this.paginationSrvc.setTotal(this.filteredRows.length);
    this.paginationSrvc.setCurrentPage(1);
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
