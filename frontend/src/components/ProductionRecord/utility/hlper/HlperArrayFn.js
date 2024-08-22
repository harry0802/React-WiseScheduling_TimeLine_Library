/**
 * Removes items from array A that have matching ids in array B.
 * @param {Array} a - The source array containing all material information.
 * @param {Array} b - The array containing items whose ids should be matched and removed from A.
 * @returns {Array} - The filtered array, with all matching items removed.
 */
function removeMatchingItemsById(a, b) {
  if (!a || !b) return;

  // Create a Set to store the ids of each item in B
  const bIds = new Set(b.map((bItem) => bItem.id));

  // Filter A, removing any items whose id matches an id in B
  return a.filter((aItem) => !bIds.has(aItem.id));
}

export { removeMatchingItemsById };
