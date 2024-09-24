const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { PutCommand, DynamoDBDocumentClient } = require("@aws-sdk/lib-dynamodb");

const { TABLE_NAME } = require("../config");

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

exports.putUser = async (event) => {
    
    try {
      const body = JSON.parse(event.body);
      const item = body.newItem;
    
      const putParams = {
        TableName: TABLE_NAME,
        Item: item,
      };
    // Ejecutar el comando PutCommand para insertar el item en la tabla DynamoDB
    await ddbDocClient.send(new PutCommand(putParams));
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item insertado correctamente",
        item: item,
      }),
    };
  } catch (error) {
    console.error("Error al insertar item en DynamoDB:", error);
    response = {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al insertar item",
        error: error.message,
      }),
    };
  }
};
