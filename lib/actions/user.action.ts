"use server";

import User from "@/lib/modals/user.modal";
import { connect } from "../db";

export async function createUser(user: any) {
  try {
    console.log("user from creation from action", user);

    await connect();
    console.log("db connected");

    const newUser = await User.create(user);
    console.log("newUser from action", newUser);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error: any) {
    console.log("error occured while creating user ", error.message);
  }
}
