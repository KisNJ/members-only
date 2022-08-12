function handleError(error, res) {
  res.render("error", {
    message: error.message || error.errors[Object.keys(error.errors)[0]].reason,
    error: { status: 400, stack: "Bad request" },
  });
}

module.exports=handleError
