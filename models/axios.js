import axios from "axios";
const api = await axios.create(
    {
    baseURL:"https://notify.eskiz.uz/api",
    headers:{
        Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDExNTMzMjAsImlhdCI6MTczODU2MTMyMCwicm9sZSI6InRlc3QiLCJzaWduIjoiYjZiNmZjZjdmNGRmMmJhNzU5ZTJlNGNhMThjYWI2MjkwOGRiODBlNjQ3OWQ5NzM2NTY2YTUwNWQ3MmVlNTM2NCIsInN1YiI6Ijk3MzEifQ.KC9HsMOxmJJEF_-bdvJ3qijJeSHTblI7PjGBc4FN-EY"
    }
    }
)
export default api
