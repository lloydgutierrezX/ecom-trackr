import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FilterService<T> {
  filter(data: T[], term: string, columns: { key: string }[]) {
    return data.filter(row => columns
      .some(column => {
        const key = column.key;
        const value = (row as Record<string, any>)[key]
        return String(value).toLowerCase().includes(term.toLowerCase());
      })
    );
  }

  filterByDate(data: T[], term: string, column: { key: string }) {
    // TODO: Use date-fns to normalize both value and term then compare
  }

  filterByBoolean(data: T[], term: string, column: { key: string }) {
    // TODO: Match against 'true'/'false' or localized labels
  }
}
