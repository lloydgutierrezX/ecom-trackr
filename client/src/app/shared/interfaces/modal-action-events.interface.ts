import { Observable } from "rxjs";

// This is for ConfirmModalComponent actions.
// Will add future actions here when needed.
export type IConfirmActions = 'logout' | 'delete';

export interface IModalActionEvent {
  action: IConfirmActions;
  id?: string;
  handler?: <T>(payload?: T) => Observable<T>;
}