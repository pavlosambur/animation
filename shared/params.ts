/** JSON of the tuned values, rounded so a slider's float noise does not leak into the defaults. */
export function serializeParams(params: object, decimals = 3): string {
  const factor = 10 ** decimals;
  return JSON.stringify(
    params,
    (_key, value: unknown) => (typeof value === "number" ? Math.round(value * factor) / factor : value),
    2,
  );
}
