import { cities } from "@/app/lib/placeholder-data";
export default function CreateSubscription() {
  return (
    <div className="mb-2 w-full rounded-md bg-white p-4 flex flex-row justify-between items-center">
      <div className="flex flex-row">
        <div className="flex flex-col">
          <label htmlFor="from_city">Från</label>
          <label htmlFor="to_city">Till</label>
        </div>
        <div>
          <div className="flex flex-col">
            <select id="from_city">
              <option defaultValue="hej">Alla</option>
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
            <select id="to_city">
              {cities.map((city) => (
                <option key={city.id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <form action="">
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
