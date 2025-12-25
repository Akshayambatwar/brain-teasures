export const books = [
  {
    id: 1,
    title: "The Art of Problem Solving",
    author: "John Smith",
    description: "A comprehensive guide to mastering complex problems through creative thinking and systematic approaches. This book teaches you how to break down challenging puzzles and find elegant solutions.",
    fullDescription: "In this groundbreaking book, John Smith takes you on a journey through the art and science of problem-solving. Whether you're facing challenges in your career, personal life, or academic pursuits, this comprehensive guide provides you with the tools and techniques needed to tackle even the most complex problems with confidence. Through real-world examples, practical exercises, and step-by-step methodologies, you'll learn to think outside the box and develop solutions that are both creative and effective.",
    price: 24.99,
    images: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 2,
    title: "Mind Benders: Advanced Logic Puzzles",
    author: "Sarah Johnson",
    description: "Challenge your mind with over 200 carefully crafted logic puzzles designed to sharpen your reasoning skills. Perfect for puzzle enthusiasts looking to take their problem-solving abilities to the next level.",
    fullDescription: "Sarah Johnson presents an exceptional collection of over 200 mind-bending logic puzzles that will challenge even the most seasoned puzzle solvers. Each puzzle is carefully designed to test different aspects of logical reasoning, from pattern recognition to deductive thinking. With varying difficulty levels, this book is perfect for both beginners and experts. Complete with detailed solutions and explanations, Mind Benders will help you develop sharper analytical skills while providing hours of engaging entertainment.",
    price: 19.99,
    images: [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1200&fit=crop",
    ],
  },
  {
    id: 3,
    title: "Critical Thinking Mastery",
    author: "Michael Chen",
    description: "Learn to think critically and make better decisions in every aspect of life. This book provides practical frameworks and real-world examples to help you develop sharper analytical skills.",
    fullDescription: "Michael Chen's Critical Thinking Mastery is a comprehensive guide to developing the analytical skills needed to navigate today's complex world. Through practical frameworks, real-world case studies, and interactive exercises, you'll learn to evaluate information critically, identify logical fallacies, and make well-reasoned decisions. This book covers everything from basic reasoning principles to advanced analytical techniques, making it an essential resource for students, professionals, and anyone looking to enhance their cognitive abilities.",
    price: 27.99,
    images: [
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=1200&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop",
    ],
  },
];

export function getBookById(id) {
  return books.find((book) => book.id === parseInt(id));
}

