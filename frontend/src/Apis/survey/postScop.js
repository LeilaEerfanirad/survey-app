import HttpService from "../../services/http.service";


export default async function postScopApi(surveyId, scop) {

    const response = await HttpService.post(`/survey/scop/${surveyId}`, scop)

    return response.data

}