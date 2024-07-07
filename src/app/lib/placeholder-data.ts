// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data

const users = [
  {
    id: 1,
    name: "User",
    email: "user@nextmail.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Jesper",
    email: "jesper.thornberg@me.com",
    password: "123456",
  },
  {
    id: 3,
    name: "Joel",
    email: "joel.thornberg@me.com",
    password: "123456",
  },
  {
    id: 4,
    name: "Sigrid",
    email: "sigrid.thornberg@me.com",
    password: "123456",
  },
  {
    id: 5,
    name: "Per",
    email: "per.thornberg@me.com",
    password: "123456",
  },
];

const offers = [
  {
    id: 1,
    from_city: "Stockholm",
    to_city: "Göteborg",
  },
  {
    id: 2,
    from_city: "Göteborg",
    to_city: "Malmö",
  },
  {
    id: 3,
    from_city: "Härnösand",
    to_city: "Umeå",
  },
];

const subscriptions = [
  {
    id: 1,
    user_id: 1,
    from_city: "GÖTEBORG",
    to_city: "STOCKHOLM",
  },
  {
    id: 2,
    user_id: 2,
    from_city: "MALMÖ",
    to_city: "STOCKHOLM",
  },
  {
    id: 3,
    user_id: 3,
    from_city: null,
    to_city: "VÄSTERVIK",
  },
  {
    id: 4,
    user_id: 2,
    from_city: "ÖSTERSUND",
    to_city: "VÄSTERVIK",
  },
  {
    id: 5,
    user_id: 1,
    from_city: "HÄRNÖSAND",
    to_city: null,
  },
  {
    id: 6,
    user_id: 5,
    from_city: "RÄTTVIK",
    to_city: "HÄRNÖSAND",
  },
];

const cities = [
  {
    id: 1,
    name: "Härnösand",
  },
  {
    id: 2,
    name: "Stockholm",
  },
  {
    id: 3,
    name: "Malmö",
  },
  {
    id: 4,
    name: "Rättvik",
  },
  {
    id: 5,
    name: "Västervik",
  },
  {
    id: 6,
    name: "Östersund",
  },
  {
    id: 6,
    name: "Göteborg",
  },
];

export { users, offers, subscriptions, cities };
