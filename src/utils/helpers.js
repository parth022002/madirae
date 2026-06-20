export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatPercent(value) {
  return `${value}% ABV`;
}

export function slugify(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
