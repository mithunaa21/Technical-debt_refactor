const axios = require("axios");

axios.post("http://localhost:5000/api/analyze", { code: "public class Test {}" })
  .then(res => console.log(res.data))
  .catch(err => console.log(err.response.data));
