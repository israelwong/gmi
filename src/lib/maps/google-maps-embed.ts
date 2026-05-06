/** Google Maps en iframe (sin API key; formato `output=embed`). */
export function googleMapsEmbedSrc(lat: number, lon: number, zoom = 17) {
  const params = new URLSearchParams({
    q: `${lat},${lon}`,
    z: String(zoom),
    hl: "es",
    output: "embed",
  });
  return `https://www.google.com/maps?${params.toString()}`;
}

/** Misma consulta que el embed, en pestaña nueva (p. ej. `?q=lat,lon`). */
export function googleMapsExternalUrl(lat: number, lon: number) {
  const params = new URLSearchParams({ q: `${lat},${lon}` });
  return `https://www.google.com/maps?${params.toString()}`;
}
