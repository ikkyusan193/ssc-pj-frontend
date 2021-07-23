import axios from "axios";
const apiClient = {
    // PAGE API'S
    async login(requestData) {
        const response = await axios.post("/login", requestData);
        return response
    },
    async register(requestData) {
        const response = await axios.post("/register", requestData);
        return response
    },
    async logout(requestData){
        const response = await axios.get("/logout",requestData);
        return response
    },
    // CARRIER API'S
    async readCarrier(){
        const response = await axios.get("/carrier");
        return response.data
    },
    async getCarrier(cid){
        const response = await axios.get("/carrier/"+cid)
        return response.data
    },
    async deleteCarrier(id){
        const response = await axios.delete("/carrier/delete/"+id)
        return response
    },
    async createCarrier(requestData){
        const response = await axios.post("/carrier/create",requestData)
        return response
    },
    async addCarrierToClient(requestData, cid){
        const response = await axios.post("/carrier/create/"+cid, requestData)
        return response
    },
    async deleteCarrierFromClient(cid, id){
        const response = await axios.delete("/carrier/delete/"+cid+"/"+id)
        return response
    },
    // CLIENT API'S
    async readClient() {
        const response = await axios.get("/client");
        return response.data
    },
    async createClient(requestData){
        const response = await axios.post("/client/create", requestData)
        return response
    },
    async updateClient(requestData,id){
        const response = await axios.patch("/client/"+id,requestData)
        return response
    },
    async deleteClient(id){
        const response = await axios.delete("/client/"+id)
        return response
    },
    // USER API'S
    async readUser(){
        const response = await axios.get("/user");
        return response.data
    },
    async createUser(requestData){
        const response = await axios.post("/user/create",requestData)
        return response
    },
    async updateUser(requestData,username){
        const response = await axios.patch("/user/"+username,requestData)
        return response
    },
    async deleteUser(username){
        const response = await axios.delete("/user/"+username)
        return response
    },
    async changePasswordUser(requestData,username){
        const response = await axios.patch("/user/changepw/"+username, requestData)
        return response
    },
    async readRole(){
        const response = await axios.get("/role")
        return response
    }
};

export default apiClient