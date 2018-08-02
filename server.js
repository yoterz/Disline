/*Line to Discord ต้องมีบอทใน GourpLine เพื่อสร้าง webhook เช็คข้อความใน gourpline*/

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const Discord = require('discord.js')
const nameline = require("./idname")
const app = express()
var http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 4000
const bot = new Discord.Client()
var BOTDiscord_TOKEN = process.env.BOTDiscord_TOKEN               //token bot discord
var linechannel = 'general'
bot.login(BOTDiscord_TOKEN)
bot.on("ready",() => {
    console.log('Ready...')
})

app.use(bodyParser.urlencoded({ extended: false }))              //2บรรทัดนี้ ทำให้เช็คข้อความในlineได้
app.use(bodyParser.json())

//start chat
app.get('/', function(req, res){
  res.end('<h1>DisLine<\h1>');
})


app.post('/webhook', (req, res) => {
    let msg = req.body.events[0].message.text   //ข้อความที่พิมในห้องใสไว้ในตัวแปร msg
    
    console.log('-----------------------------------------------------------------------------------')  
    var idname = req.body.events[0].source.userId                          //userid
    var name = nameline[idname]                                            //เอา idname ไปดึงรายชื่อใน idname.json
    var msgtype = req.body.events[0].message.type                          //type ชนิดข้อความ
    console.log('userId : '+req.body.events[0].source.userId+'     type message : '+req.body.events[0].message.type)     //แสดง userid และ ชนิดของข้อความ 
      
          switch (msgtype) {
              case 'text' :
                          var msgz = '```'+name+' : '+msg+'```'
                          console.log(msgz)
                          sendmsgtodiscord(msgz)                       
                          res.sendStatus(200)
                          break  
                          
              case 'image' :
                          var msgzz = req.body.events[0].message.id
                          var msgz = name+' : :frame_photo: '
                          console.log('imageid : '+msgzz)
                          sendmsgtodiscord(msgz)                       
                          res.sendStatus(200)
                          break       
                           
              case 'file' :
                          var msgz = name+' : :file_folder: '
                          console.log(req.body.events[0])
                          console.log(msgz)
                          sendmsgtodiscord(msgz)                       
                          res.sendStatus(200)
                          break       
                          
              case 'sticker' :
                          var stickerid = req.body.events[0].message.stickerId  
                          console.log('packageId : '+req.body.events[0].message.packageId+'    stickerId : '+req.body.events[0].message.stickerId)
                          var imgsticker = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+stickerid+"/ANDROID/sticker.png;compress=true"  //ลิงค์ sticker line
                          //var imgsticker = "https://stickershop.line-scdn.net/stickershop/v1/sticker/"+stickerid+"/IOS/sticker_animation@2x.png"
                          var msgz = '```'+name+' : Sticker\n  ID : '+stickerid+'```'
                          console.log(msgz)                            //แสดงข้อความ ชื่อ และ stickerId ใน console
                          senembed(imgsticker,msgz)
                          res.sendStatus(200)
                          break                             
             }      
  
})

function sendmsgtodiscord(msgz) {
     var channel = bot.channels.find("name", linechannel)
            channel.send(msgz)
}

function senembed(imgsticker,msgz){
const embed = new Discord.RichEmbed()
        .setColor(0x00ff00)   //ใส่สี
        .setDescription(msgz) 
        .setImage(imgsticker)     //รูปใหญ่
       var channel = bot.channels.find("name", linechannel)
       channel.send({embed})
}

http.listen(port, function(){
  console.log('listening on *:' + port);
});
//app.listen(port)
/*END line to discord*/


