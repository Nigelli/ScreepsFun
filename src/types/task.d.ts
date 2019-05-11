import { Action } from "enums/action";

interface Task {
    targetAction: Action;
    targetId?: string
    sourceId?: string;
    complete: boolean;
}

type Target = Source | Creep | Structure<StructureConstant>;