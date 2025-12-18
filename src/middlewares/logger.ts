import { Request, Response, NextFunction } from "express";
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.url;

  console.log(`[${timestamp}] ${method} ${url}`);
  next();
}
