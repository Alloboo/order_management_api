import { Request, Response } from "express";
import MonthlySalesService from "../services/monthly-sales.service";

class MonthlySalesController {
  static async getMonthlySales(_: Request, res: Response): Promise<void> {
    try {
      const monthlyData = await MonthlySalesService.calculateMonthlySales();
      res.json(monthlyData);
    } catch (error) {
      console.error("Error retrieving data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default MonthlySalesController;
