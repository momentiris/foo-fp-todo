import axios from 'axios';
import { useEffect } from 'react';

const fooFetch = (): Promise<Array<Record<string, unknown>>> =>
  fetch('https://www.fishwatch.gov/api/species/red-snapper').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

function App() {
  useEffect(() => {
    axios.get('/todos').then(console.log, console.log);
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center"></div>
  );
}

export default App;
