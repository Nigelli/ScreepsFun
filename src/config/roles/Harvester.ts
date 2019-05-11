import { RoleConfig } from "./RoleConfig";
import { ROLES } from "./Constants";

export class HarvesterConfig implements RoleConfig {
    roleName = ROLES.HARVESTER;

    bodyParts(roomName:string): BodyPartConstant[] {
        return [WORK, MOVE, CARRY];
    }
}