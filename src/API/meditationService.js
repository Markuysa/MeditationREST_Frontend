import axios from "axios"
export default class MeditationsService{

    static async getAll(){
        const response = await axios.get("http://localhost:8080/api/meditations/all")
        return response.data

    }
}