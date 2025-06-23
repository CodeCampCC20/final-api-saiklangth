import express from "express";
import { createRecord } from "../controllers/healthRecordController.js";

const router = express.Router();

router.post('/', createRecord)
router.get('/', (req, res) => {
  res.send("test get health")
})
router.get('/:id', (req, res) => {
  res.send("test get id health")
})
router.patch('/:id', (req, res) => {
  res.send("test patch health")
})
router.delete('/:id', (req, res) => {
  res.send("test delete health")
})

export default router;