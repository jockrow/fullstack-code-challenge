import express from "express";
import { getQuestions, createQuestion, editQuestion, deleteQuestion } from "../controllers/questionController";

const router = express.Router();

router.get("/", getQuestions);
router.post("/", createQuestion);
router.put("/:id", editQuestion);
router.delete("/:id", deleteQuestion);

export default router;
