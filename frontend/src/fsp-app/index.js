import axios from "axios";

const FSP_API = "/api/fsp/employee/";

async function getBackendData() {
    try {
        const res = await axios.get(FSP_API);
        return res.data;
    } catch (err) {
        console.error("Failed to load employees:", err);
        return [];
    }
}

export default getBackendData;
export { FSP_API };
