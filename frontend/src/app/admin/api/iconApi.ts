export type IconSearchResult = {
  name: string;
  prefix: string;
  iconName: string;
};

type IconifySearchResponse = {
  icons?: string[];
};

export async function searchIcons(query: string): Promise<IconSearchResult[]> {
  const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=24`);
  if (!response.ok) throw new Error("Unable to search icons.");

  const data = await response.json() as IconifySearchResponse;
  return (data.icons ?? []).flatMap((name) => {
    const separator = name.indexOf(":");
    if (separator < 1 || separator === name.length - 1) return [];

    return [{
      name,
      prefix: name.slice(0, separator),
      iconName: name.slice(separator + 1),
    }];
  });
}

export function iconifyUrl(name?: string | null, color = "#a5b4fc") {
  if (!name?.includes(":")) return null;

  const [prefix, iconName] = name.split(":");
  return `https://api.iconify.design/${encodeURIComponent(prefix)}/${encodeURIComponent(iconName)}.svg?color=${encodeURIComponent(color)}`;
}