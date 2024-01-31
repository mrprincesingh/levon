import { DELETE_Course_fail, DELETE_Course_request, DELETE_Course_success, EDIT_Course_fail, EDIT_Course_request, EDIT_Course_success, GET_Course_fail, GET_Course_request, GET_Course_success, POST_Course_fail, POST_Course_request, POST_Course_success } from "./acionTypes";

  
  const initialState = {
    isLoad: false,
    isError: false,
    isAuth:false,
    course: [],
   
  };
  
  export const reducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case GET_Course_request:
        return {
          ...state,
          isLoad: true,
          isError: false,
      
        };
      case GET_Course_success:
        return {
          ...state,
          isLoad: false,
          isError: false,
          course: payload,
          isAuth:true,
        };
      case GET_Course_fail:
        return {
          ...state,
          isLoad: false,
          isError: true,
       
        };

        case POST_Course_request:
            return {
              ...state,
              isLoad: true,
              isError: false,
          
            };
          case POST_Course_success:
            return {
              ...state,
              isLoad: false,
              isError: false,
              course: payload,
              isAuth:true,
            };
          case POST_Course_fail:
            return {
              ...state,
              isLoad: false,
              isError: true,
           
            };
            case EDIT_Course_request:
                return {
                  ...state,
                  isLoad: true,
                  isError: false,
              
                };
              case EDIT_Course_success:
                return {
                  ...state,
                  isLoad: false,
                  isError: false,
                  course: payload,
                  isAuth:true,
                };
              case EDIT_Course_fail:
                return {
                  ...state,
                  isLoad: false,
                  isError: true,
               
                };

                case DELETE_Course_request:
                    return {
                      ...state,
                      isLoad: true,
                      isError: false,
                  
                    };
                  case DELETE_Course_success:
                    return {
                      ...state,
                      isLoad: false,
                      isError: false,
                      course: payload,
                      isAuth:true,
                    };
                  case DELETE_Course_fail:
                    return {
                      ...state,
                      isLoad: false,
                      isError: true,
                   
                    };
   
      default:
        return state;
    }
  };
  
