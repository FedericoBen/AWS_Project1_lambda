const { getUsers } = require("./actions/get");
const { putUser } = require("./actions/put");

const HANDLER_EVENTS = {
  "PUT": putUser,
  "GET": getUsers,
};

exports.handler = async (event) => {
  return (
    HANDLER_EVENTS[event.httpMethod]?.(event) ?? {
      statusCode: 400,
      body: JSON.stringify({
        message: `Operación no soportada. ${event.body?.operation}, ${event.httpMethod}`,
      }),
    }
  );
};
