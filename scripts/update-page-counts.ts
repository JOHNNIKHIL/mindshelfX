import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error("DATABASE_URL is not configured.");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

const PAGE_COUNTS: Record<string, number> = {
  'Tales from Shakespeare': 296,
  'The Alchemist': 181,
  'Principles in Maintaining a Godly Organization': 43,
  'Meditations': 223,
  'Before You Open Your Bible': 79,
  'The Art of Not Overthinking': 84,
  "Foxe's Christian Martyrs of the World": 590,
  'Jesus Christ: His Life and Teaching': 312,
  'The Unique Jesus: The Man and His Message': 26,
  'Dark Psychology Secrets & Manipulation': 175,
  'The Mountain Is You': 239,
  'Everything Is F*cked: A Book About Hope': 232,
  'Think and Grow Rich': 271,
  'The 48 Laws of Power': 430,
  'The Richest Man in Babylon': 155,
  '101 Ways to Boost Your Math Skills': 93,
  'Master Your Emotions': 210,
  'Atomic Habits': 260,
  'Rich Dad Poor Dad': 350,
  'You Can Heal Your Life': 224,
  'The Odyssey': 440,
  'The Psychology of Money': 238,
  "Don't Believe Everything You Think": 114,
  'The Complete Novels of Sherlock Holmes': 489,
  'The Diary of a CEO': 330,
  'Make Your Bed': 125,
  'The Power of Your Subconscious Mind': 256,
  'Good Vibes, Good Life': 272,
  'The Art of Being Alone': 127,
  'Same as Ever': 185,
  'Day by Day: Call to Mission': 66,
  "Called to Be a Soldier: Exploring the Soldier's Covenant": 81,
  'Dopamine Detox': 68,
  "Called to Be God's People": 137,
  'Stop Overthinking: 23 Techniques to Relieve Stress, Stop Negative Spirals, Declutter Your Mind, and Focus on the Present': 169,
  'Read This First: A Simple Guide to Getting the Most from the Bible': 124,
  "The World's Greatest Short Stories: 70 of the Finest Stories Ever Written": 640,
  'Ikigai: The Japanese Secret to a Long and Happy Life': 185,
  'The Ikigai Journey: A Practical Guide to Finding Happiness and Purpose the Japanese Way': 222,
  'The Republic': 336,
  'Life with Jesus: A Discipleship Course for Every Christian': 95,
  'Think Straight': 98,
  'The Art of Spending Money: Simple Choices for a Richer Life': 240,
  'The 7 Habits of Highly Effective People': 371,
  'The Power of a Positive Attitude': 112,
  'The Subtle Art of Not Giving a F*ck': 210,
  'How to Win Friends and Influence People': 192,
  "Today's Story of Jesus": 158
};

async function main() {
  console.log("Checking all 48 books before making changes...\n");

  const books = await prisma.book.findMany({
    select: { id: true, title: true, totalPages: true, pagesRead: true },
  });

  const byTitle = new Map(books.map((book) => [book.title, book]));
  const missing: string[] = [];
  const conflicts: string[] = [];

  for (const [title, totalPages] of Object.entries(PAGE_COUNTS)) {
    const book = byTitle.get(title);
    if (!book) missing.push(title);
    else if (book.pagesRead > totalPages)
      conflicts.push(`${title}: pagesRead=${book.pagesRead}, new total=${totalPages}`);
  }

  if (missing.length || conflicts.length) {
    if (missing.length) {
      console.error("Missing books:");
      missing.forEach((x) => console.error(`  - ${x}`));
    }
    if (conflicts.length) {
      console.error("\nUnsafe updates:");
      conflicts.forEach((x) => console.error(`  - ${x}`));
    }
    throw new Error("Validation failed. NO database changes were made.");
  }

  console.log("Validation passed: 48/48 books found and all page counts are safe.\n");
  console.log("Updating...\n");

  let done = 0;
  for (const [title, totalPages] of Object.entries(PAGE_COUNTS)) {
    const book = byTitle.get(title)!;

    if (book.totalPages === totalPages) {
      console.log(`[${++done}/48] SKIP  ${title} — already ${totalPages} pages`);
      continue;
    }

    await prisma.book.update({
      where: { id: book.id },
      data: { totalPages },
    });

    console.log(`[${++done}/48] OK    ${title} — ${book.totalPages} → ${totalPages}`);
  }

  console.log("\nDone. Only totalPages was modified.");
}

main()
  .catch((error) => {
    console.error("\nERROR:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
