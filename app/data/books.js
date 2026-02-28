export const books = [
  {
    id: 1,
    title: "Brain Teasers Volume 1",
    author: "Nilshree Yelulkar",
    description: "A comprehensive guide to mastering complex problems through creative thinking and systematic approaches. This book teaches you how to break down challenging puzzles and find elegant solutions.",
    fullDescription: `Unlock endless fun with Brain Teasers Volume 1 – the ultimate printed workbook for kids aged 7-12. This book is a powerhouse that packs engaging worksheets designed to sharpen critical thinking, logical reasoning, social skills, map reading, and language practice. It transforms screen time into brain-boosting adventures. Watch your child build problem-solving confidence through puzzles, riddles, and interactive challenges that foster creativity and focus. Aligned with the school curriculum, these versatile skill worksheets make learning addictive. Ideal for after-school enrichment, weekend productive engagement, rainy days, or travel. Order a copy – no prior prep needed!
Key Features: 174 worksheets across topics apt for Critical thinking, logic, social & map skills.`,
    price: 499,
    isShipping: '+ Shipping',
    images: [
      "/books/Brain-Teasers-Volume-1-New-Img-1.png",
      "/books/Brain-Teasers-Volume-1-New-Img-2.jpg",
      "/books/Landing-Img-1.png",
    ],
    landingImage : "/books/Landing-Img-1.png"
  },
  {
    id: 2,
    title: "Brain Teasers for Juniors",
    author: "Nilshree Yelulkar",
    description: "Challenge your mind with over 200 carefully crafted logic puzzles designed to sharpen your reasoning skills. Perfect for puzzle enthusiasts looking to take their problem-solving abilities to the next level.",
    fullDescription: `Boost IQ and skills today – order Brain Teasers for Juniors. Brain Teasers for Juniors sparks early genius with tailored worksheets for kids aged 5-7. There are over age- appropriate 90 activity sheets that are fun-packed. These worksheets help build foundational skills like basic logic, patterns, colors, shapes, and simple problem-solving. Parents will adore how it turns playtime into smart growth. These no-fuss pages encourage fine motor skills, attention, and confidence without overwhelming young minds. Perfect for preschoolers, kindergarten prep, or home learning.
Key features: 90+ Logic, patterns, and early reasoning worksheets for ages 5-7.`,
    price: 249,
    isShipping: '+ Shipping',
    images: [
      "/books/Brain-teasers-For-Juniors-1-New-Img-1.png",
      "/books/Brain-teasers-For-Juniors-1-New-Img-2.png",
      "/books/Landing-Img-2.png",
    ],
    landingImage : "/books/Landing-Img-2.png"

  },
  {
    id: 3,
    title: "The Write Direction",
    author: "Nilshree Yelulkar",
    description: "Learn to think critically and make better decisions in every aspect of life. This book provides practical frameworks and real-world examples to help you develop sharper analytical skills.",
    fullDescription: `Guide young imaginations skyward with The Write Direction – a workbook comprising 50+ worksheets based on creative writing for kids aged 6 and above. This enchanting book ignites storytelling magic, teaching grammar, sentence structure, and aesthetic flair through prompts, exercises, and fun challenges. From journaling ideas to crafting tales, your child hones expression, vocabulary, and creativity in bite-sized, illustrated pages. The Write Direction supports school English curriculum and builds long-lasting literacy skills. `,
    price: 149,
    isShipping: '+ Shipping',
    images: [
      "/books/The-Write-Direction-New-Img-1.png",
      "/books/The-Write-Direction-New-Img-2.png",
      "/books/The-Write-Direction-New-Img-3.png",

    ],
    landingImage : "/books/Landing-Img-3.png"

  },
];

export function getBookById(id) {
  return books.find((book) => book.id === parseInt(id));
}

