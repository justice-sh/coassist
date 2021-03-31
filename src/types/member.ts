export type MemberStatus = 'active' | 'inactive';
export type MemberType = 'TE' | 'T';

export interface Members {
  [key: string]: MemberI;
}

export interface MemberI {
  uid: number;
  name: string;
  type: MemberType;
  active: boolean;
  free: boolean;
}

export default MemberI;
