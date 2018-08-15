import { Router } from 'express';
import utils from '../../helpers/utilities';
import validateSignup from '../../middlewares/validateSignup';
import UsersController from '../../controllers/UsersController';
import validateProfile from '../../middlewares/validateProfile';
import validateToken from '../../middlewares/verifyToken';
import validator from '../../middlewares/ParamsValidator';
import inputValidator from '../../middlewares/inputValidator';
import { resendVerificationEmail } from '../../helpers/exports';
import { checkIfUserIsVerified } from '../../middlewares/checkIfUserIsVerified';

const router = Router();

router.get('/users/verify/:token', UsersController.verifyEmail);
router.post('/users/reverify', inputValidator.validateEmail, resendVerificationEmail);
router.post('/users', validateSignup, UsersController.registerUser);
router.post('/users/login', checkIfUserIsVerified, UsersController.login);
router.get(
  '/profiles/:username',
  validator.validateUsername,
  UsersController.getProfile
);
router.put(
  '/profiles/:username',
  validateToken,
  validator.validateId,
  validator.validateUsername,
  validateProfile,
  UsersController.editProfile
);
router.post('/users', validateSignup, UsersController.registerUser);
router.post('/users/login', UsersController.login);
router.post('/users/password/reset', inputValidator.validateEmail, utils.checkEmail, utils.sendEmail);
router.put('/users/password/reset/edit', inputValidator.validatePassword, validateToken, utils.resetPassword);

export default router;
