import API from "./axios-client";

export const loginMutationFn = async (data) => {
    const response = await API.post("/auth/login", data);
    return response.data;
};

export const registerMutationFn = async (data) => {
    const response = await API.post("/auth/register", data);
    return response.data;
};

export const logoutMutationFn = async () => {
    const response = await API.post("/auth/logout");
    return response.data;
};

export const getCurrentUserQueryFn = async () => {
    const response = await API.get("/user/current");
    return response.data;
};
