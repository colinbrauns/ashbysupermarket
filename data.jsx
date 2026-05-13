// Real-ish store data (sourced from public listings)
const STORE = {
  name: "Ashby Super Market",
  est: 2009, // approximate — "over a decade" per listings
  url: "https://colinbrauns.github.io/ashbysupermarket/",
  address: "2948 Martin Luther King Jr Way",
  cityLine: "Berkeley, California 94703",
  neighborhood: "South Berkeley",
  cross: "Across from Ashby BART",
  phone: "(510) 647-3672",
  phoneTel: "+15106473672",
  hoursLine: "Open daily · 9am-10pm",
  domain: "colinbrauns.github.io/ashbysupermarket",
  instagram: "@ashbysupermarket",
  mapsUrl: "https://maps.app.goo.gl/CaLkuAG8eCPEsbvp9",
  yelpUrl: "https://www.yelp.com/biz/ashby-super-market-berkeley",
};

const ORDER_LINKS = [
  { name: "Grubhub", href: "https://www.grubhub.com/restaurant/ashby-super-market-2948-martin-luther-king-jr-way-berkeley/2691960", note: "Delivery + pickup" },
  { name: "DoorDash", href: "https://www.doordash.com/store/ashby-super-market-berkeley-1272966/", note: "Delivery + pickup" },
  { name: "Uber Eats", href: "https://www.ubereats.com/store/ashby-super-market/ySHmgI3tW-aAUeIDgGE0iQ", note: "Delivery availability varies" },
];

const SANDWICHES = [
  { n: "01", name: "California Dreaming", price: "from $10.99", desc: "Boar's Head cracked pepper turkey, provolone, avocado, tomato, mayo · focaccia", tag: "house" },
  { n: "02", name: "Roast Beef Hero", price: "from $11.99", desc: "Boar's Head deluxe roast beef, pepperjack, tomato, onion, lettuce · roll", tag: "hot" },
  { n: "03", name: "Classic Pastrami", price: "from $11.99", desc: "Boar's Head pastrami, Swiss, mustard · rye", tag: "hot" },
  { n: "04", name: "Cracked Pepper Turkey Reuben", price: "from $11.99", desc: "Cracked pepper turkey, Swiss, Reuben-style build · rye", tag: "hot" },
  { n: "05", name: "Tuna Melt", price: "from $11.99", desc: "Fresh tuna salad, your choice of bread, toppings, and cheese", tag: "hot" },
  { n: "06", name: "Self Created Sandwich", price: "from $10.99", desc: "Build it your way. Pick the meat, the cheese, the bread, and the works.", tag: "byo" },
  { n: "07", name: "Falafel Wrap", price: "from $10.99", desc: "Three falafel, hummus, salad, sriracha if selected, olive oil, spice · pita", tag: "veg" },
];

const BUILD_OPTIONS = [
  { label: "Bread", items: ["Focaccia", "Rye", "Soft roll", "Whole wheat", "Wrap"] },
  { label: "Protein", items: ["Turkey", "Roast beef", "Pastrami", "Salami", "Tuna", "Falafel"] },
  { label: "Cheese", items: ["Provolone", "Swiss", "Pepperjack", "Cheddar"] },
  { label: "Toppings", items: ["Avocado", "Tomato", "Onion", "Lettuce", "Mustard", "Mayo", "Sriracha"] },
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
  { k: "Delivery", v: "Grubhub · DoorDash · Uber Eats." },
];

const REVIEWS = [
  { q: "One of the best sandwiches I've ever tasted in my whole life.", who: "Yelp" },
  { q: "Convenient corner market with a gazillion items for just about any need.", who: "Yelp" },
  { q: "Really cute little corner store. I stop in about once a week on my walk home from BART.", who: "Yelp" },
  { q: "Hoodline Pick for Berkeley's 3 best grocery stores that won't break the bank.", who: "Hoodline" },
];

const HOURS = [
  ["Mon", "9am-10pm"],
  ["Tue", "9am-10pm"],
  ["Wed", "9am-10pm"],
  ["Thu", "9am-10pm"],
  ["Fri", "9am-10pm"],
  ["Sat", "9am-10pm"],
  ["Sun", "9am-10pm"],
];

Object.assign(window, { STORE, ORDER_LINKS, SANDWICHES, BUILD_OPTIONS, AISLES, FEATURES, REVIEWS, HOURS });
