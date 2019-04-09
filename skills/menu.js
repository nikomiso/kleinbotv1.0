/* User goes back to the menu with the buy/sell options */

module.exports = function(controller) {

  controller.hears('Menu', 'message_received', function(bot, message) {
      bot.startConversation(message, function(err, convo) {
        convo.addMessage('Well, okay! One more time...','default')  
        convo.say({
              text: 'Who are you? ',
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
  });
}