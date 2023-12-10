import { colors } from "./colors";

export const Offer_Types = {
  DISCOUNT: {
    title: "Discount Based",
    subtitle: "Reward customers with discounts.",
    eg: "eg.Flat 20%  or 40% OFF upto 100 ...etc"
  },
  COMPLIMENTARY: {
    title: "Complimentary  Based",
    subtitle: "Delight customers with complimentary items.",
    eg: " Buy 2 get 1 / Spend Rs150 and get free appetizer!"
  }
}

export const boostYourBusinessContent = [
  {
    title: "Unlock New Opportunities with Befree:",
    description: [
      "Showcase your exclusive discounts and complimentary offers on our app.",
      "Gain visibility among a vast user base in your local region."
    ]
  },
  {
    title: "Attract New Customers:",
    description: [
      "Reach potential customers actively seeking local deals and experiences.",
      "Increase foot traffic to your establishment through app-driven discovery."
    ]
  },
  // {
  //   title: "Leverage Limited-Time Offers:",
  //   description: [
  //     "Create a sense of urgency by featuring limited-time offers.",
  //     "Encourage customers to take immediate action and visit your business."
  //   ]
  // },
  // {
  //   title: "Promote Offers on Social Media:",
  //   description: [
  //     "Amplify your reach by having your offers promoted through our social media channels.",
  //     "Connect with a broader audience and drive engagement."
  //   ]
  // },
  // {
  //   title: "Encourage Repeat Business:",
  //   description: [
  //     "Provide attractive deals to incentivize repeat visits from satisfied customers.",
  //     "Enhance customer loyalty through rewarding and delightful experiences."
  //   ]
  // },
  {
    title: "Plan Events at Your Place:",
    description: [
      "Enable users to plan events at your establishment directly through the app.",
      "Increase reservations and bookings for parties, gatherings, and special occasions."
    ]
  },
  // {
  //   title: "By partnering with BeFree",
  //   description: [
  //     "you not only gain exposure to a wider audience but also establish a direct connection with users looking for unique and enticing experiences.",
  //     "Together, let's elevate your business and create memorable moments for our community!"
  //   ]
  // }
];


export const OffersWork = {
  Discount: ["Specify the Discount Percentage (min 10%, max 60%).%",
    "Decide whether there's a limit on the discount amount or if it's unlimited.",
    "Set the timing for when the discount offer is active, including start date.",
    "Set a minimum spending threshold or a minimum number of items that customers need to purchase to qualify for the discount."],

    Complimentary:[
      "Specify the Complimentary Item (eg tea,pizza,coffe,drinks,mojito ...etc).",
      "Set the Quantity of the complimentary item.",
      "Choose the timing for when the complimentary offer is active, including the start date.",
      "Set a minimum spending threshold or a minimum number of items that customers need to purchase to qualify for the complimentary item."],
    
  }

export const FAQS = {
  "What is Befree ?":
    "At Befree, you have the option to organize your activities by choosing from a variety of categories we provide. Additionally, you can connect with other individuals who have similar interests, making it a great platform for networking and meeting new people.",
  "Is Befree A Dating App ?":
    "No, Befree is not a dating app. It is a platform that focuses on helping users plan their activities based on various categories and connect with others who share similar interests. It promotes social interactions and networking but does not specifically target dating.",
  "Do we need to Pay ?":
    "Befree can be downloaded at no cost, and as of now, there are no charges applied to access any of its features",
  "Can Befree usefull to someone?":
    "Undoubtedly, Befree can be extremely useful in expanding your social networks and connecting with like-minded individuals. It provides an opportunity to explore society beyond the confines of social media platforms.",
};

const General = {
  "What's Befree all about?": "",
  "Can I build a real Connection here?": "",
  "How does it works?": "",
};

const ActivityQues = {
  "What is a Activity ?": "",
  "Is description is important ?": "",
  "How to plan an Activity ?": "",
  "What is Invite ?": "",
  "Can we have more than 2 members in a group ?": "",
  "Difference between Invite and Join ?": "",
  "What is Accept ?": "",
  "What is Pending ?": "",
  "How Edit Activity Works ?": "",
  "How Delete Activity Works": "",
  "How do I unmatch someone ?": "",
};

const Account = {
  "How do I create an account?":
    "You can create an account by choosing either the option to sign up with your 'Gmail account' or enter your 'phone number'.",
  "What information is required to set up an account??":
    "To set up an account, you will need to provide your name, date of birth (DOB), gender, and choose to sign up using either your Gmail account or phone number.",
  "Can I have multiple accounts/profiles?":
    "Yes, you can have multiple accounts/profiles. However, each account must be associated with a unique email address or phone number.",
  "Can I update initializing account details info?":
    "So among all initializing data you can update your name and profile pic from edit profile screen but  gender or dob are non editable.",
  "How to make our profile more attractive?": "",
  "What should be in Bio ?": "",
  "Is my personal information secure?":
    "Yes, we take the security and privacy of your personal information seriously. We have implemented measures to protect your data from unauthorized access. You can review our privacy policy for more details on how we handle and secure your information.",
  "How can I change my profile picture?": "",
  "Can I deactivate my account temporarily?": "",
  "How do I delete my account?":
    "To delete your account, please contact our customer support team or access the account settings section to find the account deletion option. Follow the provided instructions to permanently delete your account.",
};

export const allFaqs = {
  General: FAQS,
  Activity: ActivityQues,
  Account: Account,
};

export enum VIA {
  PHONE = "PHONE",
  GOOGLE = "GOOGLE",
  APPLE = "APPLE",
}

export const indianBeverages = [
  "Chai (Indian Tea)",
  "Lassi",
  "Masala Chai",
  "Filter Coffee",
  "Thandai",
  "Aam Panna",
  "Jal Jeera",
  "Kokum Juice",
  "Buttermilk (Chaas)",
  "Sugarcane Juice",
  "Rose Milk",
  "Badam Milk",
  "Nimbu Pani (Lemonade)",
  "Sattu Sharbat",
  "Bael Sherbet",
  "Kesar Pista Milk",
  "Bel Fruit Juice",
  "Shikanji",
  "Sol Kadhi",
  "Kala Khatta",
  "Rasam",
  "Kesari",
  "Panakam",
  "Kahwa",
  "Irani Chai",
  "Sambaram",
  "Kalaadi",
  "Kalaadi",
  "Falooda",
  "Sarbat",
  "Kala Khatta",
  "Kashmiri Kahwa",
  "Solkadhi",
  "Ragi Malt",
  "Ginger Tea",
  "Thandai",
  "Kesar Chai",
  "Khus Sharbat",
  "Tulsi Tea",
];

export const indianSweets = [
  "Gulab Jamun",
  "Rasgulla",
  "Jalebi",
  "Barfi",
  "Halwa",
  "Mysore Pak",
  "Rasmalai",
  "Malai Peda",
  "Sandesh",
  "Kheer",
  "Rajbhog",
  "Kaju Katli",
  "Gajar Ka Halwa",
  "Besan Ladoo",
  "Rice Kheer",
  "Laddu",
  "Petha",
  "Cham Cham",
  "Kalaadi",
  "Ghevar",
  "Imarti",
  "Son Papdi",
  "Kalakand",
  "Gujiya",
  "Coconut Ladoo",
  "Peda",
  "Gondh Ladoo",
  "Balushahi",
  "Chhena Poda",
  "Rasgulla",
  "Thekua",
  "Anarsa",
  "Patisa",
  "Modak",
  "Puran Poli",
  "Adhirasam",
  "Patishapta",
  "Chhena Gaja",
];

export const placestypes = ["Restaurant", "Pub", "Bar", "Cafe", "Fast Food"];

export const discount_styles = {
  10: { color: "#FFEB3B", fontSize: "1.4rem" }, // Less green yellowish
  15: { color: "#FFD54F", fontSize: "1.6rem" },
  20: { color: "#CDDC39", fontSize: "1.8rem" },
  25: { color: "#AFB42B", fontSize: "2.0rem" },
  30: { color: "#8BC34A", fontSize: "2.2rem" },
  35: { color: "#7CB342", fontSize: "2.4rem" },
  40: { color: "#4CAF50", fontSize: "2.6rem" },
  45: { color: "#43A047", fontSize: "2.8rem" },
  50: { color: "#388E3C", fontSize: "2.8rem" },
  55: { color: "#2E7D32", fontSize: "2.9rem" }, // Increased by 1rem
  60: { color: "#2E7D32", fontSize: "3.0rem" }, // Increased by 1rem
};



