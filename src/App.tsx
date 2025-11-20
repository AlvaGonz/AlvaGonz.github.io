import { useEffect } from 'react';
import { ScrollOrchestrator } from './components/ScrollOrchestrator';
import { SplitLayout } from './components/SplitLayout';
import { CreativeView } from './components/CreativeView';
import { FormalView } from './components/FormalView';

function App(): JSX.Element {
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
      <ScrollOrchestrator />
      <main id="main-content">
        <SplitLayout
          creative={<CreativeView />}
          formal={<FormalView />}
        />
      </main>
    </div>
  );
}

export default App;

