import express from "express";
import cors from "cors";

const FrameworkLoader = (app: express.Application) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
};

export default FrameworkLoader;