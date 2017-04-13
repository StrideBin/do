package org.common.test;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import jxl.write.Label;
import jxl.write.WritableSheet;

public class ExcelOperater {   
  
    public static void main(String[] args)    
  
    {   
  
        jxl.Workbook readwb = null;   
        int lastRow=0;
        try    
  
        {   
  
            //构建Workbook对象, 只读Workbook对象   
  
            //直接从本地文件创建Workbook   
  
            InputStream instream = new FileInputStream("yldz.xls");   
  
            readwb = Workbook.getWorkbook(instream);   
  
    
  
            //Sheet的下标是从0开始   
  
            //获取第一张Sheet表   
/*             2.写入TXT文件   
            File writename = new File("values.txt"); // 相对路径，如果没有则要建立一个新的output文件  
            writename.createNewFile(); // 创建新文件  
            BufferedWriter out = new BufferedWriter(new FileWriter(writename)); */ 
            int sheets=readwb.getSheets().length;
            jxl.write.WritableWorkbook wwb = Workbook.createWorkbook(new File(   
            		  
                    "paymentDict1.xlsx"));
            
            WritableSheet ws1 = wwb.createSheet("Test Sheet 1",0); 
            for (int k = 0; k < sheets; k++) {
				
			
            Sheet readsheet = readwb.getSheet(k);   
  
            //获取Sheet表中所包含的总列数   
  
            int rsColumns = readsheet.getColumns();   
  
            //获取Sheet表中所包含的总行数   
  
            int rsRows = readsheet.getRows();   
  
            //获取指定单元格的对象引用   


            
            for (int i = 0; i < rsRows; i++)   
  
            {   
  
                for (int j = 0; j < rsColumns; j++)   
  
                {   
  
                    Cell cell = readsheet.getCell(j, i);   
					Label label1 = new Label(j, i+lastRow, cell.getContents());
					ws1.addCell(label1);
                    System.out.print(cell.getContents() + " ");   
                    
/*                    out.write(cell.getContents().replaceAll(" ","")+"   "); // 一次读一行 \r\n即为换行  
*/  
                }  
                /*out.write("\r\n"); // 一次读一行 \r\n即为换行  
*/                
                System.out.println();   
  
            }   
            lastRow+=rsRows;
            }
/*            out.flush(); // 把缓存区内容压入文件  
            out.close(); */   
  
            //利用已经创建的Excel工作薄,创建新的可写入的Excel工作薄   
  
           /* jxl.write.WritableWorkbook wwb = Workbook.createWorkbook(new File(   
  
                    "paymentDict1.xlsx"));
            
            int sheets1=wwb.getSheets().length;
            WritableSheet ws1 = wwb.createSheet("Test Sheet 1",0); 
            //读取第一张工作表   
            for (int i = 0; i < sheets1; i++) {
				
			
            jxl.write.WritableSheet ws = wwb.getSheet(i);   
            int wrcol=ws.getColumns();
            int wrrow=ws.getRows();
            for (int j = 0; j < wrrow; j++) {
				for (int j2 = 0; j2 < wrcol; j2++) {
					Label label1 = new Label(wrcol, wrrow, "test1");
					ws1.addCell(label1);
				}
			}
            //获得第一个单元格对象   
  
              
            
            
            
            //判断单元格的类型, 做出相应的转化   
            }*/
/*            if (wc.getType() == CellType.LABEL)    
  
            {   
  
                Label l = (Label) wc;   
  
            } */
  
            //写入Excel对象   
  
            wwb.write();   
  
            wwb.close();   
  
        } catch (Exception e) {   
  
            e.printStackTrace();   
  
        } finally {   
  
            readwb.close();   
  
        }   
  
}   
  
}   
