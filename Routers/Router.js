
import express from "express"
import { Signin } from "../controller/UserController/Singin.js";
import { login } from "../controller/UserController/Login.js";
import { logout } from "../controller/UserController/logout.js";
import { AuthMiddleware } from "../middleware/Authmiddleware.js";
import { DeleteAccount } from "../controller/UserController/Delete.js";
import { AddTask } from "../controller/TaskController/AddTask.js";
import { ShowTask } from "../controller/TaskController/ShowTask.js";
import { UpdateTask } from "../controller/TaskController/UpdateTask.js";
import { DeleteTask } from "../controller/TaskController/DeleteTask.js";



export const router=express.Router();

router.post('/signin',Signin);
router.post('/login',login);
router.post('/logout',logout);
router.delete('/delete',AuthMiddleware,DeleteAccount);
router.post('/addtask',AuthMiddleware,AddTask);
router.get('/alltask',AuthMiddleware,ShowTask);
router.patch('/update/:id',AuthMiddleware,UpdateTask);
router.delete('/deletetask/:id',AuthMiddleware,DeleteTask);