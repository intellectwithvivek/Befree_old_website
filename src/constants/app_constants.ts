import { colors } from "./colors";

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

export const discount_color = {
  10: "#ffbf00",
  20: "#1E90FF",
  30: "#FFD700",
  40: "#DC143C",
  50: "#CE2029",
  60: "#39FF14",
};
