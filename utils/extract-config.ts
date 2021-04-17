import { AirTableConfigModel, AirTableConfigModelExtended } from '../ts';

export const extractConfig = (
  config: AirTableConfigModel[],
): AirTableConfigModelExtended => {
  return config.reduce((accum, current) => {
    return {
      [current.key]:
        current.type === 'number' ? Number(current.value) : current.value,
      ...accum,
    };
  }, {} as AirTableConfigModelExtended);
};
