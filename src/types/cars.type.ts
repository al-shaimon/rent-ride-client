export interface TCars {
  _id: string;
  name: string;
  description: string;
  carType: string;
  image: string;
  color: string;
  isElectric: boolean;
  features: string[];
  pricePerHour: number;
  status: string;
  reviews?: any[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
