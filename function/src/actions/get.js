const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { ScanCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const { TABLE_NAME } = require("../config");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.getUsers = async (event) => {
  const getParams = {
    TableName: TABLE_NAME,
  };

  try {
    // Ejecutar el comando GetCommand para obtener el item de la tabla DynamoDB
    const data = await ddbDocClient.send(new ScanCommand(getParams));

    if (data.Items) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Items obtenidos correctamente",
          item: data.Items,
        }),
      };
    }
    return {
      statusCode: 404,
      body: JSON.stringify({
        message: "Items no encontrado",
      }),
    };
  } catch (error) {
    console.error("Error al obtener items de DynamoDB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al obtener items",
        error: error.message,
      }),
    };
  }
};
