import type { ReactNode } from "react";

export interface LoginData {
  email: string;
  password: string;
}

export interface OtpData {
  email: string;
  otp: string;
}

export type User = {
  id: string | number;
  name: string;
  email: string;
  role: string;
  designation: string;
};

export type UserData = {
  id?: string | number;
  name?: string;
  password?: string;
  email?: string;
  role?: string;
  designation?: string;
};

export type initialAuthState = {
  isLoggedIn: boolean;
  user: null | User;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: null | string | unknown;
};

export type initialAccessState = {
  isLoggedIn: boolean;
  users:  User[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: null | string | unknown;
};


export interface UtilityProps {
  children: ReactNode; // Define the type for children
}

export interface SchoolData {
  id?: number;
  schoolId?: string;
  schoolName: string;
  gp: string;
  block: string;
  teacherName: string;
  totalStudents: number;
  sikshaSathi: string;
  created_at?: Date | string;
  updated_at?: Date | string;
}

export type initialSchoolState = {
  schools: SchoolData[];
  school: null | SchoolData;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: null | string | unknown;
};
