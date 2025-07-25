import { Component, EventEmitter, Output } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { formConfig, tableConfig } from './config';
import { ITableConfig } from '../../shared/interfaces/table-config.model';
import { IClient } from '../../core/services/client/client.model';
import { ClientService } from '../../core/services/client/client.service';
import { SearchComponent } from "../../shared/components/search/search.component";
import { ListLayoutComponent } from '../../shared/components/list-layout/list-layout.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ModalService } from '../../shared/services/modal/modal.service';
import { IFormConfig } from '../../shared/interfaces/form.interface';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableComponent, SearchComponent, ListLayoutComponent, PaginationComponent],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  tableConfig: ITableConfig<IClient>;
  searchTerm = '';

  clientFormConfig = formConfig;

  constructor(
    private clientSrvc: ClientService,
    private modalSrvc: ModalService
  ) {
    this.tableConfig = tableConfig(this.clientSrvc);
  }

  onSearch(query: string) {
    this.searchTerm = query;
  }

  onAdd() {
    this.modalSrvc.open('form-modal', this.clientFormConfig);
  }

  onEdit(data: IClient) {

  }

  onDelete(id: number) {

  }

}
