import HttpService from "../../services/http.service";


export default async function patchQuestionApi(questionId, data) {

    const response = await HttpService.patch(`/question/${questionId}`, data)

    return response.data

}