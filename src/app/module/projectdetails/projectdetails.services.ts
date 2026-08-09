import httpStatus from "http-status";
import { User } from "../user/user.modal";
import { TProjectDetails } from "./projectdetails.interface";
import AppError from "../../error/AppError";
import { Project } from "../project/project.model";
import { Projectdetail } from "./projectdetails.model";

// src/app/utils/cache.ts
import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 300, // 5 মিনিট
  checkperiod: 60,
});

export const CACHE_KEYS = {
  ALL_BLOGS: "all-blogs",
  SINGLE_BLOG: (id: string) => `blog-${id}`,

  ALL_PROJECT_DETAILS: "all-project-details",
  PROJECT_DETAILS_BY_PROJECT: (projectId: string) =>
    `project-details-by-project-${projectId}`,
};

const createProjectDetailsIntoDb = async (
  payload: TProjectDetails,
  id: string
) => {
  const isExistUser = await User.isUserExistByPortfolio(id);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const isProjectExist = await Project.findById(payload.project);
  if (!isProjectExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This Project Not Exist", "");
  }

  const buildProjectdetails = new Projectdetail(payload);
  const result = await buildProjectdetails.save();

  cache.del(CACHE_KEYS.ALL_PROJECT_DETAILS);
  cache.del(
    CACHE_KEYS.PROJECT_DETAILS_BY_PROJECT(payload.project.toString())
  );

  return result;
};

const findAllProjectDetailsIntoDb = async () => {
  const cached = cache.get(CACHE_KEYS.ALL_PROJECT_DETAILS);
  if (cached) {
    return cached;
  }

  const result = await Projectdetail.find().populate("project");

  cache.set(CACHE_KEYS.ALL_PROJECT_DETAILS, result);

  return result;
};

const findBySpecificProjectDetailsIntoDb = async (id: string) => {
  const cacheKey = CACHE_KEYS.PROJECT_DETAILS_BY_PROJECT(id);

  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }

  const result = await Projectdetail.findOne({ project: id }).populate(
    "project"
  );

  if (result) {
    cache.set(cacheKey, result);
  }

  return result;
};

const updateProjectDetailsFromDb = async (
  payload: Partial<TProjectDetails>,
  userId: string,
  id: string
) => {
  const isExistUser = await User.isUserExistByPortfolio(userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const isProjectDeatisExist = await Projectdetail.findById(id);
  if (!isProjectDeatisExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Project Details is Not Exist",
      ""
    );
  }

  const result = await Projectdetail.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  cache.del(CACHE_KEYS.ALL_PROJECT_DETAILS);
  cache.del(
    CACHE_KEYS.PROJECT_DETAILS_BY_PROJECT(
      isProjectDeatisExist.project.toString()
    )
  );
  if (payload.project) {
    cache.del(CACHE_KEYS.PROJECT_DETAILS_BY_PROJECT(payload.project.toString()));
  }

  return result;
};

const deleteProjectDetailsFromDb = async (userId: string, id: string) => {
  const isExistUser = await User.isUserExistByPortfolio(userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const isExistProjectDetails = await Projectdetail.findById(id);

  const result = await Projectdetail.deleteOne({ _id: id });

  cache.del(CACHE_KEYS.ALL_PROJECT_DETAILS);
  if (isExistProjectDetails) {
    cache.del(
      CACHE_KEYS.PROJECT_DETAILS_BY_PROJECT(
        isExistProjectDetails.project.toString()
      )
    );
  }

  return result;
};

export const ProjectDetailsService = {
  createProjectDetailsIntoDb,
  findAllProjectDetailsIntoDb,
  findBySpecificProjectDetailsIntoDb,
  updateProjectDetailsFromDb,
  deleteProjectDetailsFromDb,
};
