const express = require("express");
const { check } = require("express-validator");
const authController = require("../controllers/authController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related operations
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           examples:
 *             default:
 *               summary: Default credentials
 *               value:
 *                 name: 'John Doe'
 *                 email: 'john.doe@example.com'
 *                 password: 'password123'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

router.post(
  "/register",
  [
    check("name", "Name is required").notEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be 6 or more characters").isLength({
      min: 6,
    }),
  ],
  authController.register
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *           examples:
 *             default:
 *               summary: Default credentials
 *               value:
 *                 email: 'john.doe@example.com'
 *                 password: 'password123'
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  authController.login
);

/**
 * @swagger
 * tags:
 *   name: Token
 *   description: Token related operations
 */
/**
 * @swagger
 * /api/auth/refresh-token:
 *   get:
 *     summary: Get a new refresh token
 *     tags: [Token]
 *     responses:
 *       200:
 *         description: A new refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/refresh-token", authenticateToken, authController.refreshToken);

module.exports = router;
