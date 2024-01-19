import express, { Request, Response, NextFunction } from "express";
import xlsx from "node-xlsx";

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = req.body;

    if (!file) {
      return res.status(400).json({ ok: false, msg: "File not provided" });
    }
    // request로 전달된 '.xlsx' 파일을 'uploads' 폴더에 저장

    // 저장된 파일 읽기
    // let workbook = xlsx.readfile('data.xlsx');

    // 읽은 파일의 sheet와 column 대로 db table 생성

    // 파일의 데이터를 db에 저장

    // db 저장이 완료되면 'uploads' 폴더에서 해당 파일 삭제
  } catch (err) {
    next(err);
  }
};
