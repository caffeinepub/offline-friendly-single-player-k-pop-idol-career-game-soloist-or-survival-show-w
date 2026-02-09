import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AgencySelection {
    isCustom: boolean;
    selectedAgency: string;
}
export interface Agency {
    name: string;
    description: string;
}
export interface UserProfile {
    lastPlayed?: bigint;
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCustomAgency(name: string, description: string): Promise<void>;
    getAllAgencies(): Promise<Array<Agency>>;
    getCallerAgencySelection(): Promise<AgencySelection | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    selectPredefinedAgency(agencyName: string): Promise<void>;
}
