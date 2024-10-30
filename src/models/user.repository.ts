import { IUser } from "../types/user.interface";
import { UserModel } from "./user.model";

/**
 * Retrieve all users from the database.
 * @returns {Promise<IUser[]>} - A promise that resolves to an array of users.
 */
export const getUsers = (): Promise<IUser[]> => UserModel.find();

/**
 * Retrieve a user by their email.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<IUser|null>} - A promise that resolves to the user object or null if not found.
 */
export const getUserByEmail = (email: string): Promise<IUser | null> => UserModel.findOne({ email });

/**
 * Retrieve a user by their session token.
 * @param {string} sessionToken - The session token of the user to retrieve.
 * @returns {Promise<IUser|null>} - A promise that resolves to the user object or null if not found.
 */
export const getUserBySessionToken = (sessionToken: string): Promise<IUser | null> => UserModel.findOne({
    'authentication.sessionToken': sessionToken
});

/**
 * Retrieve a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<IUser|null>} - A promise that resolves to the user object or null if not found.
 */
export const getUserById = (id: string): Promise<IUser | null> => UserModel.findById(id);

/**
 * Create a new user in the database.
 * @param {Record<string, any>} values - The user data to save.
 * @returns {Promise<IUser>} - A promise that resolves to the created user object.
 */
export const createUser = (values: Record<string, any>): Promise<IUser> =>
    new UserModel(values).save().then((user) => user.toObject());

/**
 * Delete a user by their ID.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<IUser|null>} - A promise that resolves to the deleted user object or null if not found.
 */
export const deleteUserById = (id: string): Promise<IUser | null> => UserModel.findOneAndDelete({ _id: id });

/**
 * Update a user by their ID.
 * @param {string} id - The ID of the user to update.
 * @param {Record<string, any>} values - The updated values to apply to the user.
 * @returns {Promise<IUser|null>} - A promise that resolves to the updated user object or null if not found.
 */
export const updateUserById = (id: string, values: Record<string, any>): Promise<IUser | null> =>
    UserModel.findByIdAndUpdate(id, values, { new: true }); // 'new: true' returns the updated document
