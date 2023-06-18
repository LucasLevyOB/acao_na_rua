import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkLogged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Token não informado" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        if (!decoded) {
            return res.status(401).json({ message: "Token inválido" });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkLogged;