import HttpService from "../../services/http.service";



export async function loginApi(data) {


    const response = await HttpService.post("/login", data)

    return response.data

}


