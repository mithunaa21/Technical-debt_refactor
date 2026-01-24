const axios = require("axios");

async function testAPI() {
  try {
    const response = await axios.post("http://localhost:5000/api/analyze", {
      code: `
      public class Test {
          public void calculateBill() {
              int total = 0;
              for(int i=0;i<30;i++){
                  total += i;
              }
          }
      }
      `
    });

    console.log(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}

testAPI();
