
export enum UserRole {
  STUDENT = 'STUDENT',
  BUSINESS = 'BUSINESS',
  COORDINATOR = 'COORDINATOR'
}

export type OJTStatus = 'SEARCHING' | 'HIRED' | 'COMPLETED' | 'INACTIVE';
export type CompanyStatus = 'HIRING' | 'CLOSED';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  skills: string[];
  avatar: string;
  affiliation?: string; // School for student/coordinator, Company for business
  bio?: string;
  isVerified?: boolean; 
  joinedAt: number;
  // Expansion fields
  visibility: 'PUBLIC' | 'PRIVATE';
  notificationsEnabled: boolean;
  ojtStatus?: OJTStatus;
  companyStatus?: CompanyStatus;
  location?: { lat: number; lng: number };
}

export interface OJTPosting {
  id: string;
  companyName: string;
  title: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  requiredSkills: string[];
  slotsAvailable: number;
  status: 'ACTIVE' | 'CLOSED';
  category: 'Tech' | 'Design' | 'Management' | 'Engineering' | 'Marketing';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export interface DailyLog {
  id: string;
  studentId: string;
  studentName: string;
  businessId: string;
  date: string;
  hours: number;
  tasks: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}
