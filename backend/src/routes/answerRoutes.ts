import express from "express";
import { createUserAnswer, editUserAnswer, deleteUserAnswer, getUserAnswers } from "../controllers/answerController";

const router = express.Router();

router.get("/:userId", getUserAnswers);
router.post("/", createUserAnswer);
router.put("/:id", editUserAnswer);
router.delete("/:id", deleteUserAnswer);

export default router;
