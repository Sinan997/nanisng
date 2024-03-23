import { baseClassName, colorClasses } from './constants';

export function updateButtonColor(list: string[], newColor: string) {
  return list
    .filter((className) => !colorClasses.some((color) => className.includes(color)))
    .concat(baseClassName + '-' + newColor);
}
