export type TTask = {
  id: string;
  title: string;
  description: string;
  state: "todo" | "in-progress" | "done";
};
