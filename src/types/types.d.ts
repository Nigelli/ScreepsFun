import { Task } from "./task";

// example declaration file - remove these and add your own custom typings

// memory extension samples
declare global {

  interface CreepMemory {
    role?: string;
    roomName?: string;
    working?: boolean;
    task?: Task;
  }

  interface Memory {
    uuid: number;
    log: any;
  }
}

// `global` extension samples
declare namespace NodeJS {
  interface Global {
    log: any;
  }
}

