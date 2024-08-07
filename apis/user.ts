import { User } from "@/utils/types";
import axios from "axios";

export const fetchUsers = async () => await axios.get("api/fetch-user-data");

export const upsertUser = async (body: Partial<User>) =>
  await axios.post("api/update-user-data", body);

export const deleteUser = async (userId: string) =>
  await axios.delete(`api/delete-user-data/${userId}`);
