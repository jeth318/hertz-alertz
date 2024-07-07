export type Subscription = {
  id: number;
  from_city?: number | null;
  to_city?: number | null;
};

export type City = {
  id: number;
  name: string;
};
