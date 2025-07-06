import { Router } from "express";
import { TableController } from "../controllers/TableController";

export function tableRoutes(tableController: TableController): Router {
  const router = Router();

  router.get("/tables", tableController.getAllTables.bind(tableController));
  router.get("/tables/:id", tableController.getTableById.bind(tableController));
  router.post("/tables", tableController.createTable.bind(tableController));
  router.put("/tables/:id", tableController.updateTable.bind(tableController));
  router.delete("/tables/:id", tableController.deleteTable.bind(tableController));

  return router;
}