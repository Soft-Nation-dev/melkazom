// =========================================================================
// WEDDING DETAILS CONFIGURATION (#Melkazom)
// Edit all wedding information in this single place!
// =========================================================================

export interface WeddingConfig {
  couple: {
    groom: {
      fullName: string;
      shortName: string;
      father: string;
      origin: string;
    };
    bride: {
      fullName: string;
      shortName: string;
      father: string;
      origin: string;
    };
    hashtag: string;
    themeTitle: string;
  };
  event: {
    date: string;
    dayOfWeek: string;
    dateISO: string; // Used for countdown
    church: {
      name: string;
      time: string;
      location: string;
      state: string;
      address: string;
      mapUrl: string;
      image?: string;
    };
    reception: {
      hall: string;
      center: string;
      time: string;
      location: string;
      state: string;
      address: string;
      mapUrl: string;
      image?: string;
    };
  };
  palette: {
    title: string;
    description: string;
    colors: { name: string; hex: string; note: string }[];
  };
  quote: {
    title: string;
    text: string;
    author: string;
  };
  itinerary: {
    time: string;
    title: string;
    subtitle: string;
    icon: string;
  }[];
  menu: {
    starter: { title: string; desc: string };
    main: { title: string; desc: string };
    dessert: { title: string; desc: string };
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  accommodations: {
    name: string;
    description: string;
    distance: string;
    bookingUrl: string;
  }[];
}

export const WEDDING_CONFIG: WeddingConfig = {
  couple: {
    groom: {
      fullName: "Melford Chinwendu Ugwu",
      shortName: "Melford",
      father: "Mr. & Mrs. Joseph Ugwu",
      origin: "Nsukka Local Government Area, Enugu State"
    },
    bride: {
      fullName: "Chiazokam Faith Okagu",
      shortName: "Chiazokam",
      father: "Mr. & Mrs. Charles Okagu",
      origin: "Igbo-Etiti Local Government Area, Enugu State"
    },
    hashtag: "#Melkazom",
    themeTitle: "A Symphony of Everlasting Grace"
  },
  event: {
    date: "4th January 2027",
    dayOfWeek: "Monday",
    dateISO: "2027-01-04T10:00:00",
    church: {
      name: "Christ the King Church",
      time: "10:00 AM",
      location: "Enugu, Nigeria",
      state: "Enugu State",
      address: "Christ the King Catholic Church, Ogui Road / Independence Layout, Enugu, Nigeria",
      mapUrl: "https://maps.google.com/?q=Christ+the+King+Church+Enugu+Nigeria"
    },
    reception: {
      hall: "Amadeo Hall",
      center: "Amadeo Event Center",
      time: "01:00 PM",
      location: "Enugu, Nigeria",
      state: "Enugu State",
      address: "Amadeo Event Center, Beside Services Commission, Enugu, Nigeria",
      mapUrl: "https://maps.google.com/?q=Amadeo+Event+Center+Enugu+Nigeria"
    }
  },
  palette: {
    title: "Colors of the Day",
    description: "Guests are warmly encouraged to celebrate with us in our wedding color palette:",
    colors: [
      { name: "Emerald Forest", hex: "#0E3B2E", note: "Royal Green" },
      { name: "Champagne Gold", hex: "#D4AF37", note: "Luxe Gold" },
      { name: "Warm Ivory", hex: "#F7F3EB", note: "Soft Pearl" },
      { name: "Dusty Rose", hex: "#D8A49B", note: "Floral Accent" }
    ]
  },
  quote: {
    title: "Why This Is Special",
    text: "“I wanted to create something a little different — something deeply personal that tells the story of two hearts uniting under God’s grace. Two families from Nsukka and Igbo-Etiti brought together by love, ready to embark on forever.”",
    author: "Melford & Chiazokam"
  },
  itinerary: [
    {
      time: "10:00",
      title: "CHURCH CEREMONY",
      subtitle: "Solemnization of Holy Matrimony at Christ the King Church",
      icon: "church"
    },
    {
      time: "13:00",
      title: "GRAND RECEPTION & LUNCH",
      subtitle: "Join us at Amadeo Hall for sumptuous dining & celebratory music",
      icon: "utensils"
    },
    {
      time: "15:30",
      title: "TOASTS & CAKE CUTTING",
      subtitle: "First dance, speeches, cutting of the cake & champagne toast",
      icon: "glass"
    },
    {
      time: "17:00",
      title: "PARTY & CELEBRATION",
      subtitle: "Let yourself go! Dancing, laughter and everlasting memories",
      icon: "sparkles"
    },
    {
      time: "19:30",
      title: "CARRIAGES",
      subtitle: "All good things come to an end — farewell & heartfelt appreciation",
      icon: "moon"
    }
  ],
  menu: {
    starter: {
      title: "Nigerian Small Chops & Peppered Bites",
      desc: "Puff-puff, mosa, spicy chicken, peppered gizzard and golden plantain"
    },
    main: {
      title: "A Feast of Nigerian Classics",
      desc: "Smoky party jollof, native rice, pounded yam with egusi and oha soup, served with peppered chicken, beef and fish"
    },
    dessert: {
      title: "Nigerian Sweets & Tropical Fruit",
      desc: "Chin chin, coconut candy, fresh pineapple, watermelon and chilled zobo"
    }
  },
  faqs: [
    {
      question: "Can I bring a Plus One?",
      answer: "Due to venue capacity, only guests explicitly listed on the invitation card can be accommodated. Please check your RSVP details."
    },
    {
      question: "Can I bring my children?",
      answer: "Absolutely — children are warmly welcome to celebrate with us. Please include them in your guest count when completing your RSVP."
    },
    {
      question: "Is there parking available at Amadeo Event Center?",
      answer: "Yes, complimentary secure parking with protocol and security personnel is available on-site at Amadeo Event Center."
    },
    {
      question: "What is the dress code?",
      answer: "Black Tie / Elegant Traditional Attire adhering to our color palette (Emerald Green, Champagne Gold, and Warm Ivory)."
    },
    {
      question: "When should I RSVP by?",
      answer: "Kindly submit your RSVP on this website on or before 1st December 2026 to ensure proper seating and catering."
    }
  ],
  accommodations: [
    {
      name: "Nike Lake Resort Hotel",
      description: "Picturesque lakeside accommodation, 15 minutes from venue",
      distance: "Enugu, Nigeria",
      bookingUrl: "https://nikelakeresorthotel.com"
    },
    {
      name: "Golden Royale Hotel",
      description: "Luxury city hotel close to Christ the King & Amadeo Hall",
      distance: "Independence Layout, Enugu",
      bookingUrl: "https://goldenroyalehotel.com"
    }
  ]
};
