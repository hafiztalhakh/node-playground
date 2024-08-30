exports.createPasswordResetToken = async (email, code) => {
  const token = await ResetToken.findOne({ email });
  if (token) await token.remove();
  const newToken = new ResetToken({
    email,
    code,
  });
  await newToken.save();
};