import { Observable } from "rxjs";

export interface ITableColumns<T = any> {
  label: string;
  valueFn: (row: T) => string | number | boolean;
  style: string;
}

interface ITableActionConfig<T = any> {
  enabled: boolean;
  handler: (...args: any[]) => Observable<any>;
  label?: string;
  placeholder?: string;
  tooltip?: string;
}

type IActionType = 'load' | 'create' | 'update' | 'delete' | 'search';

type ITableActions<T = any> = {
  [x in IActionType]?: ITableActionConfig<T>;
};

interface ITableSortBy {
  column: string;
  direction: 'asc' | 'desc';
  active: boolean
}

export interface ITableConfig<T = any> {
  id: string;
  columns: ITableColumns<T>[];
  actions: ITableActions<T>;
  sortBy: ITableSortBy[]
}