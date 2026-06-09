function getDeterministicHash(str) {
  let hash = 0;
  if (!str) return hash;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

const titles = [
  "beca excelencia académica bcp",
  "beca generación del bicentenario",
  "beca alianza del pacífico",
  "becas fundación carolina"
];

titles.forEach(t => {
  console.log(t, getDeterministicHash(t) % 9);
});
