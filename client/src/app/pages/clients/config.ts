import { format } from 'date-fns';
import { ITableConfig } from '../../shared/interfaces/table-config.model';
import { ClientService } from '../../core/services/client/client.service';
import { IClient } from '../../core/services/client/client.model';

export const tableConfig = (clientSrvc: ClientService): ITableConfig<IClient> => ({
  id: 'customer-table',
  columns: [
    {
      label: 'Name',
      valueFn: (data: any) => data.name,
      style: 'width: 40%'
    },
    {
      label: 'Active',
      valueFn: (data: { deletedAt: Date | null }) => data.deletedAt ? 'Not Active' : 'Active',
      style: 'width: 30%'
    },
    {
      label: 'Date Created',
      valueFn: (data: { createdAt: Date }) => format(new Date(data.createdAt), 'yyyy-MM-dd'),
      style: 'width: 30%'
    },
  ],
  actions: {
    load: {
      enabled: true,
      handler: () => clientSrvc.getAll(),
    },
    create: {
      enabled: true,
      handler: (payload: Partial<IClient>) => clientSrvc.create(payload),
    },
    update: {
      enabled: true,
      handler: (id: number, payload: Partial<IClient>) => clientSrvc.update(id, payload),
      tooltip: 'Update this item?'
    },
    delete: {
      enabled: true,
      handler: (id: number) => clientSrvc.delete(id),
      tooltip: 'Delete this item?'
    },
    search: {
      enabled: true,
      label: 'Search clients',
      placeholder: 'Search client name here',
      handler: (query: string) => clientSrvc.getAll(query)
    }
  },
  sortBy: []
})