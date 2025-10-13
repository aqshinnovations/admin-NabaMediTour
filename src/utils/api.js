import axios from "axios";
import { isAuthenticated, getAccessToken } from "./session";

// const baseUrl = "http://localhost:8000/";
const baseUrl = " https://www.indocscare.com:8000/";


const apiUrl = {
  baseUrl: `${baseUrl}`,
  patients: `${baseUrl}patients`,
  signIn: `${baseUrl}account/sign-in/`,
  contactUs: `${baseUrl}patients/patients-data/`,
  Users: `${baseUrl}account/members/`,
  updateUsers: `${baseUrl}account/update-member/`,

  Profile: `${baseUrl}account/profile/`,
  Blogs: `${baseUrl}blogs/blog-data/`,
  BlogContent: `${baseUrl}blogs/blogContent/`,



};

export { baseUrl, apiUrl };

export const createDownloadUrl = (url) => {
  return `${apiUrl.otaDownload}${url}`;
};

export function apiCallUnsecureGet(api, response, error) {
  console.log("apiCallUnsecureGet ", api);
  axios
    .get(api)
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiCallSecureGet(api, response, error) {
  console.log("apiCallSecureGet ", api);
  axios
    .get(api, {
      headers: {
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.warn("result", res.data);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiCallPostWithForm(api, form, response, error) {
  console.log("uploadFile ", api);

  axios
    .post(api, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiCallPutWithForm(api, form, response, error) {
  console.log("uploadFile ", api);

  axios
    .put(api, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log("Error", err.response);
    });
}

export function uploadFile(api, name, file, response, error) {
  console.log("uploadFile ", api);
  console.log(name, file.name);

  const formData = new FormData();
  formData.append(name, file);
  axios
    .post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiCallPostFormData(api, formData, response, error) {
  console.log("apiCallPostFormData ", api);

  axios
    .post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': `Token ${getAccessToken()}`
      },
    })
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiCallSecureDelete(api, id, response, error) {
  const url = `${api}?id=${id}`;
  console.log("apiCallSecureDelete ", url);
  axios
    .delete(url, {
      headers: {
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.warn("result", res);
      const result = res.data;
      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export function apiPostUnsecure(api, data, response, error) {
  console.log("apiPostUnsecure ", api, "data ", data);

  axios
    .post(api, data)
    .then((res) => {
      console.warn("result", res);

      const result = res.data;

      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response);
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        // console.log('Error', err.message);
        error(`Error ${err.message}`);
      }
      // console.log(err.config);
    });
}

export function apiPostSecure(api, data, response, onError) {
  console.log("apiPostSecure ", api, "data ", data);

  axios
    .post(api, data, {
      headers: {
        Authorization: `Token ${getAccessToken()}`,
      },
    })
    .then((res) => {
      console.log("result", res.data);

      const result = res.data;

      if (result.code === "200") {
        response(result);
      } else {
        onError(result.msg);
      }
    })
    .catch((err) => {
      try {
        console.log("error", err.response);

        if (err.response) {
          onError(err.response.data.msg);
        } else if (err.request) {
          console.log(err.request);
          onError(err.request);
        } else {
          console.log("Error", err.message);
          onError(`Error ${err.message}`);
        }
      } catch (e) {
        console.log(e);
        onError("Something went wrong!");
      }
      console.log(err.config);
    });
}

export function apiPutSecure(api, data, response, error) {
  console.log("apiPutSecure ", api, "data ", data);

  axios
    .put(api, data, {
      headers: {
        // 'Authorization': `Token ${getAccessToken()}`
      },
    })
    .then((res) => {
      console.warn("result", res);

      const result = res.data;

      if (result.code === "200") {
        response(result);
      } else {
        error(result.msg);
      }
    })
    .catch((err) => {
      if (err.response) {
        error(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
        error(err.request);
      } else {
        console.log("Error", err.message);
        error(`Error ${err.message}`);
      }
      console.log(err.config);
    });
}

export default apiCallUnsecureGet;
