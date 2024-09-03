// Drag & Drop Interfaces
// eslint-disable-next-line @typescript-eslint/no-namespace
namespace _App {
  export enum ProjectStatus {
    Active,
    Finished,
  }

  // Project class
  export class Project {
    id: string;
    title: string;
    description: string;
    people: number;
    status: ProjectStatus;

    constructor(id: string, t: string, d: string, p: number, s: ProjectStatus) {
      this.title = t;
      this.description = d;
      this.people = p;
      this.status = s;
      this.id = id;
    }
  }
}
