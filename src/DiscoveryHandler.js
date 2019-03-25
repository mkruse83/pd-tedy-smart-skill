const uuidv1 = require("uuid/v1");
const tedyLightTemplate = require("./data/tedyLightThing.json");
var AWS = require("aws-sdk");

/**
 * Handles stuff like this:
{
    "directive": {
        "header": {
            "namespace": "Alexa.Discovery",
            "name": "Discover",
            "payloadVersion": "3",
            "messageId": "50f7b29a-2c0c-4e24-b9da-787646a631f3"
        },
        "payload": {
            "scope": {
                "type": "BearerToken",
                "token": "Atza|IwEBIGya-Fr4L7IxMbvfffdDVnD67JOPFfShEOH_CSh8VezkrrjqPVl73G-FyyRj8khV5Nccn3sGo1g9n5chobTqdbCXpxbsy5p1xUDuRrKP-yjKgvqOAekuKWuOVaE0hOrZpLhZo6UniWVr1fLD5PX_hnQrmApGPP6y2upsrTHWe6aoKz-PSpMQuOQbH1S1pnDUIZz3uyKY2kK2HJYi_FaM7CA15bbUS8JL0ZJQeWSpMJXXjXzPgAfP_aCuMq7O49pJ2nOHVr-PpexO11ykECu951hf5ApVeGl1l7QUkjjeMCPB2JxX0BNnvGMuraNjGy3V-kvefjFmOPpsWhifYeuXAG-1E0UBBlT1epVbOTWFK4PtWUvs3UWxKswVThaFtWoVJG5WsW68_aH8XOEIoDZlUxx46BpqdBEeN-lq64_BX7HnAjMgKEmOAti67YDwgBoLNjkvfhHngmZznhOcFEGVndUNAzDZ30rFUlT6PhmUVYB7fg16o1TTsa_gz99fnIdFyuVCfXdlrWN4em90MfUhUFQY"
            }
        }
    }
}
*/
class DiscoveryHandler {
  canHandle(request) {
    const result = request.directive.header.namespace === "Alexa.Discovery";
    console.log("DiscoveryHandler.canHandle: canHandle=" + result);
    return result;
  }

  getDevices(data) {
    const result = [];
    const things = data.things;
    if (things) {
      things.map(thing => {
        if (thing.thingTypeName === "TEDy-Light") {
          const newThing = JSON.parse(JSON.stringify(tedyLightTemplate));
          newThing.endpointId = thing.thingName;
          newThing.friendlyName = "TEDy Light " + thing.thingName;
          newThing.cookie.thingName = thing.thingName;
          newThing.cookie.thingType = thing.thingTypeName;
          newThing.cookie.thingArn = thing.thingArn;
          result.push(newThing);
        }
      });
    }
    return result;
  }

  handle() {
    const that = this;
    const iot = new AWS.Iot({
      accessKeyId: "AKIAJRMML3WMGQSADWKA",
      secretAccessKey: "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",
      region: "eu-west-1"
    });

    return new Promise((resolve, reject) => {
      iot.listThings({}, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          const response = {
            event: {
              header: {
                messageId: uuidv1(),
                name: "Discover.Response",
                namespace: "Alexa.Discovery",
                payloadVersion: "3"
              },
              payload: {
                endpoints: that.getDevices(data)
              }
            }
          };
          resolve(response);
        }
      });
    });
  }
}

module.exports = DiscoveryHandler;
