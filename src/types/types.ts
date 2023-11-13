export interface Picture {
  url: string;
}

export enum Lang {
  PL= 'PL',
  EN = 'EN',
  RU = 'RU',
  DE = 'DE'
}

export interface User {
  id: number;
  email: string;
  username: string;
  fundings: Funding[];
  referals: Referal[];
  userpic?: Picture;
}

export enum Currency {
  APE = 'APE',
  AXS = 'AXS',
  XRP = 'XRP',
  ADA = 'ADA',
  LTC = 'LTC'
}

export enum ReferalStatus {
  pending = 'pending',
  accepted = 'accepted',
  expired = 'expired'
}

export enum FundingStatus {
  pending = 'pending',
  approved = 'approved',
  accepted = 'accepted',
  rejected = 'rejected'
}

export interface Referal {
  email: string;
  status: ReferalStatus;
  createdAt: string;
  slave: User;
}

export interface Funding {
  accepted_at: string;
  createdAt: string;
  amount: number;
  currency: Currency;
  status: FundingStatus;
  transfer_hash?: string;
  transfer_qr?: Picture;
}
