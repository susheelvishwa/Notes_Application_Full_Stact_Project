import express from "express";
import { NoteModel } from "../model/note.model.js";

const noteRouter = express.Router();
console.log();

noteRouter.post("/create", async (req, res) => {
  console.log(req.body, req.user);
  const { title, content, status } = req.body;
  const userId = req.user._id;
  try {
    const note = new NoteModel({ title, content, status, userId });
    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    res.status(500).json({ message: "Error creating note", error });
  }
});

noteRouter.get("/", async (req, res) => {
  const userId = req.user._id;
  try {
    const notes = await NoteModel.find({ userId });
    res.status(200).json({ notes });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes", error });
  }
});

noteRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const noteId = req.params.id;
  const userId = req.user._id;

  try {
    const note = await NoteModel.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await NoteModel.findByIdAndUpdate(noteId, payload, { new: true });
    res.status(200).json({ message: "Note updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while updating note: ${error.message}` });
  }
});

noteRouter.delete("/delete/:id", async (req, res) => {
  const noteId = req.params.id;
  const userId = req.user._id;

  try {
    const note = await NoteModel.findOne({ _id: noteId, userId });
    if (!note) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    await NoteModel.findByIdAndDelete(noteId);
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error while deleting note: ${error.message}` });
  }
});

noteRouter.patch("/delete:id", async (req, res) => {});

export default noteRouter;
