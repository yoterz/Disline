/*Discord to line  โดยส่งผ่านทาง line notify*/
const Discord = require('discord.js')
var request = require('request')
var BOTLINEnotify_TOKEN = process.env.BOTLINEnotify_TOKEN       //token line notify bottochannel
var BOTDiscord = process.env.BOTDiscordtoline_TOKEN         //token Bot discord
const bot = new Discord.Client()
linechannel = 'general'
bot.login(BOTDiscord)

bot.on("ready",() => {
    console.log('Ready...')
})

setInterval(()=>status(), 30000);
function status(){     
    console.log('Line BOt running.....')
}
bot.on("message", (msg) => {
    
    /*--ส่องข้อความที่มี "+" นำหน้า --*/
    if (msg.content.startsWith("+")){
    //console.log(msg.author.username)    //ชื่อคน ที่พิมข้อความใน channel
    if (msg.channel.name === linechannel){      //ตรวจสอบ ชื่อห้องที่พิมพ์ข้อความ ตรงกับ ชื่อห้องที่เรากำหนดหรือไม
     var args = msg.author.username +' : '+ msg.content.split('+').slice(1)
     sendText(args)    
    }
  }
    
    /*--ทำงานเลย รอตรวจสอบว่ามีรูปลงใน channelหรือไม--*/
    if (msg.content.startsWith("")){
    //console.log(msg.author.username)    //ชื่อคน ที่พิมข้อความใน channel
    if (msg.channel.name === linechannel){      //ตรวจสอบ ชื่อห้องที่พิมพ์ข้อความ ตรงกับ ชื่อห้องที่เรากำหนดหรือไม
      msg.attachments.forEach(function(attachment) {   //ตรวจสอบ ว่ามีการลงรูป หรือ attchment หรือไม่
            var imgurl = attachment.url                 //ดึง url ของรูปใน discord
                  args = msg.author.username+' : Send Image'    //ข้อความ
             sendText(args,imgurl)
         })  
      }
  }   
            
})

function sendText(args,imgurl) {
    request({
        method: 'POST',
        uri: 'https://notify-api.line.me/api/notify',
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        auth: {
            bearer: BOTLINEnotify_TOKEN, //token
        },
        form: {
            message: args, //ข้อความที่จะส่ง
            imageThumbnail: imgurl,
            imageFullsize:  imgurl,
        },
    }, (err, httpResponse, body) => {
        if (err) {
            console.log(err)
        } else {
            console.log(body)
        }
    })
}

