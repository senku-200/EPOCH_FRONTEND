import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/events/";

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
  category: number;
  team_members?: TeamMember[];
}

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get<Event[]>(API_URL);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch incharges"
    );
  }
};
