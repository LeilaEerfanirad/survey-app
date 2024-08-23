import HttpService from "../../services/http.service";


export default async function postAnswers(surveyId, data) {

    const response = await HttpService.post(`survey/${surveyId}`, data)

    return response.data

}