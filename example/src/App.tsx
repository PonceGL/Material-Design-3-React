import { Button } from "@ponci/material-design-3";
import "./example.css";
import "./styles.css";

export function App() {
  return (
    <main className="min-h-screen bg-md-surface px-6 py-10 text-md-on-surface">
      <section className="mx-auto flex max-w-4xl flex-col gap-8">
        <div className="space-y-3">
          <p className="text-sm font-medium text-md-primary">Material Design 3 React</p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-normal">
            Components inspired by Jetpack Compose, built for React.
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button>Filled</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="text">Text</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>
    </main>
  );
}
