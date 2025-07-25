export interface IClient {
  id: number;
  name: string;
  contact: string;
  createdAt: Date;
  deletedAt: Date | null;
  updatedAt: Date;
}

// export type ICreateClientPayload = Omit<IClient, 'id' | 'createdAt' | 'updatedAt'>;
