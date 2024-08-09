import HttpService from "../../services/http.service";


export default async function changeQuestionsOrdersApi(surveyId, data) {

    const response = await HttpService.post(`/survey/${surveyId}/change-orders`, data)

    return response.data

}