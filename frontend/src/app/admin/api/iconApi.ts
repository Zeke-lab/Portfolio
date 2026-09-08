export type IconSearchResult = {
  name: string;
  prefix: string;
  iconName: string;
};

export const FEATURED_ICONS: IconSearchResult[] = [
  { name: "simple-icons:claude", prefix: "simple-icons", iconName: "claude" },
  { name: "simple-icons:openai", prefix: "simple-icons", iconName: "openai" },
  { name: "mdi:google", prefix: "mdi", iconName: "google" },
];

type IconifySearchResponse = {
  icons?: string[];
};

export async function searchIcons(query: string): Promise<IconSearchResult[]> {
  const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=24`);
  if (!response.ok) throw new Error("Unable to search icons.");

  const data = await response.json() as IconifySearchResponse;
  return (data.icons ?? []).sort((left, right) => {
    const leftPriority = left.startsWith("simple-icons:") ? 0 : 1;
    const rightPriority = right.startsWith("simple-icons:") ? 0 : 1;
    return leftPriority - rightPriority;
  }).flatMap((name) => {
    const separator = name.indexOf(":");
    if (separator < 1 || separator === name.length - 1) return [];

    return [{
      name,
      prefix: name.slice(0, separator),
      iconName: name.slice(separator + 1),
    }];
  });
}

