import axios from "axios";

export const API_URL_EVENTS = "https://epoch-backend.vercel.app/api/events/";
export const API_URL_CATEGORY =
  "https://epoch-backend.vercel.app/api/category/";
export const API_URL_Incharge =
  "https://epoch-backend.vercel.app/api/incharge/";

export interface Incharge {
  id: number;
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
  category: string;
}
export interface Category {
  id: number;
  name: string;
}
export interface Participant {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
  gender?: string;
  year: string;
  department: string;
  college: string;
}
export type TeamMember = {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
  gender?: string;
  year: string;
  department: string;
  college: string;
};
export interface Event {
  id: number;
  name: string;
  register_amount: string;
  time_limit: string | null;
  price: string;
  is_team: boolean;
  max_team_size: number | null;
  instructions: string;
  category: string;
  team_members?: TeamMember[];
  day?: String;
  timing?: String;
}

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(API_URL_EVENTS);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Events");
  }
};

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(API_URL_CATEGORY);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch Category"
    );
  }
};
export const fetchIncharge = async (): Promise<Incharge[]> => {
  try {
    const response = await axios.get<Incharge[]>(API_URL_Incharge);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch Incharge"
    );
  }
};
