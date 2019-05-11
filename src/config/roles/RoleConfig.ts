import { ROLES } from "./Constants";
import { HarvesterConfig } from "./Harvester";

export interface RoleConfig {
    roleName: ROLES;
    bodyParts: (roomName: string) => BodyPartConstant[];
}

export class RoleConfigFactory {
    static get(role: string): RoleConfig {
        switch (role) {
            case  ROLES.HARVESTER:
                return new HarvesterConfig();
            default:
                throw new Error("Role Not Impletemented");
        }
    }
}