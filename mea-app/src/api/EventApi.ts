import axios from "axios";

export const API_URL_EVENTS = "http://127.0.0.1:8000/api/events/";
export const API_URL_CATEGORY = "http://127.0.0.1:8000/api/category/";
export const API_URL_Incharge = "http://127.0.0.1:8000/api/incharge/";

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
}
export type TeamMember = {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
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
  day?:String;
  timing?:String;
}

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(API_URL_EVENTS);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch Events");
  }
};

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const response = await axios.get<Category[]>(API_URL_CATEGORY);
    console.log(response.data);
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
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch Incharge"
    );
  }
};
