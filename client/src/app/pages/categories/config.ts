import { format } from 'date-fns';
import { ITableConfig } from '../../shared/interfaces/table-config.model';
import { ClientService } from '../../core/services/client/client.service';
import { IClient } from '../../core/services/client/client.model';
import { IFormConfig } from '../../shared/interfaces/form.interface';
import { MobilePhPipe } from '../../shared/pipes/mobile-ph/mobile-ph.pipe';

const mobilePhPipe = new MobilePhPipe();

export const tableConfig = (clientSrvc: ClientService): ITableConfig<IClient> => ({
  id: 'customer-table',
  columns: [
    {
      label: 'Name',
      valueFn: (data: { name: string }) => data.name,
      style: 'width: 30%',
      key: 'name',
      searchable: true
    },
    {
      label: 'Active',
      valueFn: (data: { deletedAt: Date | null }) => data.deletedAt ? 'Not Active' : 'Active',
      style: 'width: 20%',
      key: 'active',
      searchable: false
    },
    {
      label: 'Price',
      valueFn: (data: { deletedAt: Date | null }) => data.deletedAt ? 'Not Active' : 'Active',
      style: 'width: 20%',
      key: 'active',
      searchable: false
    },
    {
      label: 'Date Created',
      valueFn: (data: { createdAt: Date }) => format(new Date(data.createdAt), 'yyyy-MM-dd'),
      style: 'width: 20%',
      key: 'createdAt',
      searchable: true
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
});

export const formConfig: IFormConfig = {
  name: 'client-form',
  moduleName: 'clients',
  reset: false,
  buildFormOnFirstChange: false,
  fields: [
    {
      type: 'text',
      label: 'Name',
      container: {
        className: 'w-full'
      },
      field: {
        name: 'name',
        validators: ['required', 'minLength:3'],
        type: 'text'
      }
    },
    {
      type: 'tel',
      label: 'Mobile',
      container: {
        className: 'w-full'
      },
      field: {
        name: 'contact',
        placeholder: '+639XXXXXXXXX',
        validators: ['mobilePH'],
        type: 'tel',
      }
    },
  ],
  actions: [
    {
      value: 'close',
      label: 'Cancel',
      className: 'btn btn-md'
    },
    {
      value: 'save',
      label: 'Save',
      className: 'btn btn-md btn-primary'
    },
  ],
}