const models = require("../models");
function createToken(
  token,
  expiresIn,
  refreshToken,
  refreshTokenExpiresIn,
  user_id
) {
  return models.Token.create({
    tokenValue : token,
    token_expires_at : expiresIn,
    refresh_token : refreshToken,
    refresh_token_expires_at : refreshTokenExpiresIn,
    user_id : user_id
  })
    .then(data => {
      // console.log(data);
      return models.Token.findOne({where:{user_id:user_id}})
        .then(data => {
          return data;
        })
        .catch(err => {
          return err;
        });
    })
    .catch(err => {
      console.log(err);
    });
}

function findRefreshToken(refresh_token) {
  return models.Token.findOne({
    attributes:['user_id','refresh_token_expires_at']
    ,where:{refresh_token:refresh_token}})
    .then(data => {
      return data;
    })
    .catch(err => {
      return "refresh token not Found";
    });
}

function updateToken(
  newtoken,
  newExpiryTokenDate,
  newRefreshToken,
  newRefreshTokenExpiryDate,
  user_id
) {
  // console.log("it works")
  return models.Token.update({
    tokenValue : newtoken,
    token_expires_at : newExpiryTokenDate,
    refresh_token : newRefreshToken,
    refresh_token_expires_at : newRefreshTokenExpiryDate},
    {where:{user_id:user_id}}
  )
    .then(data => {
      return "user was updated";
    })
    .catch(err => {
      return "USER NOT FOUND";
    });
}

function deleteToken(id) {
  // console.log("zezooooo", id)
  return models.Token.destroy({where:{id:id}})
    .then(data => {
      return "token was deleted successfully";
    })
    .catch(err => {
      return "token NOT FOUND";
    });
}

module.exports.create = createToken;
module.exports.findRefreshToken = findRefreshToken;
module.exports.deleteIT = deleteToken;
module.exports.updateToken = updateToken;
