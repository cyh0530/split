export function listContainsIgnoreCase(
  list: string[],
  compare: string
): boolean {
  return list.map(item => item.toLocaleLowerCase()).includes(compare.toLocaleLowerCase())
}
