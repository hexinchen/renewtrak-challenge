import { GlossaryTerm } from "./glossary.model";

export let glossaryData: GlossaryTerm[] = [
  {
    id: Math.floor(Math.random() * 100000).toString(),
    term: "abyssal plain",
    definition: "The ocean floor offshore from the continental, usually very flat with a slight slope."
  },
  {
    id: Math.floor(Math.random() * 100000).toString(),
    term: "accrete",
    definition: "v. To add terranes (small land masses or pieces of crust) to another, usually larger, land mass."
  },
  {
    id: Math.floor(Math.random() * 100000).toString(),
    term: "alkaline",
    definition: "Term pertaining to a highly basic, as opposed to acidic, subtance. For example, hydroxide or carbonate of sodium or potassium."
  }
];
