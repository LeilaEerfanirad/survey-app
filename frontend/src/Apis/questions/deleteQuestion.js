import HttpService from "../../services/http.service";


export default async function deleteQuestionApi(questionId, surveyId) {

    const response = await HttpService.delete(`/question/${questionId}`, { data: { surveyId } })

    return response.data

}