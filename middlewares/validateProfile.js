const validateProfile = (req, res, next) => {
  const { username, bio, image } = req.body.user;
  const error = [];
  const alphaNumeric = /^[a-zA-Z0-9]+$/;
  const validUrl = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-/]))?/;
  if (username) {
    if (!alphaNumeric.test(username)) {
      error.push('Username can not contain special characters');
    }
    if (username.length < 5) {
      error.push('Username can not be less than 5 characters');
    }
  }
  // if (bio) {
  if (bio && bio.length < 100) {
    error.push('Bio can not be less than 100 characters');
  }
  // }
  if (image) {
    if (!validUrl.test(image)) {
      error.push('Image must be a valid url');
    }
  }
  if (error.length > 0) {
    return res.status(400).send({
      success: false,
      errors: { error }
    });
  }
  next();
};

export default validateProfile;
