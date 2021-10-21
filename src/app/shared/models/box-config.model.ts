import { GenericOption } from './generic-option.model';

export interface BoxConfig {
  id: string;

  // To show wheather the h1 is strikethrough
  h1Strikethrough: boolean;
  // Texts shown on the box in order
  h1: string;
  h2: string;
  h3: string;
  // To show whether the box is active
  active: boolean;
  // To show whether the box is selected
  selected: boolean;
  // To tell the box is the first on an list therefore it should not show de connector
  isFirst: boolean;
  // To enable the add option functionality
  canAdd: boolean;
  // Array of options to display on the 'add button' overlay
  options?: GenericOption[];
}
