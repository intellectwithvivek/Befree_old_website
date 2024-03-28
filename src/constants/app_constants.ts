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


export const addPlaceInstructions = ["Search your place or nearby location",
  "Upload an image of your place",
  "Add Place Name and Owners name",
   "Select Type of place (restaurant/bar/pub/cafe ..etc)"
  ,"Check the remaining details (state,region,country,zipcode) & submit"]

  export const beFreeInformation = {
    "About BeFree": {
      content:
        "At BeFree, we've reimagined the way people connect and plan their outings. Founded by a group of passionate and visionary individuals, our platform goes beyond discovering offers — it's a space where users can plan events at their favorite places and invite others to join them. We believe in creating meaningful connections and unforgettable experiences for both users and merchants.",
    },
    "Mission": {
      content:
        "Our mission is to revolutionize the way people experience their cities. By providing a platform where users can not only discover great deals but also plan and host events, we're shaping a community where connections flourish, and experiences are cherished.",
    },
    "What Sets Us Apart?": {
      content: [
        {
          title: "Event Planning Redefined",
          description: "BeFree empowers users to take charge of their social calendar by seamlessly planning events at their preferred places. Whether it's a casual meet-up at a local cafe or a lively night out at a pub, our platform makes event planning effortless",
          url:require('../assets/images/event.png')  
        },
        {
          title: "Building Connections",
          description: "We're more than just a deals platform; we're a community hub. BeFree facilitates connections between people, making every event an opportunity to forge new friendships.",
          url:require('../assets/images/connection.png')
        },
        {
          title: "Empowering Merchants",
          description: "From a merchant's perspective, BeFree provides a unique platform. Showcase your venue for events, attract a dynamic crowd, and enhance visibility. Utilize our tools and insights to create engaging experiences, maximizing your business potential and fostering customer loyalty.",
          url:require('../assets/images/growth.png')
        },
      ],
    },
    "Meet the Team": {
      content:
        "BeFree is the brainchild of a team of passionate individuals led by Akshay. We're a group of crazy, hardworking individuals committed to expanding our reach and ensuring that every Event on our platform is a success."
    },
    "Get Involved": {
      content:
        "Join us on this exciting journey of connection and experience creation. Merchants, showcase your venue for events and attract a dynamic crowd. Users, plan your next memorable event and invite others to join you. Together, let's build a community where every event is an opportunity to connect and create lasting memories.",
    },
    "Contact Us": {
      content:
        "Have questions or feedback? Reach out to us at [Your Email Address]. Follow us on [Social Media Links] for the latest updates and special announcements.",
    },
    "Thank You": {
      content:
        "Thank you for being a part of BeFree. Let's connect, plan, and create experiences together!",
    },
  };
  

export const activityReviews = [
    {
      name:'ABS Saurabh',
      title: "Cycling Adventure",
      image: "abs.jpg",
      location:'Noida',
      review:
        "Planned a spontaneous cycling adventure using the app and connected with some fantastic people who shared the same passion. The ride was not just about bikes; it was about creating lasting memories with new friends!",
    },
    {
      name:'Prashant',
      title: "Trekking Expedition",
      image: "prashant.jpg",
      location:'Noida',
      review:
        "Organized a trekking expedition through the app and ended up hiking with an incredible group. The breathtaking views were matched only by the camaraderie. A perfect blend of adventure and friendship!",
    },
    {
      name:'Sneha',
      title: "House Party Extravaganza",
      image: "sneha.jpg",
      location:'Lucknow',
      review:
        "Threw a last-minute house party using the app, and it turned out to be an absolute blast! Met new people, danced the night away, and now have a bunch of friends to plan more events with. Cheers to spontaneous fun!",
    },
    {
      name:'Vivek',
      title: "Exploring the Town Together",
      image: "vivek.jpg",
      location:'Indore',
      review:
        "Explored the town with fellow explorers through the app. From hidden gems to local favorites, every discovery was shared with an amazing group. Connecting with like-minded individuals made the experience even more enjoyable!",
    },
    {
      name:'Arun',
      title: "Badminton Matchup",
      image: "kari.jpg",
      location:'Pune',
      review:
        "Set up a quick badminton game on the app, and within minutes, had a group ready to play. The friendly competition was a blast, and I left not just with a workout but also with new friends to challenge next time!",
    },
    {
      name:'Shilpa',
      title: "Movie Night with New Faces",
      image: "shilpa.jpg",
      location:'Pune',
      review:
        "Planned a movie night through the app and was joined by some awesome individuals. The film was great, but the best part was the post-movie discussions and laughs. Movie nights are so much better with newfound friends!",
    },
    {
      name:'Sarthak',
      title: "Comedy Show Laughter Fest",
      image: "sarthak.jpg",
      location:'Pune',
      review:
        "Attended a comedy show with a group of strangers-turned-friends. The shared laughter created an instant bond. Thanks to the app, I not only enjoyed the show but also gained some wonderful connections!",
    },
    {
      name:'Rituraj',
      title: "Travel Buddies Unite",
      image: "badshah.jpg",
      location:'Rishikesh',
      review:
        "Used the app to plan a spontaneous trip and found travel buddies who were as excited about exploring as I was. From sightseeing to trying local cuisines, every moment was made better by the company of these amazing people!",
    },
    {
      name:'Baba',
      title: "Concert Squad Goals",
      image: "baba.jpg",
      location:'Goa',
      review:
        "Planned to attend a concert through the app and formed a concert squad of music enthusiasts. The energy at the event was contagious, and sharing the experience with newfound friends made it an unforgettable night!",
    },
    {
      name:'Abhilasha',
      title: "Cafe Hopping Social",
      image: "chicks.jpg",
      location:'Hyderabad',
      review:
        "Went cafe hopping with a group of coffee and tea lovers I connected with on the app. Each cafe stop was a new adventure, and the conversations flowed as smoothly as the brews. An afternoon well spent with great company!",
    },
  ];
  

