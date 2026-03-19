import { Brain, PenTool, Palette, GraduationCap } from "lucide-react";

export default function IntroSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6 text-purple-600" />,
      title: "Cognitive Growth",
      description: "Specially crafted puzzles to enhance logic and problem-solving.",
      bgColor: "bg-purple-100",
    },
    {
      icon: <PenTool className="w-6 h-6 text-blue-600" />,
      title: "Skill Mastery",
      description: "From fine motor skills in tracing to advanced writing techniques.",
      bgColor: "bg-blue-100",
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-600" />,
      title: "Vibrant Engagement",
      description: "Colorful, kid-friendly illustrations that keep children focused and excited.",
      bgColor: "bg-pink-100",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-green-600" />,
      title: "Curriculum Aligned",
      description: "Perfect for home-schooling, classroom supplements, or weekend brain workouts.",
      bgColor: "bg-green-100",
    },
  ];

  return (
    <section className="mb-12 md:mb-16 rounded-[2rem] bg-white shadow-sm border border-zinc-100 overflow-hidden">
      <div className="px-6 py-12 md:py-16 md:px-12 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-zinc-900 mb-6 leading-tight">
          <span className="inline-block mr-2">🌟</span>Unlock the Joy of Learning: Welcome to Brain Teasers!<span className="inline-block ml-2">🌟</span>
        </h1>
        <h2 className="text-xl md:text-2xl font-bold text-red-600 mb-8 tracking-wide">
          Where Curiosity Meets Creativity
        </h2>
        <p className="text-lg md:text-xl text-zinc-600 leading-relaxed">
          At Brain Teasers, we believe that every child is a natural-born explorer. Our mission is to transform "study time" into "adventure time." Through our meticulously designed workbooks—like the fan-favorites <span className="font-semibold text-zinc-800">"Brain Teasers for Juniors"</span> and <span className="font-semibold text-zinc-800">"The Write Direction"</span>—we help children develop the foundational skills they need while keeping their imagination firing on all cylinders.
        </p>
      </div>

      <div className="bg-gradient-to-b from-zinc-50 to-zinc-100/50 border-t border-zinc-100 px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4">
              Why Parents & Educators Love Our Workbooks
            </h3>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Our educational resources aren't just about filling in blanks; they are about building bridges to better thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bgColor}`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-xl text-zinc-900 mb-3">{feature.title}</h4>
                <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
