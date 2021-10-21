import { KeyValue } from '@angular/common';

export enum SpecialInstruction {
  SafetyShoes = 'SafetyShoes',
  SafetyVest = 'SafetyVest',
  WashTrailer = 'WashTrailer',
  CleanTrailer = 'CleanTrailer',
  Nails = 'Nails',
  Straps = 'Straps',
  NoPicture = 'NoPicture'
}

export const SPECIALINSTRUCTIONS: KeyValue<SpecialInstruction, string>[] = [
  {
    key: SpecialInstruction.SafetyShoes,

    value: "url('../../../assets/images/safety_shoes.png')"
  },
  {
    key: SpecialInstruction.SafetyVest,

    value: "url('../../../assets/images/safety_vest.png')"
  },
  {
    key: SpecialInstruction.WashTrailer,

    value: "url('../../../assets/images/wash_trailer.png')"
  },
  {
    key: SpecialInstruction.Nails,

    value: "url('../../../assets/images/nails.png')"
  },
  {
    key: SpecialInstruction.Straps,

    value: "url('../../../assets/images/straps.png')"
  },
  {
    key: SpecialInstruction.CleanTrailer,

    value: "url('../../../assets/images/clean_trailer.png')"
  },
  {
    key: SpecialInstruction.NoPicture,

    value: ''
  }
];
