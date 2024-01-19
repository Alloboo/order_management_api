import { uploadFileRepository } from "../repositories/upload.repository";
import xlsx from "node-xlsx";

export const uploadFileService = async (file: Express.Multer.File) => {
  try {
    const fileBuffer = Buffer.from(file.buffer); // 파일 버퍼 디코딩
    const sheets = xlsx.parse(fileBuffer); // 저장된 파일 읽기

    await uploadFileRepository(sheets);
  } catch (err) {
    console.error("Error in uploadFileService:", err);
    throw err;
  }
};
