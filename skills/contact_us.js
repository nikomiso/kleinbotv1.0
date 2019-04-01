module.exports = function (controller) {

    controller.hears(['Contact us.', 'contact', 'phone', 'email', 'mail'], 'message_received', function (bot, message) {

        bot.startConversation(message, function (err, convo) {
            convo.addMessage('For more information <http://localhost:3000/contact.html>' + "\n", 'default')
        });
    })
}