import { func } from 'prop-types';



export function isAuthenticated() {
    const email = localStorage.getItem('email', null);
    console.log(`email >> ${email}`);

    if (email != null) {
        return true;
    }

    return false;
}

export default isAuthenticated;

export function saveUser(user) {
  console.log("saveUser", user);

  if (user.access) {
    sessionStorage.setItem("token", user.access);
  }

  if (user.account && user.account.first_name) {
    sessionStorage.setItem("name", user.account.first_name);
  }

  if (user.account && user.account.accountId) {
    sessionStorage.setItem("accountId", user.account.accountId);
  }

   if (user.account && user.account.companyId) {
    sessionStorage.setItem("companyId", user.account.companyId);
  }
}


export function getAccessToken() {
    return sessionStorage.getItem('token');
    
}



export function logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('profilepic');
    sessionStorage.removeItem('serial_number');
    sessionStorage.removeItem('robot_name');
    sessionStorage.removeItem('first_name');
    sessionStorage.removeItem('last_name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('mobile');
    sessionStorage.removeItem('is_active');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('company');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refresh');
    sessionStorage.removeItem('accountId');


    localStorage.removeItem('accessToken');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('username');
    localStorage.removeItem('profilepic');
    localStorage.removeItem('serial_number');
    localStorage.removeItem('robot_name');
    sessionStorage.removeItem('companyId');


    localStorage.clear();
    sessionStorage.clear()

    console.log(`clear storage:`);
}
const roleIdName = (role) => {
    switch (role) {
        case 'S':
            return 'SuperAdmin';
        case 'A':
            return 'Admin';
        case 'U':
            return 'User';
    }
};

export const roleName = () => {
    return roleIdName(localStorage.getItem('role', null));
};

export const roleId = () => {
    return localStorage.getItem('role', null);
};

export function isAdmin() {
    return localStorage.getItem('role', null) === 'A';
}



