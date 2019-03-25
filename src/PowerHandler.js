const uuidv1 = require("uuid/v1");
const awsIot = require("aws-iot-device-sdk");
const DeviceHandler = require("./base/DeviceHandler");

/**
 * Handles stuff like this:
{
  "directive": {
    "header": {
      "namespace": "Alexa.PowerController",
      "name": "TurnOn",
      "payloadVersion": "3",
      "messageId": "553b13e6-7202-4adb-ac03-ee30b8a7f273",
      "correlationToken": "AAAAAAAAAQCyROP+QC6NKZ/uwrIY5soYDAIAAAAAAADVAYQFMIuC+XHFjr5BwwvCVWHcQYydZk/ryQDtpCfs6tN1ixflf5YWz713M+CMyP0db8ko8r2+EnU04j7ZzmXVfuUfe2rgTzsmVb3e/ZCmCKFdvtsy22Puc1gC/2Lj+GwMpiR7cc45uZlYaeOQxtSbYPBbLmgc7yclYsW6MJNWZdPHaS4foNB9oHuNd1YxrNW+Rqcj3n9ybOUTCW8kLkDPrMo3jWPYTd6CQ+KzFvNqoL6VIlbSB8SMx+UTAlWwrHaoPepW4xASq3MGQfT2eJ9H1aDYA+jmDWDI8Kvgb0MSfEfxAa+JW3r9mQic2PriAScL9kVtgMPNYLI3GiPCcAv/3TkBFO/8AnCxHCkfq3haPwRe3fSlWRhrMlx/L+Njss8wknGtiChjxWiui5IjW7iSEV14aDYGuKRRpWrzi5n7WB788PUFsHoab6AftzmuHuqk/i81doHuhPHl4ZuLrDjE/wx0V6RnSvwT7OLBn2xrRROkJutvdCoXTmOt/fZ/z4GxUOGxBCTES7bV65tTDSDQiG36TpWAfif5eqFPh8D5O1Zslvj+IYSW5DE2p4ZR4pVQqVW8aR+SE9J3OdjORjbmEkBg5L2jUw16cJofM87yMewErRe+xfthRHHlSOo15Ni1LPAMYkyNBfLbJqzg3P0F3uIHR75ckYw585+BknwBLNzIlZClRYfE8LqQaQ=="
    },
    "endpoint": {
      "scope": {
        "type": "BearerToken",
        "token": "Atza|IwEBINPQjjjS4eiPdnr2zQ-H3_6VVf3zt0JecMaab1dHSsiKGSU9woJPYLnlc1XMs-A20utRM40tCeu4WMJl8qIRpEnNIcI5-Fd0pbi4syua5p7GgCsfYpNlD4OwIz8Rm8Oxjr7GCMsyhK4CTZ3qh5-YKSpXWhCjqdltCAowVH4PkiTGoyLOIwgT9rGss2WzcgA0kNdvqjgA-EU6PKAPd6tilaypNhjM7HQz1EGfJsQoSVJFhEHPgV-Bf3j3njBAGusJYtLVPoQv_iRh3Oo1VwkUpP0zI2qMJXy8ij655tB89Ar9wT1iZQ0TraaCp8tks7zC10EXOK_aQ1LjXMVqT3xmvWQs-0j8s2rdcH5qujFHfiU4w2rM92RoSRY50B5m6cUdkPNWzwFFZpgcWV61RW8VvPGs7m615BFZm69aT5A2vhQHVWvjO-s15l5cUTZbFWeN2FyMF122LXN-yTrY67pwPQKdCREGN-_v41MlfTHJ7n3LwucQ6QYbrk7zvL17ExH9CI3JT-7UCC8hw_6gb4Uk2DhO"
      },
      "endpointId": "dimmable-light-1",
      "cookie": {
        "thingName": "TEDyLight"
      }
    },
    "payload": {}
  }
}
 */
class PowerHandler extends DeviceHandler {
  constructor() {
    super();
  }
  // constructor() {
  //   this.device = awsIot.device({
  //     // keyPath: "./cert/private.pem.key",
  //     // certPath: "./cert/certificate.pem.crt",
  //     // caPath: "./cert/root-CA.crt",
  //     clientId: "tedy-smart-skill-" + uuidv1(),
  //     host: "a1idkifp80vw18-ats.iot.eu-west-1.amazonaws.com",
  //     region: "eu-west-1",
  //     // port: 443,
  //     protocol: "wss",
  //     accessKeyId: "AKIAJRMML3WMGQSADWKA",
  //     secretKey: "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",
  //     debug: true
  //     // rejectUnauthorized: false,
  //     // keepalive: 300,
  //     // websocketOptions: { protocol: "mqttv3.1" }
  //   });
  //   // this.device = awsIot.device({
  //   //   // keyPath: "./cert/private.pem.key",
  //   //   // certPath: "./cert/certificate.pem.crt",
  //   //   // caPath: "./cert/root-CA.crt",
  //   //   clientId: "",
  //   //   region: "eu-west-1",
  //   //   baseReconnectTimeMs: 4000,
  //   //   keepalive: 300,
  //   //   protocol: "wss",
  //   //   port: 443,
  //   //   host: "a1idkifp80vw18-ats.iot.eu-west-1.amazonaws.com",
  //   //   debug: true,
  //   //   rejectUnauthorized: false,
  //   //   username: "?SDK=JavaScript&Version=2.2.1",
  //   //   reconnectPeriod: 4000,
  //   //   fastDisconnectDetection: true,
  //   //   resubscribe: false,
  //   //   websocketOptions: { protocol: "mqttv3.1" },
  //   //   sessionToken: undefined
  //   // });
  //   this.device.on("connect", () => {
  //     console.log("DEBUG: connected2");
  //   });
  //   this.promise = new Promise(resolve => {
  //     this.device.on("connect", () => {
  //       console.log("DEBUG: connected");
  //       resolve();
  //     });
  //   });
  //   this.promise.then(() => {
  //     this.device.publish(
  //       "topic_2",
  //       JSON.stringify({
  //         mode1Process: 3
  //       })
  //     );
  //   });
  // }

  canHandle(request) {
    const result =
      request.directive.header.namespace === "Alexa.PowerController";
    console.log("PowerHandler.canHandle: canHandle=" + result);
    return result;
  }

  generateResponse(value) {
    return {
      context: {
        properties: [
          {
            namespace: "Alexa.PowerController",
            name: "powerState",
            value
          }
        ]
      },
      event: {
        header: {
          namespace: "Alexa",
          name: "Response",
          payloadVersion: "3",
          messageId: uuidv1()
        },
        payload: {}
      }
    };
  }

  async turnOn(thingName) {
    console.log("DEBUG: turnOn");
    try {
      await this.publishState(thingName, { isOn: true });
      return this.generateResponse("ON");
    } catch (e) {
      console.log("ERROR: " + e);
      return this.generateResponse("DeviceCommunicationError", {});
    }
  }

  async turnOff(thingName) {
    console.log("DEBUG: turnOff");
    try {
      await this.publishState(thingName, { isOn: false });
      return this.generateResponse("OFF");
    } catch (e) {
      return this.generateResponse("DeviceCommunicationError", {});
    }
  }

  handle(request) {
    console.log(`PowerHandler.handle: ${JSON.stringify(request)}`);

    const userAccessToken = request.directive.endpoint.scope.token.trim();
    const thingName = this.getThingName(request);

    switch (request.directive.header.name) {
      case "TurnOn":
        return this.turnOn(thingName);

      case "TurnOff":
        return this.turnOff(thingName);

      default: {
        console.log(
          `ERROR: No supported directive name: ${request.directive.header.name}`
        );
        return this.generateResponse("UnsupportedOperationError", {});
      }
    }
  }
}

module.exports = PowerHandler;
