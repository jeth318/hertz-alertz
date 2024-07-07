const SubscriptionSchema = z.object({
  id: z.string(),
  from_city: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});
