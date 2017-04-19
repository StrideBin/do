package python;

/**
 * 创建人: lb (it_liubin@163.com)
 * 日期:  2017年4月19日 下午3:13:10
 */
import org.python.util.PythonInterpreter;
public class FirstJythonScript  {
    public static void main(String args[]) {  
        PythonInterpreter interpreter = new PythonInterpreter();  
        interpreter.exec("import urllib");
        interpreter.execfile("src/main/java/python/script/test.py");  
    }  
}
