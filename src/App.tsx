import { useEffect, useState } from 'react';
import { generate } from 'random-words';
import './App.css';

const randomString = () => generate({ exactly: 2, join: '-' });

function App() {
  const [cn, setCn] = useState(randomString());
  const [injected, setInjected] = useState(false);
  const [title, setTitle] = useState(randomString());

  const handleChangeCn = () => setCn(randomString());
  const handleChangeTitle = () => setTitle(randomString());
  const toggleInjected = () => setInjected(!injected);

  useEffect(() => {
    const targetNode = document.getElementById('injector-target');
    const config = { attributes: true, childList: true, subtree: true };

    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        console.log(mutation);
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1>MutationObserver Demo! 🔍</h1>

      <p>
        The purpose of this app is to demonstrate JavaScript's{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
          MutationObserver API
        </a>{' '}
        and inspire practical applications. Produce a{' '}
        <code>MutationRecord</code> in the devtools console by clicking a button
        or editing the the HTML in the devtools elements tab.
      </p>
      <small>
        <a href="https://github.com/jwworth/mutation-observer-demo">
          github.com/jwworth/mutation-observer-demo
        </a>
      </small>

      <div className="controls">
        <button onClick={toggleInjected}>
          {injected ? 'Remove' : 'Inject'} Node
        </button>
        <button onClick={handleChangeCn}>Change Class</button>
        <button onClick={handleChangeTitle}>Change Title</button>
      </div>

      <div id="injector-target" className={cn} title={title}>
        <h3>
          Parent Node (id: "injector-target" class: "{cn}", title: "{title}")
        </h3>

        {injected && (
          <div className="injected-child">
            <h3>Injected Child Node</h3>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
