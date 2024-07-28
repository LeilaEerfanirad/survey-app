import HttpService from "../../services/http.service";




export async function getSingleSurveyApi(surveyId) {


    const response = await HttpService.get(`/survey/${surveyId}`)

    return response.data

}