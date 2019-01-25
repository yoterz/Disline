/*Discord to line  โดยส่งผ่านทาง line notify*/
const Discord = require('discord.js')
var request = require('request')
var BOTLINEnotify_TOKEN = process.env.BOTLINEnotify_TOKEN       //token line notify bottochannel
var BOTDiscord = process.env.BOTDiscordtoline_TOKEN         //token Bot discord to line ตัวสีฟ้า
const bot = new Discord.Client()
linechannel = 'ห้องแชทนะห้องแชท'
var channelID = '467004079101706252'



bot.on("ready",() => {
    console.log('Ready...')
})

setInterval(()=>status(), 60000);

function status(){     
   
    currentUtcTime = new Date(); // This is in UTC
    thTimeZone = new Date(currentUtcTime.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' }));
        var days = new Array('อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤ', 'ศุกร์', 'เสาร์','อาทิตย์')
        var months = new Array('ม.ค','ก.พ','มี.ค','เม.ย','พ.ค','มิ.ย','ก.ค','ส.ค','ก.ย','ต.ค','พ.ย','ธ.ค')
        var day = thTimeZone.getDay()
        var days = days[day]
        var d = thTimeZone.getDate()
        var month = thTimeZone.getMonth()
        var months = months[month]
        var year = thTimeZone.getFullYear()-1957
        var h = thTimeZone.getHours()
        var m = thTimeZone.getMinutes()
            /**แต่งเวลาให้สวย */
            if (h < 10) {
            h = "0" + h;
            }
            if (m < 10) {
            m = "0" + m;
            }
           
    console.log('Line BOt running.....'+h+'.'+m+'น '+days+' '+d+'/'+months+'/'+year)
    bot.user.setGame(h+'.'+m+'น '+days+' '+d+'/'+months+'/'+year)
    
    
}
bot.on("message", (msg) => {
    
    /*--ส่องข้อความที่มี "+" นำหน้า --*/
    if (msg.content.startsWith("+")){
    //console.log(msg.author.username)    //ชื่อคน ที่พิมข้อความใน channel
      if (msg.channel.id === channelID){      //ตรวจสอบ ชื่อห้องที่พิมพ์ข้อความ ตรงกับ ชื่อห้องที่เรากำหนดหรือไม    
   // if (msg.channel.name === linechannel){      //ตรวจสอบ ชื่อห้องที่พิมพ์ข้อความ ตรงกับ ชื่อห้องที่เรากำหนดหรือไม
     var args = msg.author.username +' : '+ msg.content.split('+').slice(1)
     sendText(args)    
    }
  }
    
    /*--ทำงานเลย รอตรวจสอบว่ามีรูปลงใน channelหรือไม--*/
    if (msg.content.startsWith("")){
    //console.log(msg.author.username)    //ชื่อคน ที่พิมข้อความใน channel
      if (msg.channel.id === channelID){  
    //if (msg.channel.name === linechannel){      //ตรวจสอบ ชื่อห้องที่พิมพ์ข้อความ ตรงกับ ชื่อห้องที่เรากำหนดหรือไม
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

bot.login(BOTDiscord)
