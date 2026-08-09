import httpStatus from "http-status";
import { User } from "../user/user.modal";
import { TBlog } from "./blog.interface";
import AppError from "../../error/AppError";
import { Blog } from "./blog.mode";
import NodeCache from "node-cache";

export const cache = new NodeCache({
  stdTTL: 300, 
  checkperiod: 60,
});


export const CACHE_KEYS = {
  ALL_BLOGS: "all-blogs",
  SINGLE_BLOG: (id: string) => `blog-${id}`,
};

const createBlogIntoDb = async (payload: TBlog, userId: string) => {
  const isExistUser = await User.isUserExistByPortfolio(userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const buildBlog = new Blog(payload);
  const result = await buildBlog.save();

 
  cache.del(CACHE_KEYS.ALL_BLOGS);

  return result;
};

const findAllBlogIntoDb = async () => {
  // প্রথমে ক্যাশে আছে কিনা চেক করি
  const cachedBlogs = cache.get(CACHE_KEYS.ALL_BLOGS);
  if (cachedBlogs) {
    return cachedBlogs;
  }

  // ক্যাশে না থাকলে DB থেকে আনি
  const result = await Blog.find().sort({ createdAt: -1 });

  // নতুন করে ক্যাশ করে রাখি
  cache.set(CACHE_KEYS.ALL_BLOGS, result);

  return result;
};

const findbySpecificBlogIdIntoDb = async (id: string) => {
  const cacheKey = CACHE_KEYS.SINGLE_BLOG(id);

  const cachedBlog = cache.get(cacheKey);
  if (cachedBlog) {
    return cachedBlog;
  }

  const result = await Blog.findById(id);

  if (result) {
    cache.set(cacheKey, result);
  }

  return result;
};

const updateBlogFromDb = async (
  payload: Partial<TBlog>,
  userId: string,
  id: string
) => {
  const isExistUser = await User.isUserExistByPortfolio(userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const isExistBlog = await Blog.findById(id);
  if (!isExistBlog) {
    throw new AppError(httpStatus.NOT_FOUND, "This Blog Not Exist", "");
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  
  cache.del(CACHE_KEYS.ALL_BLOGS);
  cache.del(CACHE_KEYS.SINGLE_BLOG(id));

  
  if (result) {
    cache.set(CACHE_KEYS.SINGLE_BLOG(id), result);
  }

  return result;
};

const deleteBlogFromDb = async (userId: string, id: string) => {
  const isExistUser = await User.isUserExistByPortfolio(userId);
  if (!isExistUser) {
    throw new AppError(httpStatus.NOT_FOUND, "This User Not Exist", "");
  }

  const result = await Blog.deleteOne({ _id: id });

  cache.del(CACHE_KEYS.ALL_BLOGS);
  cache.del(CACHE_KEYS.SINGLE_BLOG(id));

  return result;
};

export const BlogServices = {
  createBlogIntoDb,
  findAllBlogIntoDb,
  findbySpecificBlogIdIntoDb,
  updateBlogFromDb,
  deleteBlogFromDb,
};
