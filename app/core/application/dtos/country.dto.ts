export interface CountryResponse {
  code: string;
  name: string;
  flagCode: string;
  timezone: string;
  variant?: string;
  phoneCode?: string;
  createdAt: Date;
  updatedAt: Date;
}
