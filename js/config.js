/**
 * Romantic Configuration & Personalization Data
 * Easy-to-edit file for all personal details, texts, reasons, and memories.
 */

const ROMANTIC_CONFIG = {
  // Names
  partnerName: "Riddhima",
  senderName: "pranit",
  signature: "pranit ❤️",

  // Relationship Start Date (YYYY-MM-DD format in local calendar)
  startDate: "2026-10-03",

  // 1. Welcome Screen
  welcome: {
    badge: "A Dedicated Tribute",
    title: "For Riddhima, with love — pranit ❤️",
    intro: "Welcome to our special corner of the world. A gentle sanctuary celebrating your light, our shared moments, and all the love in my heart.",
    buttonText: "Open My Heart ✨"
  },

  // Hero Section
  hero: {
    badge: "Forever & Always",
    subtitle: "Across every language, every universe, and every whisper of time — my heart beats only for you.",
    replayButtonText: "Replay Heart Animation"
  },

  // 2. Relationship Day Counter
  counter: {
    title: "Our Love Story",
    pastMessageTemplate: "I have loved you for",
    futureMessageTemplate: "Counting down every heartbeat until our day",
    milestoneDisplay: "October 3, 2026"
  },

  // 3. Personal Love Letter
  letter: {
    envelopePrompt: "Click to open the letter 💌",
    salutation: "My Dearest Riddhima,",
    paragraphs: [
      "From the moment you entered my life, you brought a warmth and softness that I didn't even realize was missing. You have this quiet way of turning the simplest conversations into something I cherish for days.",
      "I love the genuine kindness you carry, the effortless peace I feel when we speak, and how being around you makes everything else feel calm and centered.",
      "This website is my small tribute to you—a collection of thoughts, memories, and appreciation for the beautiful person you are.",
      "Thank you for being my constant smile, my comfort, and my favorite thought at the start and end of every single day."
    ],
    closing: "Yours with all my heart,",
    signature: "pranit ❤️"
  },

  // 4. Reasons I Love You (At least 10 editable, sincere starter reasons)
  reasons: [
    {
      id: 1,
      title: "Your Gentle Smile",
      description: "How your genuine smile can instantly soften the hardest day and fill my world with warmth."
    },
    {
      id: 2,
      title: "Your Kind Soul",
      description: "The compassion and empathy you naturally show towards everyone around you."
    },
    {
      id: 3,
      title: "Our Comfort In Silence",
      description: "How even the quiet moments between us feel completely safe, natural, and peaceful."
    },
    {
      id: 4,
      title: "Your Thoughtful Heart",
      description: "The way you notice little things and care with a sincerity that is so rare to find."
    },
    {
      id: 5,
      title: "How You Make Me Laugh",
      description: "Your effortless sense of humor and the silly moments that leave us smiling for hours."
    },
    {
      id: 6,
      title: "Being Truly Understood",
      description: "The feeling of complete trust and understanding whenever I share my thoughts with you."
    },
    {
      id: 7,
      title: "Your Grace & Strength",
      description: "The calm dignity and emotional strength you carry yourself with every day."
    },
    {
      id: 8,
      title: "Your Spark When You're Passionate",
      description: "The way your eyes light up whenever you talk about things and ideas you love."
    },
    {
      id: 9,
      title: "Making Every Day Special",
      description: "How ordinary routines become memorable simply because I get to share them with you."
    },
    {
      id: 10,
      title: "My Safe Haven",
      description: "Knowing that no matter where the day takes me, thinking of you brings me straight home."
    },
    {
      id: 11,
      title: "Your Patient Understanding",
      description: "The patience and gentleness you bring into conversations, always choosing love first."
    },
    {
      id: 12,
      title: "Simply You",
      description: "Because there is no one else in this universe like you, Riddhima. You are uniquely yourself."
    }
  ],

  // 5. Memories Gallery Placeholders
  // Instructions: Place image files in the 'images/' folder and update filenames here.
  memories: [
    {
      id: 1,
      filename: "images/memory-1.jpg",
      title: "Our First Walk Together",
      date: "A Cherished Afternoon",
      caption: "The start of countless unforgettable conversations under the open sky.",
      alt: "Memory photo: Our first walk together"
    },
    {
      id: 2,
      filename: "images/memory-2.jpg",
      title: "Walking Side By Side",
      date: "Under The Night Lights",
      caption: "Walking together into the night, where every step beside you feels like home.",
      alt: "Memory photo: Pranit and Riddhima walking side by side at night"
    },
    {
      id: 3,
      filename: "images/memory-3.jpg",
      title: "Flowers & Sweet Kisses",
      date: "A Moment To Treasure",
      caption: "A bouquet in hand, a gentle kiss on your cheek, and a heart that is completely yours.",
      alt: "Memory photo: Pranit kissing Riddhima on the cheek holding flowers"
    },
    {
      id: 4,
      filename: "images/memory-4.jpg",
      title: "A Kiss Under The Night Sky",
      date: "Midnight Magic",
      caption: "In the quiet stillness of the night, when the world faded away and it was just the two of us.",
      alt: "Memory photo: Pranit and Riddhima kissing under the night sky"
    }
  ],

  // 6. Final Romantic Closing Message
  closingMessage: "Every little thing leads me back to you, Riddhima. — pranit ❤️"
};

// Expose globally for browser usage and testing
if (typeof window !== 'undefined') {
  window.ROMANTIC_CONFIG = ROMANTIC_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ROMANTIC_CONFIG;
}
