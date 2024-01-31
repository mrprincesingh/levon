import * as types from "./acionTypes";
import axios from "axios";

export const getAllCourse = ()  =>(dispatch)=>{
    dispatch({type: types.GET_Course_request});
    return axios
    .get(`http://localhost:4000/api/v1/courses`)
    .then((res) => {
       
        dispatch({type: types.GET_Course_success, payload: res.data.courses});
   
    })
    .catch((e) => {
        dispatch({type: types.GET_Course_fail, payload: e});
    });

}

export const postCourse = ({title , description,image})  =>(dispatch)=>{
    dispatch({type: types.POST_Course_request});

    return axios
    .post(`http://localhost:4000/api/v1/addcourses` , {title , description,image})
    .then((res)=>{
        console.log(res)
        dispatch({type: types.POST_Course_success , payload: res.data.courses});
    }) .catch((e) => {
        dispatch({type: types.POST_Course_fail, payload: e});
    });


}

export const editCourse = ({id , title , description , image})  =>(dispatch)=>{
dispatch({type: types.EDIT_Course_request})
return axios
.put(`http://localhost:4000/api/v1/editcourses/${id}`,{title , description , image}).then((res)=>{

    dispatch({type: types.EDIT_Course_success , payload: res.data.courses});
}).catch((e) => {
    dispatch({type: types.DELETE_Course_fail, payload: e});
})


}

export const deleteCourse = (id)  =>(dispatch)=>{
    dispatch({type: types.DELETE_Course_request});
    return axios
    .delete(`http://localhost:4000/api/v1/deletecourses/${id}`).then((res)=>{

        dispatch({type: types.DELETE_Course_success , payload: res.data.courses});
    }).catch((e) => {
        dispatch({type: types.DELETE_Course_fail, payload: e});
    });


}