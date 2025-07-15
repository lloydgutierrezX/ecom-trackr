import { Component, EventEmitter, Output } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';
import { tableConfig } from './config';
import { ITableConfig } from '../../shared/interfaces/table-config.model';
import { IClient } from '../../core/services/client/client.model';
import { ClientService } from '../../core/services/client/client.service';
import { SearchComponent } from "../../shared/components/search/search.component";
import { ListLayoutComponent } from '../../shared/components/list-layout/list-layout.component';
@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [TableComponent, SearchComponent, ListLayoutComponent],
  templateUrl: './clients.component.html'
})
export class ClientsComponent {
  tableConfig: ITableConfig<IClient>;

  constructor(private clientSrvc: ClientService) {
    this.tableConfig = tableConfig(this.clientSrvc);
  }

  onSearch(query: string) {
    console.log(query);
  }

  onAdd() {
    console.log('add');
  }

  onEdit(data: IClient) {

  }

  onDelete(id: number) {

  }

}
