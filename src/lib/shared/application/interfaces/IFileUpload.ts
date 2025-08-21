import { RequestHandler } from "express";

export interface IFileUpload {
  single(fileName: string): RequestHandler;// Dependencia aceptable
  multiple(fileName: string, maxCount: number): RequestHandler;
}