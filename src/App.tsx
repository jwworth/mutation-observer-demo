import { useEffect, useState } from 'react';
import { generate } from 'random-words';
import './App.css';

const randomString = () => generate({ exactly: 2, join: '-' });

function App() {
  const [childCn, setChildCn] = useState(randomString());
  const [cn, setCn] = useState(randomString());
  const [injected, setInjected] = useState(false);

  const handleChangeChildCn = () => setChildCn(randomString());
  const handleChangeCn = () => setCn(randomString());
  const toggleInjected = () => setInjected(!injected);

  useEffect(() => {
    const targetNode = document.getElementById('injector-target');

    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        console.log(mutation);
      }
    };

    const observer = new MutationObserver(callback);

    // Attributes: change an attribute like class
    // Childlist: add or remove node
    // Subtree: Apply these settings to entire subtree of nodes rooted at target
    const config = { attributes: true, childList: true, subtree: true };
    observer.observe(targetNode, config);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1>MutationObserver Demo! 🔍</h1>

      <p>
        This app demonstrates JavaScript's{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver">
          MutationObserver API
        </a>
        . Click a button to console log a <code>MutationRecord</code>.
      </p>

      <div className="controls">
        <button onClick={handleChangeCn}>Change Class (attributes)</button>
        <button onClick={toggleInjected}>
          {injected ? 'Remove' : 'Inject'} Child Node (childList)
        </button>
        <button disabled={!injected} onClick={handleChangeChildCn}>
          Change Child Class (subtree)
        </button>
      </div>

      <div id="injector-target" className={cn}>
        <h3>Parent Node (class: "{cn}")</h3>

        {injected && (
          <div className={`injected-child ${childCn}`}>
            <h3>Injected Child Node (class: "{childCn}")</h3>
          </div>
        )}
      </div>

      <p>
        <small>
          <a href="https://github.com/jwworth/mutation-observer-demo">
            github.com/jwworth/mutation-observer-demo
          </a>
        </small>
      </p>
    </>
  );
}

export default App;
