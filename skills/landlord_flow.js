/* Sell flow buttons. Here the users select "average price" or "entry" in order to continue their conversation*/

module.exports = function(controller) {

    controller.hears('landlord', 'message_received', function(bot, message) {
        
        bot.startConversation(message, function(err, convo) {
            convo.addMessage('Ok! Let\' s see what I can do for you!')
            convo.say({
            text: 'Would you like to check the average selling price of an area or entry your property?' ,
            quick_replies: [
                {
                title: 'Selling price', 
                payload: 'Selling price',
                },
                {
                title: 'Renting price', 
                payload: 'Renting price',
                },
                {
                    title: 'Entry your property for sale or rent',
                    payload: 'Entry',
                }
            ]
            });


        });

    });
}