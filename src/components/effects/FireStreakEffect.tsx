import { useEffect, useState } from 'react';
import Lottie from 'lottie-react';

export function FireStreakEffect() {
  const [animationData, setAnimationData] = useState<any>(null);
  const fireAnimationUrl =
    'https://lottie.host/b14cf9e9-2a6f-4a7a-b0a5-8c0f9e4f4e3b/NG4n3YU51z.json';

  useEffect(() => {
    fetch(fireAnimationUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load animation');
        return response.json();
      })
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Error loading fire animation:', err));
  }, []);

  if (!animationData) return null;

  return (
    <div className="absolute inset-[-20px] pointer-events-none z-0 overflow-visible">
      {/* Top Fire */}
      <div className="absolute -top-8 left-0 right-0 h-24 flex justify-around">
        {[...Array(3)].map((_, i) => (
          <div key={`top-${i}`} className="w-20 h-20 rotate-180">
            <Lottie animationData={animationData} loop={true} />
          </div>
        ))}
      </div>

      {/* Bottom Fire */}
      <div className="absolute -bottom-8 left-0 right-0 h-24 flex justify-around">
        {[...Array(3)].map((_, i) => (
          <div key={`bottom-${i}`} className="w-20 h-20">
            <Lottie animationData={animationData} loop={true} />
          </div>
        ))}
      </div>

      {/* Left Fire */}
      <div className="absolute -left-8 top-0 bottom-0 w-24 flex flex-col justify-around">
        {[...Array(3)].map((_, i) => (
          <div key={`left-${i}`} className="w-20 h-20 rotate-90">
            <Lottie animationData={animationData} loop={true} />
          </div>
        ))}
      </div>

      {/* Right Fire */}
      <div className="absolute -right-8 top-0 bottom-0 w-24 flex flex-col justify-around">
        {[...Array(3)].map((_, i) => (
          <div key={`right-${i}`} className="w-20 h-20 -rotate-90">
            <Lottie animationData={animationData} loop={true} />
          </div>
        ))}
      </div>

      {/* Corner Fires */}
      <div className="absolute -top-6 -left-6 w-16 h-16 rotate-[135deg]">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="absolute -top-6 -right-6 w-16 h-16 -rotate-[135deg]">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="absolute -bottom-6 -left-6 w-16 h-16 rotate-45">
        <Lottie animationData={animationData} loop={true} />
      </div>
      <div className="absolute -bottom-6 -right-6 w-16 h-16 -rotate-45">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
}
