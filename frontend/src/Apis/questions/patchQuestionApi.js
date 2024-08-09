import HttpService from "../../services/http.service";


export default async function patchQuestionApi(surveyId, data) {

    const { questionId, ...res } = data

    const response = await HttpService.patch(`/survey/${surveyId}/question/${questionId}/`, res)

    return response.data

}