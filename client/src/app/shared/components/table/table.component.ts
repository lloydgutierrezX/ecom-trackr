import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ITableColumns, ITableConfig } from '../../interfaces/table-config.model';
import { IconsComponent } from "../icons/icons.component";
import { RefreshTimerService } from '../../services/refresh-timer/refresh-timer.service';
import { LoaderService } from '../../services/loader/loader.service';
import { FilterService } from '../../services/filter/filter.service';
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './table.component.html'
})
export class TableComponent<T> implements OnInit, OnChanges {

  @Input() config!: ITableConfig<T>;
  @Input() search = '';
  @Output() onEdit = new EventEmitter<T>();
  @Output() onDelete = new EventEmitter<number>();

  _rows: T[] = [];
  filteredRows: T[] = [];
  columns: ITableColumns[] = [];

  isLoading = false;

  get pagedRows(): T[] {
    const start = (this.paginationSrvc.currentPage() - 1) * this.paginationSrvc.pageSize();
    const end = start + this.paginationSrvc.pageSize();
    return this.filteredRows.slice(start, end);
  }

  constructor(
    private refreshTimerSrvc: RefreshTimerService,
    private loaderSrvc: LoaderService,
    private filterSrvc: FilterService<T>,
    private paginationSrvc: PaginationService
  ) {
    this.loaderSrvc.loading$.subscribe((state) =>
      this.isLoading = state);
  }

  ngOnInit(): void {
    // auto refresh table data every 5 minutes
    this.startRefreshTimer(Number(1000 * 30), () => this.requestData());

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
      return;
    }

    this.toggleLoader(true);

    this.config.actions?.load?.handler()
      .subscribe((data: T[]) => {
        this._rows = this.filteredRows = data;
        this.paginationSrvc.setTotal(data.length);
        this.toggleLoader(false);
      });
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
