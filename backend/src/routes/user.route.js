import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("get user routes")
});

export default router;