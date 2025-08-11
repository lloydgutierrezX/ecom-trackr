import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PaginationService {

  currentPage = signal(1);
  totalCount = signal(0);
  pageSize = signal(5);

  setCurrentPage(page: number) {
    this.currentPage.set(page);
  }

  setTotal(count: number) {
    this.totalCount.set(count > 0 ? count : 0);
  }

  setPageSize(size: number) {
    this.pageSize.set(size);
  }
}
