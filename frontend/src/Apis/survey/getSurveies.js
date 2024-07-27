import HttpService from "../../services/http.service";




export async function getAllSurveiesApi() {


    const response = await HttpService.get("/survey")

    return response.data

}