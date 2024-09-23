const handler = () => {
  const newDate = `Esta es la fecha actual: ${new Date().toISOString()}`;
  console.log(newDate);
  return {
    statusCode: 200,
    body: JSON.stringify(newDate),
  };
};

export default handler;
