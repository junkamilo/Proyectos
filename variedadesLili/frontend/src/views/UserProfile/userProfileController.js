import { UserProfileView } from "../../components/UserProfileView/UserProfileView.js";
import { getUserById } from "../../services/Users/authService.js";


export const userProfileController = async () => {
    const dataUSer = await getUserById(1);
    
    const content = document.querySelector(".Profileview");
    const profileView = UserProfileView(dataUSer);
    
    content.append(profileView);
  
    return content;
}
