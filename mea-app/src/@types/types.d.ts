// types.d.ts or within the component file

export interface Participant {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
}

export interface TeamMember {
  name: string;
  email: string;
  register_number: string;
  phone_number: string;
}

export interface Event {
  event_id: number;
  team_members?: TeamMember[];
}

export interface FormData {
  participant: Participant;
  events: Event[];
}
