// Sources
// http://www.wiseoldsayings.com/party-quotes/

const quotes = [
  {
    quote: "Good parties create a temporary youthfulness.",
    author: "Mason Cooley"
  },
  {
    quote: "Spring is nature's way of saying, \"Let's party!\"",
    author: "Robin Williams"
  },
  {
    quote:
      "That's what life is all about: Let's have a party. Let's have it tonight.",
    author: "Lilly Pulitzer"
  },
  {
    quote: "Life is a party. Dress for it.",
    author: "Audrey Hepburn"
  },
  {
    quote:
      "You gotta have life your way. If you ain't losing your mind, you ani't partying right.",
    author: "Stephanie Clifford"
  },
  {
    quote: "Never miss a party... good fro the nerves, like celery.",
    author: "Scott Fitzgerald"
  },
  {
    quote: "Parties are the nightly ritual fo the sophisticated society.",
    author: "Dominick Dunne"
  },
  {
    quote: "A little party neve killed nobody.",
    author: "Fergie"
  },
  {
    quote: "It's not about going to a party. It's life as a party.",
    author: "Diane Von Furstenberg"
  },
  {
    quote: "Live to work. Work to party. Party to live.",
    author: "Yevgen Reztsov"
  },
  {
    quote: "Study hard, but party harder.",
    author: "Nicole Polizzi"
  },
  {
    quote:
      "My advice for life: dance and sing your song while the party is still on.",
    author: "Rasheed Ogunlaru"
  },
  {
    quote:
      "One cannot have too large a party. A large party secures its own amusement",
    author: "Jane Austen"
  },
  {
    quote: "Live for today, plan for tomorrow, party tonight!",
    author: "Drake"
  },
  {
    quote:
      "When life gives you lemons, find someone who has vodka and throw a party.",
    author: "Charith Thilina"
  },
  {
    quote: "Partying is such sweet sorrow.",
    author: "Robert Byme"
  }
];

const randomQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};
export { randomQuote };
