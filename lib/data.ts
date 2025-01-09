export const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Select Plan" },
  { id: 3, name: "Add-ons" },
  { id: 4, name: "Summary" },
];

export const plans = [
  { id: "free", name: "Free", price: "$0/mo" },
  { id: "basic", name: "Basic", price: "$9/mo" },
  { id: "pro", name: "Pro", price: "$15/mo" },
];

export const addOns = [
  {
    id: "online",
    name: "Online Service",
    description: "Access to multiplayer games",
    price: "+$1/mo",
  },
  {
    id: "storage",
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    price: "+$2/mo",
  },
  {
    id: "profile",
    name: "Customizable Profile",
    description: "Custom theme on your profile",
    price: "+$2/mo",
  },
];
