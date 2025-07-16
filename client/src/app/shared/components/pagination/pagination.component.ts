import { Component, Input } from '@angular/core';
import { IconsComponent } from "../icons/icons.component";
import { PaginationService } from '../../services/pagination/pagination.service';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [IconsComponent],
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {
  get currentPage(): number {
    return this.paginationSrvc.currentPage();
  }

  get pageSize(): number {
    return this.paginationSrvc.pageSize();
  }

  get totalPage(): number {
    return this.paginationSrvc.totalCount();
  }

  constructor(private paginationSrvc: PaginationService) { }

  onSizeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.paginationSrvc.setPageSize(Number(value));
    this.paginationSrvc.setCurrentPage(1);
  }

  firstPage() {
    this.paginationSrvc.setCurrentPage(1);
  }

  previousPage() {
    this.paginationSrvc.setCurrentPage(this.currentPage - 1);
  }

  nextPage() {
    this.paginationSrvc.setCurrentPage(this.currentPage + 1);
  }

  lastPage() {
    this.paginationSrvc.setCurrentPage(Math.floor(this.totalPage / this.pageSize));
  }

  isDisabled(action: 'first' | 'previous' | 'next' | 'last') {

    if (action === 'first' || action === 'previous') {
      return this.currentPage - this.pageSize < 1;
    }

    if (action === 'next' || action === 'last') {
      return this.currentPage + this.pageSize > this.totalPage;
    }

    return false;
  }
}
