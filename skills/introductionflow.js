module.exports = function(controller) {

    function conductOnboarding(bot, message) {

        bot.startConversation(message, function(err, convo) {
  
          convo.say({
            text: 'Hello! I am kleinbot, how can I help you?',
            quick_replies: [
              {
                title: 'Help',
                payload: 'help',
              },
            ]
          });
  
  
        });
  
      }



    controller.hears(['buy','sell'], 'message_received', function(bot, message) {
    
        bot.startConversation(message, function(err, convo) {
    
          // set up a menu thread which other threads can point at.
          convo.ask({
            text: 'I can point you to resources, and connect you with experts who can help.',
            quick_replies: [
              {
                title: 'buy test text',
                payload: 'buy',
              },
              {
                title: 'sell test text',
                payload: 'sell',
              }
            ]
          },[
            {
              pattern: 'buy',
              callback: function(res, convo) {
                convo.gotoThread('buy');
                convo.next();
              }
            },
            {
              pattern: 'sell',
              callback: function(res, convo) {
                convo.gotoThread('sell');
                convo.next();
              }
            },
            {
              default: true,
              callback: function(res, convo) {
                convo.gotoThread('end');
              }
            }
          ]);
    
          // set up docs threads
          convo.addMessage({
            text: 'I do not know how to help with that. Say `help` at any time to access this menu.'
          },'end');
                  
          // set up docs threads
          convo.addMessage({
            text: 'Test text for buy button.',
          },'buy');
    
          convo.addMessage({
            action: 'default'
          }, 'buy');
    
    
          // set up community thread
          convo.addMessage({
            text: 'This is but text',
          },'buy');
    
          convo.addMessage({
            text: 'This is sell text',
          },'sell');
    
        });
    
      });
    
    }