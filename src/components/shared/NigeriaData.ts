export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
]

export const TRADES = [
  { value: "plumber", label: "Plumber", icon: "🔧" },
  { value: "electrician", label: "Electrician", icon: "⚡" },
  { value: "carpenter", label: "Carpenter", icon: "🪚" },
  { value: "tailor", label: "Tailor", icon: "🧵" },
  { value: "ac_technician", label: "AC Technician", icon: "❄️" },
  { value: "painter", label: "Painter", icon: "🎨" },
  { value: "welder", label: "Welder", icon: "🔥" },
  { value: "phone_repairer", label: "Phone Repairer", icon: "📱" },
  { value: "generator_mechanic", label: "Generator Mechanic", icon: "⚙️" },
  { value: "tiler", label: "Tiler", icon: "🏠" },
  { value: "bricklayer", label: "Bricklayer", icon: "🧱" },
  { value: "plumber_gas", label: "Gas Plumber", icon: "🔩" },
]

export const STATE_LGAS: Record<string, string[]> = {
  Lagos: ["Agege", "Ajeromi-Ifelodun", "Alimosho", "Amuwo-Odofin", "Apapa", "Badagry", "Epe", "Eti-Osa", "Ibeju-Lekki", "Ifako-Ijaiye", "Ikeja", "Ikorodu", "Kosofe", "Lagos Island", "Lagos Mainland", "Mushin", "Ojo", "Oshodi-Isolo", "Shomolu", "Surulere"],
  Abuja: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
  FCT: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
  Rivers: ["Port Harcourt", "Obio-Akpor", "Ikwerre", "Emohua", "Eleme", "Etche", "Gokana", "Tai"],
  Kano: ["Kano Municipal", "Fagge", "Dala", "Gwale", "Kumbotso", "Nassarawa", "Tarauni", "Ungogo"],
  Abuja_FCT: ["Abaji", "Bwari", "Gwagwalada", "Kuje", "Kwali", "Municipal Area Council"],
}

export function getLGAs(state: string): string[] {
  return STATE_LGAS[state] || ["Select State First"]
}

export const PLACEHOLDER_AVATAR = (name: string) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=D96B43&color=fff&size=128`
