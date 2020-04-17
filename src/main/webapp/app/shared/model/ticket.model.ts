import { IProject } from '@/shared/model/project.model';
import { IUser } from '@/shared/model/user.model';
import { ILabel } from '@/shared/model/label.model';

export interface ITicket {
  id?: number;
  title?: string;
  description?: string;
  dueDate?: Date;
  done?: boolean;
  project?: IProject;
  assignedTo?: IUser;
  labels?: ILabel[];
}

export class Ticket implements ITicket {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public dueDate?: Date,
    public done?: boolean,
    public project?: IProject,
    public assignedTo?: IUser,
    public labels?: ILabel[]
  ) {
    this.done = this.done || false;
  }
}
