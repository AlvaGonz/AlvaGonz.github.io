import { GithubStats } from '@/components/github/GithubStats';

export function AboutCuriosity() {
  return (
    <section id="about" className="space-y-12">
      <div>
        <h2 className="text-4xl font-bold mb-6 font-axiforma text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">The Debate</h2>
        <div className="space-y-8 text-lg leading-relaxed max-w-3xl">
          <p className="text-secondary-pistachio">
            I exist in two worlds, and I've learned to love the tension between them.
          </p>

          <div className="border-l-4 border-purple-500 pl-6 py-2 bg-purple-500/5 rounded-r-lg">
            <p className="italic text-primary-anti-flash-white">
              "One side of me wants to paint beautiful interfaces, craft pixel-perfect designs,
              and create digital experiences that delight the senses."
            </p>
          </div>

          <div className="border-l-4 border-primary-mountain-meadow pl-6 py-2 bg-primary-mountain-meadow/5 rounded-r-lg">
            <p className="italic text-primary-anti-flash-white">
              "The other side lives for algorithms, system design, the elegant solutions hiding
              in backend complexity, and the satisfaction of solving hard problems."
            </p>
          </div>

          <p className="text-secondary-pistachio">
            Instead of choosing between them, I'm learning to bridge them.
            That's where the real innovation happens—where creativity meets logic,
            where art collides with engineering.
          </p>
        </div>
      </div>

      <GithubStats />
    </section>
  );
}

