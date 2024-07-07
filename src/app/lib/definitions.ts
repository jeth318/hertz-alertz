export type Subscription = {
  id: number;
  from_city?: string | null;
  to_city?: string | null;
};

export type City = {
  id: number;
  name: string;
};
