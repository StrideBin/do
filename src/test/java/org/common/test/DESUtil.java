package org.common.test;
import java.security.InvalidKeyException;
import java.security.Key;
import java.security.NoSuchAlgorithmException;
import javax.crypto.Cipher;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.SecretKeySpec;

public class DESUtil
{
  private Cipher encryptCipher = null;

  private Cipher decryptCipher = null;

  private static String byteArr2HexStr(byte[] arrB)
  {
    int iLen = arrB.length;

    StringBuffer sb = new StringBuffer(iLen * 2);
    for (int i = 0; i < iLen; ++i) {
      int intTmp = arrB[i];

      while (intTmp < 0) {
        intTmp += 256;
      }

      if (intTmp < 16) {
        sb.append("0");
      }
      sb.append(Integer.toString(intTmp, 16));
    }
    return sb.toString();
  }

  private static byte[] hexStr2ByteArr(String strIn)
  {
    byte[] arrB = strIn.getBytes();
    int iLen = arrB.length;

    byte[] arrOut = new byte[iLen / 2];
    for (int i = 0; i < iLen; i += 2) {
      String strTmp = new String(arrB, i, 2);
      arrOut[(i / 2)] = (byte)Integer.parseInt(strTmp, 16);
    }
    return arrOut;
  }

  public DESUtil()
  {
    //this("A5B727OPHM5G");
  }

  public static void main(String[] ss) throws Exception {
    DESUtil u = new DESUtil("A5B727OPHM5G");//�̻���Կ
    System.out.println(u.encrypt("123")); //����
    
    System.out.println(u.decrypt(u.encrypt("123")));//����
    
  }

  public DESUtil(String strKey)
  {
    try
    {
      Key key = getKey(strKey.getBytes());
      this.encryptCipher = Cipher.getInstance("DES");
      this.encryptCipher.init(1, key);

      this.decryptCipher = Cipher.getInstance("DES");
      this.decryptCipher.init(2, key);
    } catch (InvalidKeyException e) {
      e.printStackTrace();
    } catch (NoSuchAlgorithmException e) {
      e.printStackTrace();
    } catch (NoSuchPaddingException e) {
      e.printStackTrace();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  private byte[] encrypt(byte[] arrB)
    throws Exception
  {
    return this.encryptCipher.doFinal(arrB);
  }

  public String encrypt(String strIn)
    throws Exception
  {
    if ((strIn == null) || (strIn.trim().equals("null"))) {
      strIn = "";
    }
    return byteArr2HexStr(encrypt(strIn.getBytes()));
  }

  private byte[] decrypt(byte[] arrB)
    throws Exception
  {
    return this.decryptCipher.doFinal(arrB);
  }

  public String decrypt(String strIn)
    throws Exception
  {
    if (strIn == null) {
      return "";
    }
    return new String(decrypt(hexStr2ByteArr(strIn)));
  }

  private Key getKey(byte[] arrBTmp)
    throws Exception
  {
    byte[] arrB = new byte[8];

    for (int i = 0; (i < arrBTmp.length) && (i < arrB.length); ++i) {
      arrB[i] = arrBTmp[i];
    }

    Key key = new SecretKeySpec(arrB, "DES");

    return key;
  }
}