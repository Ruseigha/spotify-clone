import { Router } from "express";
import { createSong, deleteSong} from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin} from "../middlewares/auth.middleware.js";


const router = Router();

router.post("/songs", protectRoute, requireAdmin, createSong);
router.delete("/songs/:id", protectRoute, requireAdmin, deleteSong);

export default router;