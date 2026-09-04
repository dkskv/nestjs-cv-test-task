export function groupByManyToMap<T, K>(
  items: readonly T[],
  getKeys: (item: T) => Iterable<K>,
): Map<K, T[]> {
  const grouped = new Map<K, T[]>();

  for (const item of items) {
    for (const key of getKeys(item)) {
      const group = grouped.get(key) ?? [];

      group.push(item);
      grouped.set(key, group);
    }
  }

  return grouped;
}
