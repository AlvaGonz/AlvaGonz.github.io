import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function FireStreakEffect() {
    const fireAnimationUrl = 'https://lottie.host/b14cf9e9-2a6f-4a7a-b0a5-8c0f9e4f4e3b/NG4n3YU51z.json';

    return (
        <div className="absolute inset-[-20px] pointer-events-none z-0 overflow-visible">
            {/* Top Fire */}
            <div className="absolute -top-8 left-0 right-0 h-24 flex justify-around">
                {[...Array(3)].map((_, i) => (
                    <DotLottieReact
                        key={`top-${i}`}
                        src={fireAnimationUrl}
                        loop
                        autoplay
                        style={{
                            width: '80px',
                            height: '80px',
                            transform: 'rotate(180deg)'
                        }}
                    />
                ))}
            </div>

            {/* Bottom Fire */}
            <div className="absolute -bottom-8 left-0 right-0 h-24 flex justify-around">
                {[...Array(3)].map((_, i) => (
                    <DotLottieReact
                        key={`bottom-${i}`}
                        src={fireAnimationUrl}
                        loop
                        autoplay
                        style={{
                            width: '80px',
                            height: '80px'
                        }}
                    />
                ))}
            </div>

            {/* Left Fire */}
            <div className="absolute -left-8 top-0 bottom-0 w-24 flex flex-col justify-around">
                {[...Array(3)].map((_, i) => (
                    <DotLottieReact
                        key={`left-${i}`}
                        src={fireAnimationUrl}
                        loop
                        autoplay
                        style={{
                            width: '80px',
                            height: '80px',
                            transform: 'rotate(90deg)'
                        }}
                    />
                ))}
            </div>

            {/* Right Fire */}
            <div className="absolute -right-8 top-0 bottom-0 w-24 flex flex-col justify-around">
                {[...Array(3)].map((_, i) => (
                    <DotLottieReact
                        key={`right-${i}`}
                        src={fireAnimationUrl}
                        loop
                        autoplay
                        style={{
                            width: '80px',
                            height: '80px',
                            transform: 'rotate(-90deg)'
                        }}
                    />
                ))}
            </div>

            {/* Corner Fires for fuller effect */}
            <DotLottieReact
                src={fireAnimationUrl}
                loop
                autoplay
                className="absolute -top-6 -left-6"
                style={{ width: '60px', height: '60px', transform: 'rotate(135deg)' }}
            />
            <DotLottieReact
                src={fireAnimationUrl}
                loop
                autoplay
                className="absolute -top-6 -right-6"
                style={{ width: '60px', height: '60px', transform: 'rotate(-135deg)' }}
            />
            <DotLottieReact
                src={fireAnimationUrl}
                loop
                autoplay
                className="absolute -bottom-6 -left-6"
                style={{ width: '60px', height: '60px', transform: 'rotate(45deg)' }}
            />
            <DotLottieReact
                src={fireAnimationUrl}
                loop
                autoplay
                className="absolute -bottom-6 -right-6"
                style={{ width: '60px', height: '60px', transform: 'rotate(-45deg)' }}
            />
        </div>
    );
}
