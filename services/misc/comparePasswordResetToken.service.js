exports.comparePasswordResetToken = async (code, email) =>
  await ResetToken.findOne({ code, email });
