export interface ALerResponse{
    success: boolean;
    message: string;
    alerts: Alert[];   
}

export interface Alert {
  _id: string;
  user: {
    email: string;
  };
  post: {
    _id: string;
    title: string;
    location: string;
  };
  view: string;
}

export interface Report {
  id: string;
  title: string;
  wilaya: string;
  status: 'New' | 'In Progress' | 'Resolved';
  action: string;
}

export interface Stat {
  icon: string;
  label: string;
  value: number;
  iconClass: string;
}