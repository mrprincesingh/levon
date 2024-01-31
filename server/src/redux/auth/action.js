import axios from "axios";
import {
  GET_All_User_Success,
  GET_All_User_fail,
  GET_All_User_request,
  GET_Login_Error,
  GET_Login_Success,
  GET_Login_request,
  GET_Logout_Success,
  GET_Logout_request,
  GET_Singup_Error,
  GET_Singup_Success,
  GET_Singup_request,
  GET_logout_Error,
} from "./actionTypes";

import { toast, ToastContainer } from "react-toastify";

export const get_singup_request = () => {
  return {
    type: GET_Singup_request,
  };
};

export const get_singup_success = (payload) => {
  return {
    type: GET_Singup_Success,
    payload,
  };
};

export const get_singup_Error = () => {
  return {
    type: GET_Singup_Error,
   
  };
};

export const get_login_request = () => {
  return {
    type: GET_Login_request,
  };
};
export const get_login_success = (payload) => {
  return {
    type: GET_Login_Success,
    payload,
  };
};

export const get_login_Error = () => {
  return {
    type: GET_Login_Error,
  };
};

export const get_logout_request = () => {
  return {
    type: GET_Logout_request,
  };
};
export const get_logout_success = () => {
  return {
    type: GET_Logout_Success,
    
  };
};

export const get_logout_Error = () => {
  return {
    type: GET_logout_Error,
  };
};

export const get_Alluser_request = () => {
  return {
    type: GET_All_User_request,
  };
};
export const get_Alluser_success = (payload) => {
  return {
    type: GET_All_User_Success,
    payload
  };
};

export const get_Alluser_Error = () => {
  return {
    type: GET_All_User_fail,
  };
};

export const get_All_User = () =>(dispatch)=>{
  dispatch(get_Alluser_request());
  axios.get("https://levon-alpha.vercel.app/api/v1/auth/users")
  .then((res)=>{
   // console.log(res)
    dispatch(get_Alluser_success(res.data));
 
  }).catch((err)=>{
    dispatch(get_Alluser_Error());
  })
}

export const signupfunc =
  ({ name, email, password, role, mobile , city }, toast,navigate) =>
  (dispatch) => {
    dispatch(get_singup_request());

    axios
      .post("https://levon-alpha.vercel.app/api/v1/auth/register", {
        name,
        email,
        password,
        role,
        mobile,
        city
      })
      .then((res) => {
        console.log(res.data);
        dispatch(get_singup_success(res));
        toast.success("SignUp successful!");
        setTimeout(()=>{
          navigate("/login");
                 },3000)
      })
      .catch((err) => {
    console.log(err);
          dispatch(get_singup_Error(err.response.data.message));
          toast.error(err.response.data.message);
    
    
      });
  };

  export const logoutfunc =()=>(dispatch)=>{
    dispatch(get_logout_request());
   
    axios.get("https://levon-alpha.vercel.app/api/v1/auth/logout").then((res)=>{
      console.log(res);
      dispatch(get_logout_success());
     
    }).catch((err)=>{
      dispatch(get_logout_Error());
    })

  }

export const loginfunc =
  ({ email, password, navigate }) =>
  async (dispatch) => {
    dispatch(get_login_request());
    try {
      const response = await axios.post(
        "https://levon-alpha.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.status === 200) {
        dispatch(get_login_success(response.data));
    
        toast.success("Login successful!");
        setTimeout(()=>{
 navigate("/");
        },3000)
       
       
      } else {
        const errorMessage =
          response.data && response.data.error
            ? response.data.error
            : "Invalid email or password please try again .";
        toast.error(errorMessage);
        dispatch(get_login_Error());
      }
    } catch (error) {
      console.error("Login error:", error);
      dispatch(get_login_Error());
      toast.error("Invalid email  or password  please try again .");
    }
  };

<ToastContainer position="top-right" />;