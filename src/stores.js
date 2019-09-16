import { writable } from "svelte/store";

export const validationSchema = writable({}, () => {
  console.log("subscribe");

  return () => console.log("unsubscribe");
});
export const form = writable({});
export const errors = writable({});
