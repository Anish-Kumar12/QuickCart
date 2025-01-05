import Axios from "../utils/Axios"
import SummaryApi from "../common/SummaryApi"

const deleteImage = async(url)=>{
    try{
        const response = await Axios({
            ...SummaryApi.deleteImage,
            data : {
                url : url
            }
        })

        return response
    }
    catch(error){
        return error
    }
}

export default deleteImage