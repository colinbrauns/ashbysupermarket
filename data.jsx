// Real-ish store data (sourced from public listings)
const STORE = {
  name: "Ashby Super Market",
  est: 2009, // approximate — "over a decade" per listings
  address: "2948 Martin Luther King Jr Way",
  cityLine: "Berkeley, California 94703",
  neighborhood: "South Berkeley",
  cross: "Across from Ashby BART",
  phone: "(510) 647-3672",
  hoursLine: "Open daily · 8 AM – 9 PM",
  domain: "ashbysupermarket.com",
  instagram: "@ashbysupermarket",
};

const SANDWICHES = [
  { n: "01", name: "The Ashby", price: "10.99", desc: "Boar's Head cracked peppermill turkey, provolone, avocado, tomato, mayo · focaccia", tag: "house" },
  { n: "02", name: "MLK Roast Beef", price: "10.99", desc: "Deluxe roast beef, pepperjack, tomato, onion, lettuce · soft roll", tag: "hot" },
  { n: "03", name: "Falafel Wrap", price: "9.49", desc: "Three falafel, hummus, salad, sriracha (if you dare), olive oil, spice · pita", tag: "veg" },
  { n: "04", name: "Salami Stack", price: "9.99", desc: "Genoa salami, sharp provolone, pepperoncini, oil & vinegar · ciabatta", tag: "cold" },
  { n: "05", name: "Cheddar Custom", price: "from 8.50", desc: "Build it your way. Pick the meat, the cheese, the bread, the works.", tag: "byo" },
  { n: "06", name: "Hummus & Veg", price: "8.49", desc: "House hummus, cucumber, tomato, sprouts, olives, lemon · whole wheat", tag: "veg" },
];

const AISLES = [
  { row: "A", label: "Produce", items: ["Bananas", "Apples", "Avocado", "Pomegranate (seasonal)", "Mango", "Greens & herbs", "Organic when in"] },
  { row: "B", label: "The Cold Case", items: ["Organic milk", "Eggs", "Yogurt", "Butter & cream", "Boar's Head deli meats", "Cheese wall"] },
  { row: "C", label: "Exotic Soda Wall", items: ["Mexican Coke", "Olipop", "Ginger beer (4 kinds)", "Italian sodas", "Yerba Mate", "Spindrift", "Topo Chico"] },
  { row: "D", label: "Pantry & Staples", items: ["Pasta", "Rice", "Beans", "Olive oil", "Snacks", "Cereal", "Gluten-free shelf", "Spices"] },
  { row: "E", label: "Beer & Wine", items: ["Local IPAs", "Lagers", "House reds", "Crisp whites", "Pet-nat (sometimes)", "Mini bottles"] },
  { row: "F", label: "Household", items: ["Paper goods", "Cleaning", "Foil & wrap", "Trash bags", "Toothpaste", "Dish soap"] },
  { row: "G", label: "Lottery & Lotto", items: ["Powerball", "Mega Millions", "Scratchers", "Daily draws", "We sold a $500 winner once."] },
  { row: "H", label: "The Boba Stand", items: ["Matcha latte", "Classic milk tea", "Double boba", "Brown sugar", "Taro", "New: oat option"] },
];

const FEATURES = [
  { k: "Boar's Head Deli", v: "Sandwiches made to order, all day." },
  { k: "Boba Stand", v: "Matcha lattes and double-pearl milk tea." },
  { k: "Lottery", v: "Powerball, Mega, Scratchers." },
  { k: "Organic Produce", v: "Small but mighty selection." },
  { k: "Exotic Sodas", v: "A whole wall of bottles." },
  { k: "Delivery", v: "DoorDash · Grubhub · Postmates · Mercato." },
];

const REVIEWS = [
  { q: "One of the best sandwiches I've ever tasted in my whole life.", who: "Yelp" },
  { q: "Convenient corner market with a gazillion items for just about any need.", who: "Yelp" },
  { q: "Really cute little corner store. I stop in about once a week on my walk home from BART.", who: "Yelp" },
  { q: "Hoodline Pick for Berkeley's 3 best grocery stores that won't break the bank.", who: "Hoodline" },
];

const HOURS = [
  ["Mon", "8:00 — 9:00"],
  ["Tue", "8:00 — 9:00"],
  ["Wed", "8:00 — 9:00"],
  ["Thu", "8:00 — 9:00"],
  ["Fri", "8:00 — 9:00"],
  ["Sat", "8:00 — 9:00"],
  ["Sun", "8:00 — 9:00"],
];

Object.assign(window, { STORE, SANDWICHES, AISLES, FEATURES, REVIEWS, HOURS });
