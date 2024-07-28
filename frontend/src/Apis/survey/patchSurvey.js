import HttpService from "../../services/http.service";


export async function patchSurveyApi(surveyId, data) {


    const response = await HttpService.patch(`/survey/${surveyId}`, data)

    return response.data

}