import axios from "axios";

const PostFormData = async (url: string, body: any) => {
  try {
    console.log("user ===>", body);
    const response = await axios.post(url, body);
    // console.log(response.data);
    return response.data;
    // Handle success
  } catch (error) {
    console.error(error);
    // Handle error
  }
};

export default PostFormData;
