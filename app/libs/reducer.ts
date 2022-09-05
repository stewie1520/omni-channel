import type { Draft } from "immer";
import produce from "immer";

export function reducer<S extends Record<string, unknown>>(
  handlers: Record<
    string,
    <P extends Partial<S>>(draft: Draft<S>, payload: P) => void
  >
): (state: S, action: { type: string; payload: Partial<S> }) => S {
  const innerReducer = (action: { type: string; payload: Partial<S> }) =>
    produce<S>((draft) => {
      const recipe = handlers[action.type];
      return recipe(draft, action.payload);
    });

  return (state, action) => {
    return innerReducer(action)(state);
  };
}
