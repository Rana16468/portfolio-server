import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { User } from "../user/user.modal";
import { TSkills } from "./skills.interface";
import { Skill } from "./skills.model";
import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 300, 
  checkperiod: 60,
});

export const CACHE_KEYS = {
  ALL_BLOGS: "all-blogs",
  SINGLE_BLOG: (id: string) => `blog-${id}`,

  ALL_PROJECT_DETAILS: "all-project-details",
  PROJECT_DETAILS_BY_PROJECT: (projectId: string) =>
    `project-details-by-project-${projectId}`,

  ALL_SKILLS: "all-skills",
  SINGLE_SKILL: (id: string) => `skill-${id}`,
};

const createSkillIntoDb = async (payload: TSkills, id: string) => {
  const isUserExist = await User.isUserExistByPortfolio(id);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const result = await Skill.create(payload);

  
  cache.del(CACHE_KEYS.ALL_SKILLS);

  return result;
};

const findAllSkillsIntoDb = async () => {
  const cached = cache.get(CACHE_KEYS.ALL_SKILLS);
  if (cached) {
    return cached;
  }

  const result = await Skill.find();

  cache.set(CACHE_KEYS.ALL_SKILLS, result);

  return result;
};

const findSpecificSkillsIntoDb = async (id: string) => {
  const cacheKey = CACHE_KEYS.SINGLE_SKILL(id);

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const result = await Skill.findById(id);

  if (result) {
    cache.set(cacheKey, result);
  }

  return result;
};

const updateSkillsFromDb = async (
  payload: Partial<TSkills>,
  userId: string,
  id: string
) => {
  const isUserExist = await User.isUserExistByPortfolio(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const isSkillsExist = await Skill.findById(id);
  if (!isSkillsExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Skills Information Not Exist",
      ""
    );
  }

  const result = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  // পুরনো ক্যাশ মুছে দিলাম
  cache.del(CACHE_KEYS.ALL_SKILLS);
  cache.del(CACHE_KEYS.SINGLE_SKILL(id));

  // নতুন ডেটা দিয়ে সাথে সাথেই re-cache করে দিলাম
  if (result) {
    cache.set(CACHE_KEYS.SINGLE_SKILL(id), result);
  }

  return result;
};

const deleteSkillsFromDb = async (userId: string, id: string) => {
  const isUserExist = await User.isUserExistByPortfolio(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const result = await Skill.deleteOne({ _id: id });

 
  cache.del(CACHE_KEYS.ALL_SKILLS);
  cache.del(CACHE_KEYS.SINGLE_SKILL(id));

  return result;
};

export const SkillsServices = {
  createSkillIntoDb,
  findAllSkillsIntoDb,
  findSpecificSkillsIntoDb,
  updateSkillsFromDb,
  deleteSkillsFromDb,
};