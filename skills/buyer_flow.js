/* Buy flow with results in the command prompt */
module.exports = function (controller) {

    //Connection to the database
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'kleinbotdb'
    })

    connection.connect();
    
    controller.hears(['Buyer', 'Buy'], 'message_received', function (bot, message) {
        var propertiesArray = [];
        var isAreaFlag;
        var minPriceDb;
        var maxPriceDb;

        // Start convertation about buy
        bot.startConversation(message, function (err, convo) {
            

            convo.addMessage('Hmm... Let me see!', 'default')
            convo.ask('So, give me the location you\'re interested in Thessaloniki.', function (response, convo) {
                convo.setVar('area', response.text)
                var area = response.text;


                connection.query("SELECT MIN(PRICE) AS minAreaPrice FROM PROPERTIES JOIN SELL ON\
                PROPERTIES.ID = SELL.PROPERTY_ID WHERE AREA = ('" + area + " ')", function (error, results, fields) {

                        minPriceDb = results[0].minAreaPrice
                        convo.setVar('minPriceResultVar', results[0].minAreaPrice);                                               //collect the min price

                        console.log('Min Price: ' + minPriceDb);


                    });
                connection.query("SELECT MAX(PRICE) AS maxAreaPrice FROM PROPERTIES JOIN SELL ON\
                PROPERTIES.ID = SELL.PROPERTY_ID WHERE AREA = ('" + area + " ')", function (error, results, fields) {

                        maxPriceDb = results[0].maxAreaPrice
                        convo.setVar('maxPriceResultVar', results[0].maxAreaPrice);                                               //collect the max price

                        console.log('Max Price: ' + maxPriceDb);


                    });


                connection.query("SELECT DISTINCT AREA FROM PROPERTIES JOIN SELL ON\
                PROPERTIES.ID = SELL.PROPERTY_ID ", function (error, results, fields) {
                        if (error) throw error;

                        for (var i = 0; i < results.length; i++) {

                            if (!results[i].AREA.toUpperCase().includes(area.toUpperCase())) {  // false flag
                                console.log("NOT IN MY AREA");
                                isAreaFlag = false;
                            }
                            else if (results[i].AREA.toUpperCase().includes(area.toUpperCase())) {  // Start else if // true flag
                                console.log("YES, IN MY AREA");
                                isAreaFlag = true;
                                break;  // When you find the area break from for
                            }
                        }

                        console.log("isAreaFlag: " + isAreaFlag)

                        if (isAreaFlag == false) {  // false flag,restart or back to main menu 
                            convo.next();
                            console.log("next()");
                            convo.say({
                                text: 'No properties in this area. Sorry! Restart or go back to the main menu?',
                                quick_replies: [
                                    {
                                        title: 'Buy',
                                        payload: 'Buy',
                                    },
                                    {
                                        title: 'Menu',
                                        payload: 'Menu',
                                    }
                                ]
                            });
                        }
                        else if (isAreaFlag == true) {  // Start else if // true flag

                            convo.next();
                            convo.addMessage('Now, let\'s set the price range.', 'default')
                            convo.ask('Please give me the highest price you\'re willing to pay.', function (response, convo) {
                                convo.setVar('highestPrice', response.text)
                                var highestPrice = response.text;
                                console.log(highestPrice)

                                if (!isNaN(highestPrice)) {


                                    convo.next();
                                    convo.ask('Also, please set the lowest price.', function (response, convo) {
                                        convo.setVar('lowestPrice', response.text)
                                        var lowestPrice = response.text;
                                        console.log(lowestPrice);

                                        if (!isNaN(lowestPrice)) {
                                            console.log('max price database:' + maxPriceDb)
                                            console.log('min price database:' + minPriceDb)
                                            console.log('min price user:' + lowestPrice)
                                            console.log('max price user:' + highestPrice)


                                            if ((highestPrice >= minPriceDb) && (lowestPrice <= maxPriceDb) && (highestPrice>=lowestPrice)) {
                                                

                                                connection.query("SELECT STREET, STREET_NUMBER, PRICE, SIZE, AREA FROM PROPERTIES JOIN SELL ON\
                                             PROPERTIES.ID = SELL.PROPERTY_ID WHERE AREA = ('" + area + " ') AND\
                                             PRICE BETWEEN ( " + lowestPrice + " ) AND ( " + highestPrice + " ) ", function (error, results, fields) {
                                                        if (error) throw error;



                                                        // Loop for displaying each result to the console
                                                        for (var i = 0; i < results.length; i++) {
                                                            var counter = i + 1;
                                                            console.log('Property ' + counter + ':', results[i].STREET, '   ', results[i].STREET_NUMBER, '   ', results[i].PRICE, '€', '   ', results[i].SIZE, ' squaremeters')
                                                            propertiesArray[i] = '• Result ' + counter + ': ' + results[i].STREET + '   ' + results[i].STREET_NUMBER + ' ,  ' + results[i].PRICE + '€' + ' ,  ' + results[i].SIZE + 'm\u00B2' + '\n\n\n\n'

                                                            convo.setVar('listOfProperties', propertiesArray.join(''));



                                                        }

                                                    });

                                                console.log('convo.vars:', convo.vars)  // For debugging
                                                convo.addMessage('{{vars.listOfProperties}} ' + '\n', 'step2')
                                                convo.gotoThread('step2');          // Goes to thread step2 and prints the output
                                                convo.next()
                                                convo.say({                                               // To handle the flow after results 
                                                    text: 'Do you need anything else?',
                                                    quick_replies: [
                                                        {
                                                            title: 'Yes, back to buy/sell menu.',
                                                            payload: 'Menu',
                                                        },
                                                        {
                                                            title: 'No, thank you!',
                                                            payload: 'No, thank you!',
                                                        },
                                                        {
                                                            title: 'Contact us.',
                                                            payload: 'Contact us.',
                                                        }
                                                    ]
                                                });

                                            }
                                            else {
                                                convo.next();
                                                convo.addMessage('No properties in this range.', 'default')
                                                convo.say({
                                                    text: 'The price range in this area is {{vars.minPriceResultVar}} - {{vars.maxPriceResultVar}}',
                                                    quick_replies: [
                                                        {
                                                            title: 'Buy',
                                                            payload: 'Buy',
                                                        },
                                                        {
                                                            title: 'Menu',
                                                            payload: 'Menu',
                                                        }
                                                    ]
                                                });
                                            }
                                        }
                                        else {
                                            convo.repeat();
                                            convo.next();
                                        }
                                    }); // End second ask

                                }
                                else {
                                    convo.repeat();
                                    convo.next();
                                }



                            }) // End first ask

                        } // End else if
                    });

            }, { key: 'response' }, 'default')

            convo.addMessage('Alright! I have some properties you might want to check out.' + "\n", 'step2')
           
            
            
        })

    });
}