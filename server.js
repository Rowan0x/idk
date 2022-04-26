const axios = require("axios")
const express = require("express")
const app = express();
const instance = axios.create();


const path = require('path');
const publicDirectory = path.join(__dirname, './public')

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.set('view engine', 'hbs')

app.use(express.static(publicDirectory))


function getCSRF(){
  return new Promise((resolve, reject) => {
    axios.post("https://auth.roblox.com/v2/login").catch((error) => {
      resolve(error.response.headers["x-csrf-token"]) 
    })
  })
}
app.post("/test", (req, res) => {
  console.log(req.body)
})

app.post('/login', (req, res) => {
  console.log("cont res")
  const id = req.body.id
  const username = req.body.user
  const password = req.body.password
  console.log(id)
  if(!id || !password || !username){
    res.json({ error:"no data"})
  }
    
  getCSRF().then((csrf) => {
    const token = csrf
    axios({
      method: "post",
      url: "https://auth.roblox.com/v2/login",
      headers: {
        "accept": "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Opera GX\";v=\"85\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token": token,
        "x-requested-with": "XMLHttpRequest"
      },
      data: {
        "ctype": "Email",
        "cvalue": username,
        "password": password,
        "captchaId": "FukzVbbnzSZvzhYp",
        "captchaToken": id,
        "captchaProvider": "PROVIDER_ARKOSE_LABS"
    }
    }).then(response => {
      console.log(response.data)
      res.json(response.data.user)
    }).catch(() => {
      res.json({ error: "error"})
    })
  })

})

app.get("/getblob", (req, res) => {
  const body ={
    "ctype": "Email",
  "cvalue": "hiddnceo@gmail.com",
  "password": "Pascal12",
  "captchaId": "FukzVbbnzSZvzhYp",
  "captchaToken": "866266d852aebc12.7523611401|r=us-east-1|metabgclr=transparent|guitextcolor=%23474747|maintxtclr=%23b8b8b8|metaiconclr=transparent|meta=6|pk=476068BF-9607-4799-B53D-966BE98E2B81|at=40|sup=1|rid=3|ag=101|cdn_url=https%3A%2F%2Froblox-api.arkoselabs.com%2Fcdn%2Ffc|lurl=https%3A%2F%2Faudio-us-east-1.arkoselabs.com|surl=https%3A%2F%2Froblox-api.arkoselabs.com",
  "captchaProvider": "PROVIDER_ARKOSE_LABS"
  }
  


  
  getCSRF().then((csrf) => {
    const token = csrf
    axios({
      method: "post",
      url: "https://auth.roblox.com/v2/login",
      headers: {
        "accept": "application/json",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
        "content-type": "application/json",
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Opera GX\";v=\"85\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-csrf-token": token,
        "x-requested-with": "XMLHttpRequest"
      },
      data: {
        "ctype": "Email",
        "cvalue": "hiddnceo@gmail.com",
        "password": "Pascal12",
        "captchaId": "FukzVbbnzSZvzhYp",
        "captchaToken": "866266d852aebc12.7523611401|r=us-east-1|metabgclr=transparent|guitextcolor=%23474747|maintxtclr=%23b8b8b8|metaiconclr=transparent|meta=6|pk=476068BF-9607-4799-B53D-966BE98E2B81|at=40|sup=1|rid=3|ag=101|cdn_url=https%3A%2F%2Froblox-api.arkoselabs.com%2Fcdn%2Ffc|lurl=https%3A%2F%2Faudio-us-east-1.arkoselabs.com|surl=https%3A%2F%2Froblox-api.arkoselabs.com",
        "captchaProvider": "PROVIDER_ARKOSE_LABS"
    }
    }).catch((error) => {
      res.json({
        blob: error.response.data.errors[0]['fieldData']
      })
      console.log("success")
    })
  })
})




app.listen(3000, () => {
  console.log("Server started on port 3000");
});

