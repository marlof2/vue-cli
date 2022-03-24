import Api from "@/api";
const route = "acao";


const getAllActions = async (params) => {
  const result = await Api.get(`/${route}`);
  return result.data;
};

export default {
  getAllActions
};
