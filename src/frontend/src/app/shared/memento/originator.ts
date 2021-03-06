import { Memento } from '../interfaces/memento';
import { File } from '../models/file.model';
import { FileMemento } from './file-memento';

export class Originator {
  private state: File;
  private oldState?: File;

  constructor(state: File) {
    this.state = state;
  }

  public save(): Memento {
    const memento = new FileMemento(this.state);
    return memento;
  }

  public restore(memento: Memento): void {
    this.oldState = this.state;
    this.state = memento.getState();
  }

  public redo(): Memento | null {
    if (this.oldState) {
      this.state = this.oldState;
      return this.save();
    }
    return null;
  }

  public getState(): File {
    return this.state;
  }

  public setState(file: File): void {
    this.state = new File();

    this.state.name = file.name;
    this.state.data = file.data;
    this.state.type = file.type;
  }
}
