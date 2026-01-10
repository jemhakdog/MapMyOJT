
import { OJTPosting, UserRole, UserProfile } from './types';

// Fix: Added missing required properties 'visibility' and 'notificationsEnabled'
export const MOCK_STUDENT: UserProfile = {
  id: 'std-1',
  name: 'Alex Rivera',
  role: UserRole.STUDENT,
  email: 'alex.rivera@university.edu',
  skills: ['React', 'TypeScript', 'UI Design'],
  avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
  affiliation: 'State University of Technology',
  joinedAt: Date.now(),
  visibility: 'PUBLIC',
  notificationsEnabled: true
};

// Fix: Added missing required properties 'visibility' and 'notificationsEnabled'
export const MOCK_BUSINESS: UserProfile = {
  id: 'bus-1',
  name: 'Sarah Chen',
  role: UserRole.BUSINESS,
  email: 'hiring@nexuslabs.io',
  skills: [],
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  affiliation: 'Nexus Labs',
  joinedAt: Date.now(),
  visibility: 'PUBLIC',
  notificationsEnabled: true
};

// Fix: Added missing required properties 'visibility' and 'notificationsEnabled'
export const MOCK_COORDINATOR: UserProfile = {
  id: 'coord-1',
  name: 'Dr. Marcus Thorne',
  role: UserRole.COORDINATOR,
  email: 'm.thorne@university.edu',
  skills: [],
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  affiliation: 'State University of Technology',
  joinedAt: Date.now(),
  visibility: 'PUBLIC',
  notificationsEnabled: true
};

export const MOCK_POSTINGS: OJTPosting[] = [
  {
    id: 'p1',
    companyName: 'Nexus Labs',
    title: 'Product Design Intern',
    description: 'Help us shape the future of Web3 interfaces. You will work directly with our senior designers on production-ready Figma files.',
    address: '123 Innovation Drive, Tech District',
    lat: 14.5995,
    lng: 120.9842,
    requiredSkills: ['Figma', 'UI/UX', 'Prototyping'],
    slotsAvailable: 2,
    status: 'ACTIVE',
    category: 'Design'
  },
  {
    id: 'p2',
    companyName: 'EcoStream Energy',
    title: 'Systems Engineering Intern',
    description: 'Work on renewable energy grid optimization systems using IoT and data analysis.',
    address: '45 Green St., Emerald District',
    lat: 14.6333,
    lng: 121.0333,
    requiredSkills: ['Python', 'IoT', 'Data Science'],
    slotsAvailable: 1,
    status: 'ACTIVE',
    category: 'Engineering'
  },
  {
    id: 'p3',
    companyName: 'Vivid Media',
    title: 'Marketing & SEO Intern',
    description: 'Join our high-growth agency to manage social campaigns and optimize search visibility.',
    address: '88 Creative Blvd, Media City',
    lat: 14.5547,
    lng: 121.0244,
    requiredSkills: ['SEO', 'Content Strategy', 'Social Media'],
    slotsAvailable: 4,
    status: 'ACTIVE',
    category: 'Marketing'
  },
  {
    id: 'p4',
    companyName: 'SteelCore Fintech',
    title: 'Blockchain Developer Trainee',
    description: 'Learn to build smart contracts and secure financial gateways on Ethereum.',
    address: '210 Secure Way, Financial Park',
    lat: 14.5800,
    lng: 121.0600,
    requiredSkills: ['Solidity', 'JavaScript', 'Security'],
    slotsAvailable: 3,
    status: 'ACTIVE',
    category: 'Tech'
  }
];
