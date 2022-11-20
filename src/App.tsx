import { pipe } from 'fp-ts/lib/function';
import * as TE from 'fp-ts/TaskEither';

const fooFetch = (): Promise<Array<Record<string, unknown>>> =>
  fetch('https://www.fishwatch.gov/api/species/red-snapper').then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json();
  });

const foo = () =>
  pipe(
    TE.tryCatchK(fooFetch, (reason) => new Error(`${reason}`))(),
    TE.map((n) => n[0])
  )();

function App() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <header className="flex w-full max-w-md flex-col items-center">
        <h1 className="text-2xl font-bold">
          Hello Iteam + React + Typescript!
        </h1>
        <img
          src="https://cdn-assets-cloud.frontify.com/local/frontify/eyJwYXRoIjoiXC9wdWJsaWNcL3VwbG9hZFwvc2NyZWVuc1wvMTUzOTg2XC9lZWNmNjExMDg1YTI1YWM0MTIzZGE3NmY4M2EzZTdkNi0xNTEyNzI5Mzk3LnBuZyJ9:frontify:ANleqg1_q50wrm-EmaePRoqAtTkpInN90J70KGuqUbU?width=449"
          alt="logo"
        />
      </header>
    </div>
  );
}

export default App;
