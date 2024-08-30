exports.getUserForAuth = async (email) =>
  await Auth.findOne({ email: email.toLowerCase() }).populate("adminAuth userAuth");

