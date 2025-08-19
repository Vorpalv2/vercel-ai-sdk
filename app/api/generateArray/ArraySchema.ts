import { z } from "zod";

export const PokemonSchema = z.object({
  name: z.string(),
  type: z.array(z.string()),
  species: z.string(),
  height: z.string(),
  weight: z.string(),
  abilities: z.array(z.string()),
  evolution: z.array(z.string()),
});
