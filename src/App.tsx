import { useEffect } from 'react';
import { ScrollOrchestrator } from '@/components/ScrollOrchestrator';
import { SplitLayout } from '@/components/layout/SplitLayout';
import { CuriosityView } from '@/features/curiosity/CuriosityView';
import { FormalView } from '@/features/formal/FormalView';
import { useTheme } from '@/hooks/useTheme';
import { ScrollProgressBar } from '@/components/layout/ScrollProgressBar';

function App(): JSX.Element {
  useTheme();

  useEffect(() => {
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }, []);

  return (
    <div className="min-h-screen">
      <ScrollProgressBar />
      <ScrollOrchestrator />
      <main id="main-content">
        <SplitLayout Curiosity={<CuriosityView />} Formal={<FormalView />} />
      </main>
    </div>
  );
}

export default App;
