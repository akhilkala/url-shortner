import express, { Request, Response } from "express";
const router = express.Router();

import { getAllUrls, getUrlByID, addURL, deleteURL } from "../controllers/url";

router.get("/", (req: Request, res: Response) => {});
router.get("/:id", (req: Request, res: Response) => {});

router.post("/", (req: Request, res: Response) => {});
router.delete("/", (req: Request, res: Response) => {});

export default router;
