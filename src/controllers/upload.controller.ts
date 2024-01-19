import { Request, Response, NextFunction } from "express";
import { uploadFileService } from "../services/upload.service";
import multer from "multer";

const storage = multer.memoryStorage(); // 파일을 메모리에 저장
const upload = multer({ storage }).single("file"); // 입력 필드의 이름 = 'file'

export const uploadFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload(req, res, async (err: any) => {
      if (err) {
        return res.status(400).json({ ok: false, msg: "파일 업로드 실패" });
      }

      const file = req.file;

      if (!file) {
        return res
          .status(400)
          .json({ ok: false, msg: "파일이 제공되지 않았습니다." });
      }

      await uploadFileService(file);

      return res.json({ ok: true, msg: "파일이 성공적으로 업로드되었습니다." });
    });
  } catch (err) {
    next(err);
  }
};
