import axios from "axios";

export interface IGetExtList {
  data: IData[];
  error: string;
}

export interface IData {
  name: string;
  fix_yn: string;
  checked: string;
  seq: number;
}

export async function getExtList() {
  return axios
    .get(`/ext`)
    .then((response) => response.data)
    .catch((error) => {
      alert("해당 오류를 확인해 주세요. \n" + error.response.data.error);
    });
}

export async function postExtList(ext: any) {
  return axios
    .post(`/ext`, { ...ext })
    .then((response) => response.data)
    .catch((error) => {
      alert("해당 오류를 확인해 주세요. \n" + error.response.data.error);
    });
}

export async function delExtList(ext: any) {
  return axios
    .delete(`/ext?name=${encodeURIComponent(ext.name)}`, { data: { ...ext } })
    .then((response) => response.data)
    .catch((error) => {
      alert("해당 오류를 확인해 주세요. \n" + error.response.data.error);
    });
}

export async function putExtList(ext: any) {
  return axios
    .put(`/ext`, { ...ext })
    .then((response) => response.data)
    .catch((error) => {
      alert("해당 오류를 확인해 주세요. \n" + error.response.data.error);
    });
}
