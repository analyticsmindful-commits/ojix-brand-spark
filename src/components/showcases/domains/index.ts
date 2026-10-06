import type { DomainBlueprintConfig, DomainId, DomainIdAlias } from "./types";
import { SHOWCASE_DOMAINS } from "./data";

export * from "./types";
export * from "./data";

/**
 * Resolves a domain ID or alias to the canonical DomainId.
 * Maps 'enterprise-erp' to 'industrial-erp'.
 */
export function resolveDomainId(id: DomainIdAlias): DomainId {
  if (id === "enterprise-erp") return "industrial-erp";
  return id;
}

/**
 * Retrieves the blueprint configuration for a given domain ID or alias.
 */
export function getDomainBlueprint(id: DomainIdAlias): DomainBlueprintConfig {
  const canonicalId = resolveDomainId(id);
  return SHOWCASE_DOMAINS[canonicalId];
}
