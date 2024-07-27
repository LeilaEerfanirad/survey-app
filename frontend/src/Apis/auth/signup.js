import HttpService from "../../services/http.service";



export async function signupApi(data) {


    const response = await HttpService.post("/signup", data)

    return response.data

}