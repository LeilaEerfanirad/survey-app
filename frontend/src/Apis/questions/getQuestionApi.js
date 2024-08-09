import HttpService from "../../services/http.service";


export default async function getQuestionApi(questionId) {

    const response = await HttpService.get(`/question/${questionId}`)

    return response.data

}