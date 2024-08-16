import HttpService from "../../services/http.service";


export default async function postEdgesApi(data) {

    const response = await HttpService.post(`/edge`, data)

    return response.data

}