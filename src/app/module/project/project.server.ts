import httpStatus from "http-status";
import NodeCache from "node-cache";
import AppError from "../../error/AppError";
import { User } from "../user/user.modal";
import { TProjects } from "./project.interface";
import { Project } from "./project.model";
import mongoose from "mongoose";
import { Projectdetail } from "../projectdetails/projectdetails.model";

// stdTTL: default cache lifetime in seconds (5 min here), checkperiod: cleanup interval
const projectCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });

const CACHE_PREFIX = "projects:page:";


const invalidateProjectListCache = () => {
    const keys = projectCache.keys().filter((k) => k.startsWith(CACHE_PREFIX));
    projectCache.del(keys);
};

const getPaginatedProjects = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        Project.find()
            .sort({ createdAt: -1 }) // Descending order (newest first)
            .skip(skip)
            .limit(limit),
        Project.countDocuments(),
    ]);

    return {
        meta: {
            page,
            limit,
            total,
            totalPage: Math.ceil(total / limit),
        },
        data,
    };
};



// clears old cache, then immediately re-fetches & re-caches page 1
const refreshProjectListCache = async () => {
    invalidateProjectListCache();
    await getPaginatedProjects(1, 10); // default page & limit
};

const createProjectIntoDb = async (payload: TProjects, id: string) => {
    const isExistUser = await User.isUserExistByPortfolio(id);
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
    }
    const isProjectAlredyExist = await Project.findOne({
        code: payload.code,
        demo: payload.demo,
        server: payload.server,
    });
    if (isProjectAlredyExist) {
        throw new AppError(httpStatus.FOUND, "This Project is Alredy Exist", "");
    }

    const projectBuilder = new Project(payload);
    const result = await projectBuilder.save();

    await refreshProjectListCache();

    return result;
};

const findAllProjectIntoDb = async (query: Record<string, unknown> = {}) => {
   

    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.max(Number(query.limit) || 10, 1);
    const cacheKey = `${CACHE_PREFIX}${page}:${limit}`;

    const cached = projectCache.get(cacheKey);
    if (cached) {
        return cached;
    }

    return await getPaginatedProjects(page, limit);
};

const findBySpecificProjectIntoDb = async (id: string) => {
    return await Project.findById(id);
};

const updateProjectFromDb = async (
    payload: Partial<TProjects>,
    userId: string,
    id: string
) => {
    const isExistUser = await User.isUserExistByPortfolio(userId);
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
    }
    const isExistProject = await Project.findById(id);
    if (!isExistProject) {
        throw new AppError(httpStatus.NOT_FOUND, "This Project Not Exist", "");
    }

    const result = await Project.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });

    await refreshProjectListCache();

    return result;
};

const deleteProjectFromDb = async (userId: string, id: string) => {
    const isExistUser = await User.isUserExistByPortfolio(userId);
    if (!isExistUser) {
        throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
    }
    // started transaction roll back
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const result = await Project.deleteOne({ _id: id }, { session });
        if (!result) {
            throw new AppError(httpStatus.NOT_FOUND, "Project Session Failed", "");
        }
        const prodectDetails = await Projectdetail.deleteOne(
            { project: id },
            { session }
        );
        if (!prodectDetails) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Project Details Session is Failed",
                ""
            );
        }

        await session.commitTransaction();
        await session.endSession();

        await refreshProjectListCache();

        return prodectDetails;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
    }
};

export const ProjectServices = {
    createProjectIntoDb,
    findAllProjectIntoDb,
    findBySpecificProjectIntoDb,
    updateProjectFromDb,
    deleteProjectFromDb,
};