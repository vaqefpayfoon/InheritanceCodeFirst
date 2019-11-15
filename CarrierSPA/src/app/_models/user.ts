export interface User {
  id: any;
  username: string;
  password: string;
  fullName: string;
  website: string;
  age: number;
  lastActive: Date;
  cv: string;
  moreInfo: string;
  section: string;
  photoUrl: string;
  userType: string;
  cityId: any;
}
export interface WholeUserData {
  id: any;
  username: string;
  password: string;
  fullName: string;
  website: string;
  age: number;
  lastActive: Date;
  cv: string;
  moreInfo: string;
  section: string;
  photoUrl: string;
  userType: string;
  cityId: any;
  email: string;
  phone: string;
  gender: string;
  carrierId: any;
  salaryId: any;
  universityId: any;
  universityInfo: string;
  address: string;
}
export interface EmployeeSave {
  wholeuserData: WholeUserData;
  password: string;
}
