import axios from "axios";
import { isAuthenticated, getAccessToken } from "./session";
import HospitalDetails from "views/hospitals/HospitalDetails";

// const baseUrl = "http://localhost:8000/";
const baseUrl = " https://api.nabameditour.com/";

// const imageBaseUrl = "http://localhost:8000";
const imageBaseUrl = " https://api.nabameditour.com";

const apiUrl = {
  baseUrl: `${baseUrl}`,
  imageBaseUrl: `${imageBaseUrl}`,
  patients: `${baseUrl}patients/patients/list/`,
  patientsReport: `${baseUrl}patients/patients-report/`,
  signIn: `${baseUrl}account/sign-in/`,
  hospitals: `${baseUrl}hospitals/hospitals/`,
  hospitalsList: `${baseUrl}hospitals/list/`,
  deleteHospitals: `${baseUrl}hospitals/hospitals/`,
  HospitalDetails: `${baseUrl}hospitals/HospitalsDetails/`,
  Facility: `${baseUrl}hospitals/Facilities/`,
  Specialty: `${baseUrl}hospitals/specializations/`,
  Procedure: `${baseUrl}hospitals/procedures/`,
  hospitalsDoctors: `${baseUrl}hospitals/doctors/`,
  Doctors: `${baseUrl}doctors/doctors/`,
  DoctorsList: `${baseUrl}doctors/list/`,
  DoctorsDetails: `${baseUrl}doctors/DoctorsDetails/`,
  Category: `${baseUrl}doctors/category/`,
  qualificationsList: `${baseUrl}doctors/qualification/list/`,
  specializationsList: `${baseUrl}doctors/specialist/list/`,
  doctorSpecializations: `${baseUrl}doctors/specialist/`,
  awardsList: `${baseUrl}/doctors/awards/list/`,
  doctorAwards: `${baseUrl}doctors/awards/`,
  qualification: `${baseUrl}doctors/qualification/`,
  Gallery: `${baseUrl}doctors/images/`,
  Blogs: `${baseUrl}blogs/blog/`,
  listBlogs: `${baseUrl}blogs/list/`,
  BlogContent: `${baseUrl}blogs/blog-data/`,
  ServicesList: `${baseUrl}services/list/`,
  Services: `${baseUrl}services/services/`,
  Testimonials: `${baseUrl}testimonials/testimonials/`,
  testimonialsList: `${baseUrl}testimonials/testimonials/list`,
  DoctorsCategory: `${baseUrl}doctors/category/`,
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
  console.log("TOKEN:", getAccessToken());
  axios
    .get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
  console.log("token", `Bearer ${getAccessToken()}`);

  axios
    .post(api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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
        Authorization: `Bearer ${getAccessToken()}`,
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

export function apiDownloadFileSecure(api, response, error) {
  console.log("apiDownloadFileSecure ", api);
  axios
    .get(api, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      responseType: "arraybuffer",
    })
    .then((res) => {
      console.warn("result", res.data);
      if (res.status === 200) {
        const blob = new Blob([res.data], {
          type: res.headers["content-type"],
        });
        const url = window.URL.createObjectURL(blob);

        const contentDisposition = res.headers["content-disposition"];
        const fileNameMatch = contentDisposition?.match(
          /filename[^;=\n]*=["']?([^;\n"']+)/,
        );
        const fileName = fileNameMatch ? fileNameMatch[1] : "downloaded";
        const extension = res.headers["content-type"].split("/")[1];
        const finalFileName = `${fileName}.${extension}`;

        const link = document.createElement("a");
        link.href = url;
        link.download = finalFileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        response("File downloaded successfully");
      } else {
        const errorMsg =
          res.data?.msg || `Unexpected status code: ${res.status}`;
        error(errorMsg);
      }
    })

    .catch((err) => {
      if (err.response) {
        console.error("Full error response:", err.response);

        if (err.response.data instanceof ArrayBuffer) {
          const decoder = new TextDecoder("utf-8");
          const jsonString = decoder.decode(err.response.data);

          try {
            const jsonResponse = JSON.parse(jsonString);
            const errorMsg = jsonResponse.msg || "An error occurred";
            console.error("API error response:", errorMsg);
            error(errorMsg);
          } catch (parseError) {
            console.error("Error parsing JSON response:", parseError);
            error("An error occurred while parsing the error response.");
          }
        } else {
          const errorMsg = err.response.data?.msg || "An error occurred";
          console.error("API error response:", errorMsg);
          error(errorMsg);
        }
      } else if (err.request) {
        console.log("Request error:", err.request);
        error("No response received from the server");
      } else {
        console.log("Error:", err.message);
        error(`Error: ${err.message}`);
      }
    });
}

export default apiCallUnsecureGet;
