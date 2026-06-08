import { Button } from '@poncegl/material-design-3';

import './example.css';
import './styles.css';

export function App() {
  const exampleAction = () => {
    alert('Example action');
  };

  return (
    <main className="w-full min-h-screen bg-md-surface px-6 py-10 text-md-on-surface">
      <section className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-md-primary">
            Material Design 3 React
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-normal">
            Components inspired by Jetpack Compose, built for React.
          </h1>
        </div>

        <div className="w-full flex justify-center items-center gap-3">
          <Button onClick={exampleAction}>Filled</Button>
          <Button variant="elevated" onClick={exampleAction}>
            Elevated
          </Button>
          <Button variant="filled-tonal" onClick={exampleAction}>
            Filled Tonal
          </Button>
          <Button variant="outlined" onClick={exampleAction}>
            Outlined
          </Button>
          <Button variant="text" onClick={exampleAction}>
            Text
          </Button>
          <Button disabled onClick={exampleAction}>
            Disabled
          </Button>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-md-on-surface-variant">
            Elevation tokens
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="rounded-md-lg bg-md-surface-variant shadow-md-elevation-2 px-6 py-4">
              <p className="text-sm text-md-on-surface-variant">elevation-2</p>
              <p className="text-xs text-md-on-surface-variant/60">
                rounded-md-lg
              </p>
            </div>
            <div className="rounded-md-xl bg-md-surface-variant shadow-md-elevation-3 px-6 py-4">
              <p className="text-sm text-md-on-surface-variant">elevation-3</p>
              <p className="text-xs text-md-on-surface-variant/60">
                rounded-md-xl
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
