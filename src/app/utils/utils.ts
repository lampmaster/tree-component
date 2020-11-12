export function compare(a: string, b: string): number {
  const containNumber = [a, b].every(el => {
    return el.match(/(\d+)/g) !== null;
  });

  if (containNumber) {
    return Number(a.match(/(\d+)/g)[0]) - Number(b.match(/(\d+)/g)[0]);
  }

  return a.toLocaleLowerCase() > b.toLocaleLowerCase() ? 1 : -1;
}
