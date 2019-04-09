/* This module kicks in if no Botkit Studio token has been provided */

module.exports = function(controller) {
  
  controller.on('hello', conductOnboarding);
  controller.on('welcome_back', conductOnboarding);
  // controller.on('reconnect', refresh)
  //       function refresh(bot, message) {
          
    
  //           bot.startConversation(message, function(err, convo) {
              
  //             convo.addMessage('Ahoy! I\'m Kleinbot.','default')
  //             convo.addMessage('I\'m here to assist you.','default')
  //             convo.say({
  //               text: 'Who are you?',
  //               quick_replies: [
  //                 {
  //                   title: 'Buyer', 
  //                   payload: 'Buyer',
  //                 },
  //                 {
  //                     title: 'Tenant',
  //                     payload: 'Tenant',
  //                 },
  //                 {
  //                   title: 'Landlord',
  //                   payload: 'Landlord',
  //               }
  //               ]
  //             });
        
        
  //           });
        
  //         }

   // controller.on('reconnect', function refresh(bot, message) {
        //     bot.findConversation(message, function (convo) {
        //         if (convo) {
        //             // stop the conversation and swallow this message
        //             convo.stop();
        //             bot.reply(message, 'Quitting.');
        //             convo.next();
        //         } 
        //         else {
        //             // nothing ongoing, this message passes through
        //             bot.reply(message, 'Before');
        //             convo.next();
        //             bot.reply(message, 'After');
        //         }
        //     });
    
    
        // }); 
        
//   controller.middleware.receive.use(function(bot, message, next) {
    
//     if () {
//         bot.findConversation(message, function(convo) {
//             if (convo) {
//                 // stop the conversation and swallow this message
//                 convo.stop('quit');
//                 bot.reply(message,'Quitting.');
//             } else {
//                 // nothing ongoing, this message passes through
//                 next();
//             }
//         });
//     } else {
//         next();
//     }

// });


  function conductOnboarding(bot, message) {

    bot.startConversation(message, function(err, convo) {
      convo.addMessage('Ahoy! I\'m Kleinbot.','default')
      convo.addMessage('I\'m here to assist you.','default')
      convo.say({
        text: 'Who are you?',
        quick_replies: [
          {
            title: 'Buyer', 
            payload: 'Buyer',
          },
          {
              title: 'Tenant',
              payload: 'Tenant',
          },
          {
            title: 'Landlord',
            payload: 'Landlord',
        }
        ]
      });


    });

  }

  
}
    