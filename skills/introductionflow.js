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



    controller.hears(['buy','sell','documentation','docs','community'], 'message_received', function(bot, message) {
    
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
                title: 'Join the Community',
                payload: 'community',
              },
              {
                title: 'Expert Help',
                payload: 'contact us',
              },
            ]
          },[
            {
              pattern: 'documentation',
              callback: function(res, convo) {
                convo.gotoThread('docs');
                convo.next();
              }
            },
            {
              pattern: 'community',
              callback: function(res, convo) {
                convo.gotoThread('community');
                convo.next();
              }
            },
            {
              pattern: 'contact',
              callback: function(res, convo) {
                convo.gotoThread('contact');
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
            text: 'Our developer community has thousands of members, and there are always friendly people available to answer questions about building bots!',
          },'community');
    
          convo.addMessage({
            text: '[Join our community Slack channel](https://community.botkit.ai) to chat live with the Botkit team, representatives from major messaging platforms, and other developers just like you!',
          },'community');
    
          convo.addMessage({
            text: '[Checkout the Github Issue Queue](https://github.com/howdyai/botkit/issues) to find frequently asked questions, bug reports and more.',
          },'community');
    
          convo.addMessage({
            action: 'default'
          }, 'community');
    
    
    
          // set up contact thread
          convo.addMessage({
            text: 'The team who built me can help you build the perfect robotic assistant! They can answer all of your questions, and work with you to develop custom applications and integrations.\n\n[Use this form to get in touch](https://botkit.ai/contact.html), or email us directly at [help@botkit.ai](mailto:help@botkit.ai), and a real human will get in touch!',
          },'contact');
          convo.addMessage({
            action: 'default'
          }, 'contact');
    
        });
    
      });
    
    }