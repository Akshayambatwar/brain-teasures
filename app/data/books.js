export const books = [
  {
    id: 1,
    title: "Brain Teasers Volume 1",
    author: "Nilshree Yelulkar",
    description:
      "A comprehensive guide to mastering complex problems through creative thinking and systematic approaches. This book teaches you how to break down challenging puzzles and find elegant solutions.",
    fullDescription: `Unlock endless fun with Brain Teasers Volume 1 – the ultimate printed workbook for kids aged 7-12. This book is a powerhouse that packs engaging worksheets designed to sharpen critical thinking, logical reasoning, social skills, map reading, and language practice. It transforms screen time into brain-boosting adventures. Watch your child build problem-solving confidence through puzzles, riddles, and interactive challenges that foster creativity and focus. Aligned with the school curriculum, these versatile skill worksheets make learning addictive. Ideal for after-school enrichment, weekend productive engagement, rainy days, or travel. Order a copy – no prior prep needed!
Key Features: 150 worksheets across topics apt for Critical thinking, logic, social & map skills.`,
    price: 499,
    isShipping: "+ Shipping",
    images: [
      "/books/Brain_teasers-latest-1.png",
      "/books/Brain_teasers-latest-2.png",
      // "/books/Landing-Img-1.png",
    ],
    landingImage: "/books/Vol1_Landing.png",
  },
  {
    id: 2,
    title: "Brain Teasers for Juniors",
    author: "Nilshree Yelulkar",
    description:
      "Challenge your mind with over 200 carefully crafted logic puzzles designed to sharpen your reasoning skills. Perfect for puzzle enthusiasts looking to take their problem-solving abilities to the next level.",
    fullDescription: `Boost IQ and skills today – order Brain Teasers for Juniors. Brain Teasers for Juniors sparks early genius with tailored worksheets for kids aged 5-7. There are over age- appropriate 90 activity sheets that are fun-packed. These worksheets help build foundational skills like basic logic, patterns, colors, shapes, and simple problem-solving. Parents will adore how it turns playtime into smart growth. These no-fuss pages encourage fine motor skills, attention, and confidence without overwhelming young minds. Perfect for preschoolers, kindergarten prep, or home learning.
Key features: 90+ Logic, patterns, and early reasoning worksheets for ages 5-7.`,
    price: 249,
    isShipping: "+ Shipping",
    images: [
      "/books/Brain-teasers-For-Juniors-1.png",
      "/books/Brain-teasers-For-Juniors-2.png",
      // "/books/Landing-Img-2.png",
    ],
    landingImage: "/books/Juniors_Landing.png",
  },
  {
    id: 3,
    title: "The Write Direction",
    author: "Nilshree Yelulkar",
    description:
      "Learn to think critically and make better decisions in every aspect of life. This book provides practical frameworks and real-world examples to help you develop sharper analytical skills.",
    fullDescription: `Guide young imaginations skyward with The Write Direction – a workbook comprising 50+ worksheets based on creative writing for kids aged 6 and above. This enchanting book ignites storytelling magic, teaching grammar, sentence structure, and aesthetic flair through prompts, exercises, and fun challenges. From journaling ideas to crafting tales, your child hones expression, vocabulary, and creativity in bite-sized, illustrated pages. The Write Direction supports school English curriculum and builds long-lasting literacy skills. `,
    price: 149,
    isShipping: "+ Shipping",
    images: [
      "/books/The-Write-Direction-New-Img-1.png",
      "/books/The-Write-Direction-New-Img-2.png",
      "/books/The-Write-Direction-New-Img-3.png",
    ],
    landingImage: "/books/Landing-Img-3.png",
  },
  {
    id: 4,
    title: "Brain Teasers: Visual Detective",
    author: "Nilshree Yelulkar",
    description:
      "Visual discrimination activity book, observation puzzles for kids, brain teaser workbooks. Sharpen focus, attention, and critical thinking.",
    fullDescription: `Target Age: 4–9 Years | Format: A5 Size, Spiral Bound (Lies Flat)

Key Learning Benefits: Visual Discrimination, Focus & Attention, Critical Thinking, Logic & Reasoning

Product Description:

Looking for engaging observation puzzles for kids? Brain Teasers: Visual Detective turns screen time into skill-building time! Packed with find-the-clue challenges, pattern matching, and odd-one-out activities, this visual discrimination activity book sharpens focus, attention, and critical thinking. Designed in a compact A5 spiral-bound format, the pages lie completely flat so young learners can write, draw, and solve comfortably at home or on the go. Perfect for preschoolers, kindergartners, and early elementary students.`,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Visual_Detective.png"],
    landingImage: "/books/Brain_Teasers_Visual_Detective.png",
  },
  {
    id: 5,
    title: "Brain Teasers: Smart Hearts",
    author: "Nilshree Yelulkar",
    description:
      "Social emotional learning activity book, SEL workbooks for kids, emotions and feelings activity book. Nurture kindness and emotional growth.",
    fullDescription: `Target Age: 4–9 Years | Format: A5 Size, Spiral Bound (Lies Flat)

Key Learning Benefits: Emotional Intelligence, Self-Awareness, Empathy, Social Skills

Product Description:

Nurture kindness and emotional growth with Brain Teasers: Smart Hearts, an essential social emotional learning (SEL) activity book for young children. Featuring fun, relatable worksheets, this workbook helps kids understand emotions, manage feelings, build strong relationships, and make thoughtful decisions. The durable A5 spiral binding provides a flat, hassle-free surface for writing, coloring, and self-reflection. An ideal learning tool for parents, educators, and counselors supporting early childhood emotional intelligence.`,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Smart_Hearts.png"],
    landingImage: "/books/Brain_Teasers_Smart_Hearts.png",
  },
  {
    id: 6,
    title: "Brain Teasers: Color with a Twist",
    author: "Nilshree Yelulkar",
    description:
      "Spot the difference coloring book, educational coloring book for kids, fine motor skills workbook. Combine creative expression with critical thinking!",
    fullDescription: `Target Age: 4–9 Years | Format: A5 Size, Spiral Bound (Lies Flat)

Key Learning Benefits: Fine Motor Skills, Observation, Creative Expression, Visual Comparison

Product Description:

Combine creative expression with critical thinking! Brain Teasers: Color with a Twist is an educational spot-the-difference coloring book that goes beyond standard coloring pages. Children observe, compare, and discover hidden details while practicing fine motor control and visual analysis. Thanks to the lie-flat A5 spiral-bound spine, kids enjoy a smooth, lay-flat coloring experience without fighting stubborn book folds—making it the perfect travel activity book for children ages 4 to 9.`,
    price: 129,
    isShipping: "+ Shipping",
    images: ["/books/Brain_Teasers_Color_with_a_Twist.png"],
    landingImage: "/books/Brain_Teasers_Color_with_a_Twist.png",
  },
];

export function getBookById(id) {
  return books.find((book) => book.id === parseInt(id));
}
