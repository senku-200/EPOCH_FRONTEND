import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/incharges/';

export interface Category {
  name: string;
}

export interface Incharge {
  id: number;
  name: string;
  register_number: string;
  email: string;
  phone_number: string;
  category: Category[];
}

// Function to fetch all incharges
export const fetchIncharges = async (): Promise<Incharge[]> => {
  try {
    const response = await axios.get<Incharge[]>(API_URL);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || 'Failed to fetch incharges');
  }
};
