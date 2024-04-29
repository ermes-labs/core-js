import { GeoCoordinates } from "../infrastructure/geo-coordinates";
import { SessionLocation } from "../infrastructure/session-location";

export interface SessionMetadata {
  ClientGeoCoordinates: GeoCoordinates;
  StaticOffloadableScore: number;
  CreatedIn: string;
  CreatedAt: number;
  UpdatedAt: number;
  ExpiresAt?: number | null;
}

export interface SessionCommands {
  Get_metadata(sessionId: string): Promise<SessionMetadata>;
  Create(
    geoCoords: GeoCoordinates | null,
    expiresAt: number | null,
  ): Promise<string>;
  CreateAndRwAcquireSession(
    geoCoords: GeoCoordinates | null,
    expiresAt: number | null,
  ): Promise<string>;
  CreateAndRoAcquireSession(
    geoCoords: GeoCoordinates | null,
    expiresAt: number | null,
  ): Promise<string>;
  Onload(metadata: SessionMetadata, reader: any): Promise<string>;
  RwAcquireSession(sessionId: string): Promise<SessionLocation | null>;
  RoAcquireSession(sessionId: string): Promise<SessionLocation | null>;
  RwReleaseSession(sessionId: string): Promise<void>;
  RoReleaseSession(sessionId: string): Promise<void>;
  Offload(writer: any): Promise<string | null>;
  Force_Offload(
    sessionId: string,
    toLocation: SessionLocation,
    writer: any,
  ): Promise<void>;
  Set_client_coordinates(
    sessionId: string,
    geoCoords: GeoCoordinates | null,
  ): Promise<void>;
  Set_expire_time(sessionId: string, expiresAt: number): Promise<void>;
  Expire(sessionId: string): Promise<void>;
  Garbage_collect_expired(): Promise<number>;
  Garbage_collect_expired_but_never_released(
    ttlAfterExpiration: number,
  ): Promise<number>;
  Garbage_collect_unexpired_but_old(olderThan: number): Promise<number>;
}
