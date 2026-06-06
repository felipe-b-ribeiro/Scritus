import { pullTagsRepository } from "../repositories/tagsRepository.js";

export const pullTags = async (_req, res) => {
  try {
    const tags = await pullTagsRepository();

    res.status(200).json({ tags });
  } catch (err) {
    console.error("[PULL TAGS CONTROLLER ERROR]: ", err);
    res.status(500).json({ error: err.message });
  }
};
