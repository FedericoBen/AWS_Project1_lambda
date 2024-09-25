const { getUsers } = require("./actions/get");
const { putUser } = require("./actions/put");

const HANDLER_EVENTS = {
  PUT: putUser,
  GET: getUsers,
};

exports.handler = async (event) => {
  console.log(`Event-Coming : ${JSON.stringify(event)}`);

  const responseAction = await HANDLER_EVENTS[event.httpMethod]?.(event) ?? {
    statusCode: 400,
    body: JSON.stringify({
      message: `Operación no soportada. ${event.httpMethod}`,
    }),
  };

  return {
    ...responseAction,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "Content-Type",
      // "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    },
  };
};
