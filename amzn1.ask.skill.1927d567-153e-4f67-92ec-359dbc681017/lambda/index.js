
//iphone, book*7, samsung tv(below 500)
var productToCost = new Map();
productToCost.set("iPhone", 999);
productToCost.set("animal farm", 60);
productToCost.set("Samsung tablet", 300);

var productToAsin = new Map();
productToAsin.set("iPhone", "B071K8H883");
productToAsin.set("animal farm", "B00012BJUC");
productToAsin.set("Samsung tablet", "B00LO2XO8S");

// var productToOffer = new Map();
// productToOffer.set("iPhone", "DE_GIL_DEMO_OFFER2");
// productToOffer.set("animal farm", "DE_GIL_DEMO_OFFER");
// productToOffer.set("samsung tv", "DE_GIL_DEMO_OFFER");

var offerToDuration = new Map();
offerToDuration.set("DE_GIL_DEMO_OFFER2", 6);
offerToDuration.set("DE_GIL_DEMO_OFFER", 3);

var offerToApr = new Map();
offerToApr.set("DE_GIL_DEMO_OFFER2", 0);
offerToApr.set("DE_GIL_DEMO_OFFER", 2.25);

/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');
const axios = require('axios');
var async = require('asyncawait/async');
var await = require('asyncawait/await');
        
        
    async function getNameById(priceAsInput) {

    return await axios.get(`http://666297f75c62.ngrok.io/getOffers?asin=B071K8H883&quantity=1&price=${priceAsInput}`)
      .then(response => {
        this.response = response.data.result;
        console.log("CCCCCCCCCCC");
        console.log(this.response.existingPaymentOptionList[0].financialOfferList[0].offerName);
        return this.response.existingPaymentOptionList[0].financialOfferList[0].offerName;
      })
  
  }
  
    async function getStringFinal(product1) {
      let speakOutput = ``;
      var priceAsInput = productToCost.get(String(product1));
      const offerType = await getNameById(priceAsInput);
        
            console.log("DDDDDDDD");
            console.log(offerType);
    
    if( productToCost.get(String(product1)) === undefined ) {
            speakOutput  = speakOutput + ` heyyy`;
        } else {
        
          var duration = offerToDuration.get(String(offerType));
        
          var monthly = (priceAsInput/duration);
          var apr = offerToApr.get(String(offerType));
          speakOutput  = speakOutput + ` We have installments options available on this ${product1}. You can pay for the product costing ${priceAsInput} 
          with montly installments ${monthly} and ${apr}% APR spanning upto ${duration} months`;
        }
        console.log(speakOutput);
        return speakOutput;
  
  }
  
  async function getNameById2(asin) {

    return await axios.get(`http://666297f75c62.ngrok.io/addToCart?asin=${asin}&quantity=1`)
      .then(response => {
        this.response = response.data;
        console.log("CCCCCCCCCCC");
        console.log(response);
        //change this
        console.log(this.response.message);
        return this.response.message;
      })
  
  }
  
    async function getStringFinal2(product1) {
      let speakOutput = `Adding ${product1} to cart.`;
      console.log(product1);
      var asinAsInput = productToAsin.get(String(product1));
      const message = await getNameById2(asinAsInput);
        
            console.log("DDDDDDDD");
            console.log(message);
    
    if( productToAsin.get(String(product1)) === undefined ) {
            speakOutput  = ` Failed to add item to cart`;
        } else {
        
          speakOutput = `Added ${product1} to cart.`;
        
          
        }
        console.log(speakOutput);
        return speakOutput;
  
  }
     

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        
        
        const speakOutput = 'Welcome, what can I do for you today?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


const ProductIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ProductIntent';
    },
      async handle(handlerInput) {
        const product1 = handlerInput.requestEnvelope.request.intent.slots.product.value;
        const speakOutput1 = await getStringFinal(product1);
        console.log("i am here!!!!!!!");
        console.log(speakOutput1);
        
        
  
  
        return handlerInput.responseBuilder
            .speak(speakOutput1)
            .reprompt('Would you like to buy any other product?')
            .getResponse();
    }
};

const AddToCartIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AddItemToCartIntent';
    },
      async handle(handlerInput) {
        const product1 = handlerInput.requestEnvelope.request.intent.slots.product.value;
        const speakOutput2 = await getStringFinal2(product1);
        console.log("i am here 2!!!!!!!");
        console.log(speakOutput2);
        
        
  
  
        return handlerInput.responseBuilder
            .speak(speakOutput2)
            //.reprompt('Would you like to check them out..?')
            .getResponse();
    }
};

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        ProductIntentHandler,
        AddToCartIntentHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();