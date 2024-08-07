import axios from "axios";

export const fetchUsers = async () => await axios.get("api/fetch-user-data");
