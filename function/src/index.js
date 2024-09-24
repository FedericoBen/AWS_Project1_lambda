const { getUsers } = require("./actions/get");
const { putUser } = require("./actions/put");

const HANDLER_EVENTS = {
  PUT: putUser,
  GET: getUsers,
};

exports.handler = async (event) => {
  console.log(`Event-Coming : ${JSON.stringify(event)}`);

  return {
    ...(HANDLER_EVENTS[event.httpMethod]?.(event) ?? {
      statusCode: 400,
      body: JSON.stringify({
        message: `Operación no soportada. ${event.httpMethod}`,
      }),
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Required for CORS support to work
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    },
  };
};
