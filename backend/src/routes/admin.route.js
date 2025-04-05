import { Router } from "express";
import { createSong} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin} from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/", protectRoute, requireAdmin, createSong)

export default router;