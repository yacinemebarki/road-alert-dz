export interface ALerResponse {
  success: boolean;
  message: string;
  alerts: Alert[];
}

export interface Alert {
  _id: string;

  user: {
    _id: string;
    email: string;
  };

  post: {
    _id: string;
    title: string;
    location: string;
    description: string;
    stauts: string;
    image: string;
    time: string;
  };

  view: string;
}

export interface Report {
  id: string;
  title: string;
  wilaya: string;
  status: string;
  action: string;
}

export interface Stat {
  icon: string;
  label: string;
  value: number;
  iconClass: string;
}