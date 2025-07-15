export interface IMenu {
  label: string;
  icon: string;
  route?: string;
  children?: IMenu[];
}