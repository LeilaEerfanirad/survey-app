import HttpService from "../../services/http.service";




export async function createSurveyApi(data) {


    const response = await HttpService.post("/survey/create", data)

    return response.data

}