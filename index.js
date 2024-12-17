const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');

const config = require('./config/key');
const {User} = require("./models/Users");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World!~~안녕하세요 좋으네')
})

app.post('/register', async (req, res) => {
    //회원가입 할 때 필요한 정보들을 client에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
 
    const user = new User(req.body)
    await user.save()  // 콜백 함수 제거하고 await 사용
    return res.status(200).json({
        success: true
    })
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})