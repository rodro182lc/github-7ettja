export enum TemperatureTypes {
  Celsius = 'Celsius',
  Fahrenheit = 'Fahrenheit'
}

export const TEMPERATURE_TYPES = new Map<TemperatureTypes, string>();
TEMPERATURE_TYPES.set(TemperatureTypes.Celsius, 'C');
TEMPERATURE_TYPES.set(TemperatureTypes.Fahrenheit, 'F');
