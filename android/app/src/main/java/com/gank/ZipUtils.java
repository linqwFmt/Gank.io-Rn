package com.gank;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Created by 否命题
 * create at: 2017/3/23.
 * email :FMT157@126.com
 */

public class ZipUtils {
//    public static void main(String[] args) {
//        try {
//            unzip("C:\\Users\\Administrator\\Desktop\\test.zip","C:\\Users\\Administrator\\Desktop\\bundle");
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//    }
    private final static int BUFFER_SIZE = 1 << 12;
    public static void unzip(String zipFilePath, String destDirectory) throws Exception {
        File destDir = new File(destDirectory);
        if (destDir.exists()) {
            destDir.delete();
        }
        destDir.mkdir();
        ZipInputStream zipInputStream = new ZipInputStream(new FileInputStream(zipFilePath));
        ZipEntry zipEntry = zipInputStream.getNextEntry();
        while (zipEntry != null) {
            String filePath = destDirectory + File.separator + zipEntry.getName();
            if (!zipEntry.isDirectory()) {
                extractFiles(zipInputStream, filePath);
            } else {
                File dir = new File(filePath);
                dir.mkdir();
            }
            zipInputStream.closeEntry();
            zipEntry = zipInputStream.getNextEntry();
        }
        zipInputStream.close();
    }

    private static void extractFiles(ZipInputStream inputStream, String path) throws IOException {
        BufferedOutputStream outputStream = new BufferedOutputStream(new FileOutputStream(path));
        byte[] bytes = new byte[BUFFER_SIZE];
        int read = 0;
        while ((read = inputStream.read(bytes)) != -1) {
            outputStream.write(bytes, 0, read);
        }

        outputStream.close();
    }

    /**
     * 复制单个文件
     *
     * @param srcFileName
     *            待复制的文件名
     * @param destFileName
     *            目标文件名
     * @param overlay
     *            如果目标文件存在，是否覆盖
     * @return 如果复制成功返回true，否则返回false
     */
    public static boolean copyFile(String srcFileName, String destFileName,
            boolean overlay) {
        File srcFile = new File(srcFileName);

        // 判断源文件是否存在
        if (!srcFile.exists()) {
            return false;
        } else if (!srcFile.isFile()) {
            return false;
        }
        // 判断目标文件是否存在
        File destFile = new File(destFileName);
        if (destFile.exists()) {
            // 如果目标文件存在并允许覆盖
            if (overlay) {
                // 删除已经存在的目标文件，无论目标文件是目录还是单个文件
                new File(destFileName).delete();
            }
        } else {
            // 如果目标文件所在目录不存在，则创建目录
            if (!destFile.getParentFile().exists()) {
                // 目标文件所在目录不存在
                if (!destFile.getParentFile().mkdirs()) {
                    // 复制文件失败：创建目标文件所在目录失败
                    return false;
                }
            }
        }

        // 复制文件
        int byteread = 0; // 读取的字节数
        InputStream in = null;
        OutputStream out = null;

        try {
            in = new FileInputStream(srcFile);
            out = new FileOutputStream(destFile);
            byte[] buffer = new byte[1024];

            while ((byteread = in.read(buffer)) != -1) {
                out.write(buffer, 0, byteread);
            }
            return true;
        } catch (FileNotFoundException e) {
            return false;
        } catch (IOException e) {
            return false;
        } finally {
            try {
                if (out != null)
                    out.close();
                if (in != null)
                    in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
