import bcrypt from "bcrypt";

export const hashPassword = async(password)=>{
    try {
        const saltRounds =10;
        const hashedPasseord = await bcrypt.hash(password,saltRounds);
        return hashedPasseord;
        
    } catch (error) {
        //console.log("Error in hashPassword",error);
        
    }

}

export const comparePassword = async(password,hashPassword)=>{
    return bcrypt.compare(password,hashPassword);
}








