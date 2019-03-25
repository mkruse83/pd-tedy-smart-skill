const DiscoveryHandler = require("./DiscoveryHandler");
const ControlHandler = require("./ControlHandler");
const ReportStateHandler = require("./ReportStateHandler");
const PowerHandler = require("./PowerHandler");
const ErrorHandler = require("./ErrorHandler");

const isValidToken = request => {
  return true;
};

exports.handler = async (request, context) => {
  if (!isValidToken(request)) {
    return;
  }

  console.log(JSON.stringify(request, null, 2));
  const handlers = [
    new DiscoveryHandler(),
    new PowerHandler(),
    new ReportStateHandler(),
    new ErrorHandler()
  ];
  const response = await handlers
    .find(handler => handler.canHandle(request))
    .handle(request, context);
  console.log(`DEBUG Response: ${JSON.stringify(response)}`);
  return response;
};
