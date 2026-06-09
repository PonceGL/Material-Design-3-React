---
trigger: always_on
---

Every test in this project follows the **Arrange → Act → Assert** structure. Each phase is a distinct block of code; never mix phases.

**Arrange** — declare all inputs, render the component, and set up mocks before any interaction.
**Act** — perform exactly one user interaction or side-effect trigger (click, keyboard event, state change). Omit this phase entirely for pure rendering tests.
**Assert** — one or more `expect()` calls that verify the outcome. Never add setup or interaction code after the first `expect`.

```tsx
it('forwards onClick handler', async () => {
  // Arrange
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click</Button>);

  // Act
  await userEvent.click(screen.getByRole('button'));

  // Assert
  expect(onClick).toHaveBeenCalledOnce();
});
```

For rendering-only tests (no interaction), Act is omitted and the structure collapses to Arrange + Assert:

```tsx
it('applies the md3-button base class', () => {
  render(<Button>Shape</Button>);
  expect(screen.getByRole('button')).toHaveClass('md3-button');
});
```

**One behavior per test.** Each `it()` block tests a single, named behavior. If a test needs two `await userEvent.*` calls, it is likely two tests.

**Describe blocks group by concern, not by file section.** Use: `Rendering`, `Props`, `Icons`, `States`, `Accessibility`. See `Button.test.tsx` as the canonical reference.

**AAA for axe-core tests:** Arrange is `render()`; there is no Act; Assert is `expect(results.violations).toHaveLength(0)`. Run one axe audit per variant.

```tsx
it('has no axe violations — filled variant', async () => {
  const { container } = render(<Button variant="filled">Label</Button>);
  const results = await axe.run(container);
  expect(results.violations).toHaveLength(0);
});
```

Use `it.each` to run the same assertion over all variants rather than copying the test body.
