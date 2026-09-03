export function groupByToMap<T, K>(
  items: readonly T[],
  getKey: (item: T) => K,
): Map<K, T[]> {
  const grouped = new Map<K, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = grouped.get(key) ?? [];

    group.push(item);
    grouped.set(key, group);
  }

  return grouped;
}
