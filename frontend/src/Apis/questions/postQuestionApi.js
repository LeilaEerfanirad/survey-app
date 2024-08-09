import HttpService from "../../services/http.service";


export default async function postQuestionApi(data) {

    const response = await HttpService.post(`/question`, data)

    return response.data

}