import z from "zod";

export const LearningSchema = z.object({
  technologyName: z.string(),
  technologiesToLearn: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
    })
  ),
  steps: z.array(z.string()),
});
