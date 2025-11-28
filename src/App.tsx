import { useEffect } from 'react';
import { ScrollOrchestrator } from './components/ScrollOrchestrator';
import { SplitLayout } from './components/SplitLayout';
import { CuriosityView } from './components/CuriosityView';
import { FormalView } from './components/FormalView';
import { useTheme } from '@/hooks/useTheme';
import { ScrollProgressBar } from './components/layout/ScrollProgressBar';
import { GoogleAnalytics } from './components/GoogleAnalytics';

function App(): JSX.Element {
  const { theme } = useTheme();

  useEffect(() => {
    // Add skip link for accessibility
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    document.body.insertBefore(skipLink, document.body.firstChild);
  }, []);

  return (
    <div className="min-h-screen" data-theme={theme}>
      <GoogleAnalytics />
      <ScrollProgressBar />
      <ScrollOrchestrator />
      <main id="main-content">
        <SplitLayout curiosity={<CuriosityView />} formal={<FormalView />} />
      </main>
    </div>
  );
}

export default App;
