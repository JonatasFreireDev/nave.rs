export function clearObject(obj: Object): Object {
  const array = Object.entries(obj).filter(line => line[1] !== '');

  const newObject = array.reduce((accumulador, currentValue) => {
    return { ...accumulador, [currentValue[0]]: currentValue[1] };
  }, {});

  return newObject;
}
