const uuidv1 = require("uuid/v1");

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
                "some": "cookie."
            }
        },
        "payload": {}
    }
}
 */
class ControlHandler {
  canHandle(request) {
    const result =
      request.directive.header.namespace === "Alexa.ConnectedHome.Control";
    console.log("ControlHandler.canHandle: canHandle=" + result);
    return result;
  }

  generateResponse(name, payload) {
    return {
      header: {
        messageId: uuidv1(),
        name: name,
        namespace: "Alexa.ConnectedHome.Control",
        payloadVersion: "3"
      },
      payload: payload
    };
  }

  isDeviceOnline(applianceId) {
    console.log(`DEBUG: isDeviceOnline (applianceId: ${applianceId})`);
    return true;
  }

  turnOn(applianceId) {
    console.log(`DEBUG: turnOn (applianceId: ${applianceId})`);
    return generateResponse("TurnOnConfirmation", {});
  }

  turnOff(applianceId) {
    console.log(`DEBUG: turnOff (applianceId: ${applianceId})`);
    return generateResponse("TurnOffConfirmation", {});
  }

  setPercentage(applianceId, percentage) {
    console.log(
      `DEBUG: setPercentage (applianceId: ${applianceId}), percentage: ${percentage}`
    );
    return generateResponse("SetPercentageConfirmation", {});
  }

  incrementPercentage(applianceId, delta) {
    console.log(
      `DEBUG: incrementPercentage (applianceId: ${applianceId}), delta: ${delta}`
    );
    return generateResponse("IncrementPercentageConfirmation", {});
  }

  decrementPercentage(applianceId, delta) {
    console.log(
      `DEBUG: decrementPercentage (applianceId: ${applianceId}), delta: ${delta}`
    );
    return generateResponse("DecrementPercentageConfirmation", {});
  }

  handle() {
    console.log(`ControlHandler.handle: ${JSON.stringify(request)}`);

    const userAccessToken = request.directive.payload.scope.token.trim();
    const applianceId = request.directive.payload.appliance.applianceId;

    if (!applianceId) {
      console.log("ERROR: No applianceId provided in request");
      const payload = { faultingParameter: `applianceId: ${applianceId}` };
      return this.generateResponse(
        "UnexpectedInformationReceivedError",
        payload
      );
    }

    switch (request.directive.header.name) {
      case "TurnOnRequest":
        return this.turnOn(applianceId, userAccessToken);

      case "TurnOffRequest":
        return this.turnOff(applianceId, userAccessToken);

      case "SetPercentageRequest": {
        const percentage = request.directive.payload.percentageState.value;
        if (!percentage) {
          const payload = {
            faultingParameter: `percentageState: ${percentage}`
          };
          return this.generateResponse(
            "UnexpectedInformationReceivedError",
            payload
          );
        }
        return this.setPercentage(applianceId, userAccessToken, percentage);
      }

      case "IncrementPercentageRequest": {
        const delta = request.directive.payload.deltaPercentage.value;
        if (!delta) {
          const payload = { faultingParameter: `deltaPercentage: ${delta}` };
          return this.generateResponse(
            "UnexpectedInformationReceivedError",
            payload
          );
        }
        return this.incrementPercentage(applianceId, userAccessToken, delta);
      }

      case "DecrementPercentageRequest": {
        const delta = request.directive.payload.deltaPercentage.value;
        if (!delta) {
          const payload = { faultingParameter: `deltaPercentage: ${delta}` };
          return this.generateResponse(
            "UnexpectedInformationReceivedError",
            payload
          );
        }
        return this.decrementPercentage(applianceId, userAccessToken, delta);
      }

      default: {
        console.log(
          `ERROR: No supported directive name: ${request.directive.header.name}`
        );
        return this.generateResponse("UnsupportedOperationError", {});
      }
    }
  }
}

module.exports = ControlHandler;
