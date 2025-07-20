/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/apiConfig"


const getSchoolData = async () => {
    const response = await api.get('school/get');
    return response.data;
}

const getSchoolById = async (id:number) => {
    const response = await api.get('school/get/'+id);
    return response.data;
}

const addSchool = async (schoolData: any) => {
    const response = await api.post("school/create", schoolData);
    return response.data;
}

const updateSchool = async (schoolData: any) => {
    const response = await api.put("school/update/" + schoolData.id, schoolData);
    return response.data;
}

const deleteSchool = async (id:number) => {
    const response = await api.delete("school/delete/"+id);
    return response.data;
}


const schoolService = {
  getSchoolData,
  getSchoolById,
  addSchool,
  updateSchool,
  deleteSchool,
};

export default schoolService