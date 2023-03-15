import { NextFunction, Request, Response } from "express";
import { validator } from "../helpers/validate";

type signUpValidationProps = {
    email: string,
    name: string,
    roleId: string,
    password: string
}

export async function signUp(req: Request, res: Response, next: NextFunction) {
    const validationRule: signUpValidationProps = {
        email: "required|max:128|email",
        name: "required|max:64|string",
        roleId: "required|string",
        password: "required|string|max:64",
    };
    await validator(req.body, validationRule, {}, (err: object | null, status: boolean) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err,
            });
        } else {
            next();
        }
    }).catch((err: Error) => {
        res.json({ err });
    });
}


type signInValidationProps = {
    email: string,
    password: string
}


export async function signIn(req: Request, res: Response, next: NextFunction) {
    const validationRule: signInValidationProps = {
        email: "required|max:128|email",
        password: "required|string|max:64",
    };
    await validator(req.body, validationRule, {}, (err: object | null, status: boolean) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => {
        res.json({ err });
    })
}


type createRoleValidationProps = {
    name: string
    scopes: string,
    "scopes.*": string
}


export async function createRole(req: Request, res: Response, next: NextFunction) {
    const validationRule: createRoleValidationProps = {
        name: "required|string|max:32",
        scopes:
            "required|array|min:1|in:user-get,student-get,student-create,role-get,school-get,school-create,school-students",
        "scopes.*": "string|max:32",
    };
    await validator(req.body, validationRule, {}, (err: object | null, status: boolean) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => {
        res.json({ err });
    });
}

type createSchoolValidationProps = {
    name: string,
    city: string,
    state: string,
    country: string
}



export async function createSchool(req: Request, res: Response, next: NextFunction) {
    const validationRule: createSchoolValidationProps = {
        name: "required|string|max:128",
        city: "required|string|max:128",
        state: "required|string|max:128",
        country: "required|string|max:2",
    };
    await validator(req.body, validationRule, {}, (err: object | null, status: boolean) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => {
        res.json({ err });
    });
}


type createStudentValidationProps = {
    name: string,
}


export async function createStudent(req: Request, res: Response, next: NextFunction) {
    const validationRule: createStudentValidationProps = {
        name: "required|string|max:64",
    };
    await validator(req.body, validationRule, {}, (err: object | null, status: boolean) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: "Validation failed",
                data: err,
            });
        } else {
            next();
        }
    }).catch((err) => {
        res.json({ err });
    });
}