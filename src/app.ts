import express from "express";
import bookRoutes from "./routes/book.routes";
import borrowRoutes from "./routes/borrow.routes";

const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Library API running!");
});
app.use("/api/books", bookRoutes);

app.use("/api/borrow", borrowRoutes);

// Export the Express app instance for use in server entry point or testing
export default app;
